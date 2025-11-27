-- =========================================================
-- RECRIA BANCO
-- =========================================================
DROP DATABASE IF EXISTS GestaoPatrimonio;
CREATE DATABASE GestaoPatrimonio;
USE GestaoPatrimonio;
show tables;

-- =========================================================
-- TABELAS
-- =========================================================
CREATE TABLE TipoLocal (
  id_tipolocal INT PRIMARY KEY AUTO_INCREMENT,
  descricao VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Localizacao (
  id_local INT PRIMARY KEY AUTO_INCREMENT,
  fk_id_tipolocal INT NOT NULL,
  nome VARCHAR(100) NOT NULL,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  FOREIGN KEY (fk_id_tipolocal) REFERENCES TipoLocal(id_tipolocal)
);

CREATE TABLE Dispositivo (
  id_dispositivo INT PRIMARY KEY AUTO_INCREMENT,
  identificador VARCHAR(100) NOT NULL UNIQUE,
  descricao VARCHAR(200),
  tipo VARCHAR(30) NOT NULL,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fk_id_local INT NOT NULL,
  FOREIGN KEY (fk_id_local) REFERENCES Localizacao(id_local)
);

CREATE TABLE Item (
  id_item INT PRIMARY KEY AUTO_INCREMENT,
  tag_codigo VARCHAR(100) UNIQUE,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fk_id_local_origem INT NOT NULL,
  FOREIGN KEY (fk_id_local_origem) REFERENCES Localizacao(id_local)
);

CREATE TABLE Leitura (
  id_leitura BIGINT PRIMARY KEY AUTO_INCREMENT,
  tag_codigo VARCHAR(100) NOT NULL,
  lido_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  rssi DECIMAL(6,2),
  payload_json JSON,
  fk_id_dispositivo INT NOT NULL,
  FOREIGN KEY (fk_id_dispositivo) REFERENCES Dispositivo(id_dispositivo)
);

CREATE TABLE Movimento (
  id_movimento BIGINT PRIMARY KEY AUTO_INCREMENT,
  movido_em DATETIME NOT NULL,
  observacoes TEXT,
  fk_id_item INT NOT NULL,
  fk_id_local_origem INT NULL,
  fk_id_local_destino INT NOT NULL,
  fk_id_dispositivo INT NOT NULL,
  FOREIGN KEY (fk_id_item) REFERENCES Item(id_item),
  FOREIGN KEY (fk_id_local_origem) REFERENCES Localizacao(id_local),
  FOREIGN KEY (fk_id_local_destino) REFERENCES Localizacao(id_local),
  FOREIGN KEY (fk_id_dispositivo) REFERENCES Dispositivo(id_dispositivo)
);

-- =========================================================
-- CARGA INICIAL (SEU CENÁRIO)
-- =========================================================
INSERT INTO TipoLocal(descricao) VALUES ('SALA'),('CORREDOR'),('EXTERNO');

INSERT INTO Localizacao(fk_id_tipolocal,nome,ativo) VALUES
((SELECT id_tipolocal FROM TipoLocal WHERE descricao='SALA'),'Sala A',1),
((SELECT id_tipolocal FROM TipoLocal WHERE descricao='SALA'),'Sala B',1),
((SELECT id_tipolocal FROM TipoLocal WHERE descricao='CORREDOR'),'Corredor Principal',1),
((SELECT id_tipolocal FROM TipoLocal WHERE descricao='EXTERNO'),'Área Externa/Saída',1);

INSERT INTO Dispositivo(identificador,descricao,tipo,fk_id_local,ativo) VALUES
('DEV-A','Leitor Sala A','RFID_READER',(SELECT id_local FROM Localizacao WHERE nome='Sala A'),1),
('DEV-B','Leitor Sala B','RFID_READER',(SELECT id_local FROM Localizacao WHERE nome='Sala B'),1),
('DEV-COR','Leitor Corredor','RFID_READER',(SELECT id_local FROM Localizacao WHERE nome='Corredor Principal'),1),
('DEV-EXT','Leitor Externo','RFID_READER',(SELECT id_local FROM Localizacao WHERE nome='Área Externa/Saída'),1);

-- item3 e item2 pertencem à Sala A; item1 pertence à Sala B
INSERT INTO Item(tag_codigo,nome,descricao,fk_id_local_origem,ativo) VALUES
('TAG-ITEM1','item1',NULL,(SELECT id_local FROM Localizacao WHERE nome='Sala B'),1),
('TAG-ITEM2','item2',NULL,(SELECT id_local FROM Localizacao WHERE nome='Sala A'),1),
('TAG-ITEM3','item3',NULL,(SELECT id_local FROM Localizacao WHERE nome='Sala A'),1);

-- =========================================================
-- TRIGGER: REGISTRA HISTÓRICO DE MOVIMENTO AO INSERIR LEITURA
-- =========================================================
DELIMITER $$

CREATE TRIGGER trg_leitura_movimento_ai
AFTER INSERT ON Leitura
FOR EACH ROW
BEGIN
  DECLARE v_item_id INT;
  DECLARE v_local_atual INT;
  DECLARE v_local_anterior INT;

  SELECT id_item INTO v_item_id FROM Item WHERE tag_codigo=NEW.tag_codigo LIMIT 1;
  SELECT fk_id_local INTO v_local_atual FROM Dispositivo WHERE id_dispositivo=NEW.fk_id_dispositivo LIMIT 1;

  SELECT d.fk_id_local INTO v_local_anterior
  FROM Leitura l
  JOIN Dispositivo d ON d.id_dispositivo=l.fk_id_dispositivo
  WHERE l.tag_codigo=NEW.tag_codigo
    AND (l.lido_em<NEW.lido_em OR (l.lido_em=NEW.lido_em AND l.id_leitura<NEW.id_leitura))
  ORDER BY l.lido_em DESC,l.id_leitura DESC
  LIMIT 1;

  IF v_item_id IS NOT NULL AND (v_local_anterior IS NULL OR v_local_anterior<>v_local_atual) THEN
    INSERT INTO Movimento(fk_id_item,fk_id_local_origem,fk_id_local_destino,fk_id_dispositivo,movido_em)
    VALUES (v_item_id,v_local_anterior,v_local_atual,NEW.fk_id_dispositivo,NEW.lido_em);
  END IF;
END$$

DELIMITER ;

-- =========================================================
-- LEITURAS (GERAM REGISTROS NA TABELA MOVIMENTO PELO TRIGGER)
-- =========================================================
-- Base (2h atrás): cada item visto na origem
INSERT INTO Leitura(fk_id_dispositivo,tag_codigo,lido_em) VALUES
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-B'),'TAG-ITEM1',NOW()-INTERVAL 2 HOUR),
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-A'),'TAG-ITEM2',NOW()-INTERVAL 2 HOUR),
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-A'),'TAG-ITEM3',NOW()-INTERVAL 2 HOUR);

-- item3 saiu da Sala A para a Sala B
INSERT INTO Leitura(fk_id_dispositivo,tag_codigo,lido_em) VALUES
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-B'),'TAG-ITEM3',NOW()-INTERVAL 30 MINUTE);

-- item2 saiu da Sala A e ficou no corredor
INSERT INTO Leitura(fk_id_dispositivo,tag_codigo,lido_em) VALUES
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-COR'),'TAG-ITEM2',NOW()-INTERVAL 20 MINUTE);

-- item1 saiu da Sala B e saiu do local
INSERT INTO Leitura(fk_id_dispositivo,tag_codigo,lido_em) VALUES
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-EXT'),'TAG-ITEM1',NOW()-INTERVAL 10 MINUTE);

-- =========================================================
-- VIEWs
-- =========================================================
DROP VIEW IF EXISTS v_movimentacao_por_itens;
DROP VIEW IF EXISTS v_movimentacao_por_sala;
DROP VIEW IF EXISTS v_saidas_de_salas;
DROP VIEW IF EXISTS v_entradas_em_salas;
DROP VIEW IF EXISTS v_itens_atuais_por_sala;
DROP VIEW IF EXISTS v_resumo_atual_por_sala;
DROP VIEW IF EXISTS v_status_atual_de_cada_item;

-- ------------------------------------------------------------------
-- BASE: Status atual de cada item (última leitura)
-- ------------------------------------------------------------------
CREATE OR REPLACE VIEW v_status_atual_de_cada_item AS
SELECT
  i.id_item,
  i.nome AS item,
  i.tag_codigo,
  loc_origem.id_local AS id_local_origem,
  loc_origem.nome AS local_origem,
  tl_atual.descricao AS tipo_local_atual,
  loc_atual.id_local AS id_local_atual,
  loc_atual.nome AS local_atual,
  l.lido_em
FROM Item i
JOIN Localizacao loc_origem
  ON loc_origem.id_local = i.fk_id_local_origem
JOIN (
  SELECT
    tag_codigo,
    MAX(lido_em) AS lido_em
  FROM Leitura
  GROUP BY tag_codigo
) u
  ON u.tag_codigo = i.tag_codigo
JOIN Leitura l
  ON l.tag_codigo = u.tag_codigo
 AND l.lido_em   = u.lido_em
JOIN Dispositivo d
  ON d.id_dispositivo = l.fk_id_dispositivo
JOIN Localizacao loc_atual
  ON loc_atual.id_local = d.fk_id_local
JOIN TipoLocal tl_atual
  ON tl_atual.id_tipolocal = loc_atual.fk_id_tipolocal;

-- ------------------------------------------------------------------
-- 1) RESUMO POR SALA (situação atual) — INCLUINDO SALAS COM 0 ITENS
-- ------------------------------------------------------------------
CREATE OR REPLACE VIEW v_resumo_atual_por_sala AS
SELECT
  loc.id_local AS id_sala,
  loc.nome     AS sala,
  COUNT(v.id_item) AS quantidade_itens
FROM Localizacao loc
JOIN TipoLocal tl
  ON tl.id_tipolocal = loc.fk_id_tipolocal
LEFT JOIN v_status_atual_de_cada_item v
  ON v.id_local_atual = loc.id_local
GROUP BY
  loc.id_local,
  loc.nome
ORDER BY
  loc.nome;

-- Itens atualmente em cada sala (listagem detalhada)
CREATE OR REPLACE VIEW v_itens_atuais_por_sala AS
SELECT
  loc.id_local AS id_sala,
  loc.nome    AS sala,
  v.id_item,
  v.item,
  v.tag_codigo,
  v.lido_em   AS ultima_leitura
FROM v_status_atual_de_cada_item v
JOIN Localizacao loc
  ON loc.id_local = v.id_local_atual
JOIN TipoLocal tl
  ON tl.id_tipolocal = loc.fk_id_tipolocal
WHERE tl.descricao = 'SALA'
ORDER BY
  loc.nome,
  v.item;

-- ------------------------------------------------------------------
-- 2) MOVIMENTAÇÃO POR SALA
--    Entradas em salas (destino é SALA)
-- ------------------------------------------------------------------
CREATE OR REPLACE VIEW v_entradas_em_salas AS
SELECT
  ld.id_local AS id_sala_destino,
  ld.nome    AS sala_destino,
  i.id_item,
  i.nome     AS item,
  i.tag_codigo,
  COALESCE(lo.nome,'(sem origem)') AS local_origem,
  m.movido_em
FROM Movimento m
LEFT JOIN Localizacao lo
  ON lo.id_local = m.fk_id_local_origem
JOIN Localizacao ld
  ON ld.id_local = m.fk_id_local_destino
JOIN TipoLocal tld
  ON tld.id_tipolocal = ld.fk_id_tipolocal
JOIN Item i
  ON i.id_item = m.fk_id_item
WHERE tld.descricao = 'SALA'
ORDER BY
  m.movido_em DESC;

--    Saídas de salas (origem é SALA)
CREATE OR REPLACE VIEW v_saidas_de_salas AS
SELECT
  lo.id_local AS id_sala_origem,
  lo.nome    AS sala_origem,
  i.id_item,
  i.nome     AS item,
  i.tag_codigo,
  ld.nome    AS local_destino,
  m.movido_em
FROM Movimento m
JOIN Localizacao lo
  ON lo.id_local = m.fk_id_local_origem
JOIN TipoLocal tlo
  ON tlo.id_tipolocal = lo.fk_id_tipolocal
JOIN Localizacao ld
  ON ld.id_local = m.fk_id_local_destino
JOIN Item i
  ON i.id_item = m.fk_id_item
WHERE tlo.descricao = 'SALA'
ORDER BY
  m.movido_em DESC;

--    Movimentação envolvendo salas (qualquer movimento que entra ou sai de uma sala)
CREATE OR REPLACE VIEW v_movimentacao_por_sala AS
SELECT
  i.id_item,
  i.nome AS item,
  i.tag_codigo,
  COALESCE(lo.nome,'(sem origem)') AS origem,
  ld.nome AS destino,
  m.movido_em,
  CASE
    WHEN tld.descricao = 'SALA' THEN ld.nome
  END AS sala_envolvida_destino,
  CASE
    WHEN tlo.descricao = 'SALA' THEN lo.nome
  END AS sala_envolvida_origem
FROM Movimento m
LEFT JOIN Localizacao lo
  ON lo.id_local = m.fk_id_local_origem
LEFT JOIN TipoLocal tlo
  ON tlo.id_tipolocal = lo.fk_id_tipolocal
JOIN Localizacao ld
  ON ld.id_local = m.fk_id_local_destino
JOIN TipoLocal tld
  ON tld.id_tipolocal = ld.fk_id_tipolocal
JOIN Item i
  ON i.id_item = m.fk_id_item
WHERE
  (tlo.descricao = 'SALA' OR tld.descricao = 'SALA')
ORDER BY
  i.nome,
  m.movido_em DESC;

-- ------------------------------------------------------------------
-- 3) MOVIMENTAÇÃO POR ITENS (linha do tempo)
-- ------------------------------------------------------------------
CREATE OR REPLACE VIEW v_movimentacao_por_itens AS
SELECT
  i.id_item,
  i.nome AS item,
  i.tag_codigo,
  COALESCE(lo.nome,'(sem origem)') AS origem,
  ld.nome AS destino,
  tlo.descricao AS tipo_origem,
  tld.descricao AS tipo_destino,
  m.movido_em
FROM Movimento m
LEFT JOIN Localizacao lo
  ON lo.id_local = m.fk_id_local_origem
LEFT JOIN TipoLocal tlo
  ON tlo.id_tipolocal = lo.fk_id_tipolocal
JOIN Localizacao ld
  ON ld.id_local = m.fk_id_local_destino
JOIN TipoLocal tld
  ON tld.id_tipolocal = ld.fk_id_tipolocal
JOIN Item i
  ON i.id_item = m.fk_id_item
ORDER BY
  i.nome,
  m.movido_em DESC;

-- Resumo por sala (situação atual)
SELECT * FROM v_resumo_atual_por_sala;

-- Itens atuais da "Sala A"
SELECT * FROM v_itens_atuais_por_sala
WHERE sala = 'Sala A';

-- Entradas em salas no período
SELECT * FROM v_entradas_em_salas
WHERE movido_em BETWEEN '2025-09-01 00:00:00' AND '2025-09-30 23:59:59'
  AND sala_destino = 'Sala A';

-- Saídas de salas no período
SELECT * FROM v_saidas_de_salas
WHERE movido_em BETWEEN '2025-09-01 00:00:00' AND '2025-09-30 23:59:59'
  AND sala_origem = 'Sala A';

-- Movimentação envolvendo uma sala (entra/saí dela)
SELECT * FROM v_movimentacao_por_sala
WHERE (sala_envolvida_destino = 'Sala A' OR sala_envolvida_origem = 'Sala A')
  AND movido_em BETWEEN '2025-09-01 00:00:00' AND '2025-09-30 23:59:59';

-- Movimentação por itens (todos) no período
SELECT * FROM v_movimentacao_por_itens
WHERE movido_em BETWEEN '2025-09-01 00:00:00' AND '2025-09-30 23:59:59';

-- Linha do tempo de um item específico (por tag)
SELECT * FROM v_movimentacao_por_itens
WHERE tag_codigo = 'TAG-ITEM2'
ORDER BY movido_em DESC;
