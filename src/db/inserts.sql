USE GestaoPatrimonio;
-- ============================================
-- 1) ITENS (origem configurada por Localizacao)
-- ============================================
INSERT INTO Item(tag_codigo,nome,descricao,fk_id_local_origem,ativo) VALUES
('TAG-ITEM4','item4',NULL,(SELECT id_local FROM Localizacao WHERE nome='Sala A'),1),
('TAG-ITEM5','item5',NULL,(SELECT id_local FROM Localizacao WHERE nome='Sala B'),1),
('TAG-ITEM6','item6',NULL,(SELECT id_local FROM Localizacao WHERE nome='Sala A'),1),
('TAG-ITEM7','item7',NULL,(SELECT id_local FROM Localizacao WHERE nome='Sala B'),1),
('TAG-ITEM8','item8',NULL,(SELECT id_local FROM Localizacao WHERE nome='Sala A'),1);

-- ============================================================
-- 2) LEITURAS (geram histórico na tabela Movimento via trigger)
--    Base comum: 3h atrás cada item é visto na sua origem
-- ============================================================
INSERT INTO Leitura(fk_id_dispositivo,tag_codigo,lido_em) VALUES
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-A'),'TAG-ITEM4',NOW()-INTERVAL 3 HOUR),
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-B'),'TAG-ITEM5',NOW()-INTERVAL 3 HOUR),
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-A'),'TAG-ITEM6',NOW()-INTERVAL 3 HOUR),
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-B'),'TAG-ITEM7',NOW()-INTERVAL 3 HOUR),
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-A'),'TAG-ITEM8',NOW()-INTERVAL 3 HOUR);

-- ============================
-- Fluxos específicos por item
-- ============================

-- item4: Sala A -> Corredor -> Sala A
INSERT INTO Leitura(fk_id_dispositivo,tag_codigo,lido_em) VALUES
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-COR'),'TAG-ITEM4',NOW()-INTERVAL 140 MINUTE),
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-A'),'TAG-ITEM4',NOW()-INTERVAL 60 MINUTE);

-- item5: Sala B -> Corredor -> Externo
INSERT INTO Leitura(fk_id_dispositivo,tag_codigo,lido_em) VALUES
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-COR'),'TAG-ITEM5',NOW()-INTERVAL 160 MINUTE),
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-EXT'),'TAG-ITEM5',NOW()-INTERVAL 100 MINUTE);

-- item6: Sala A -> Sala B -> Sala A (bate-volta)
INSERT INTO Leitura(fk_id_dispositivo,tag_codigo,lido_em) VALUES
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-B'),'TAG-ITEM6',NOW()-INTERVAL 90 MINUTE),
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-A'),'TAG-ITEM6',NOW()-INTERVAL 20 MINUTE);

-- item7: Permanece na Sala B (apenas leituras na própria sala, sem mudança)
-- (opcional) leitura recente na mesma sala para mostrar que não gera movimento
INSERT INTO Leitura(fk_id_dispositivo,tag_codigo,lido_em) VALUES
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-B'),'TAG-ITEM7',NOW()-INTERVAL 10 MINUTE);

-- item8: Sala A -> Corredor -> Sala B
INSERT INTO Leitura(fk_id_dispositivo,tag_codigo,lido_em) VALUES
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-COR'),'TAG-ITEM8',NOW()-INTERVAL 80 MINUTE),
((SELECT id_dispositivo FROM Dispositivo WHERE identificador='DEV-B'),'TAG-ITEM8',NOW()-INTERVAL 15 MINUTE);