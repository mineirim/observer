SELECT po.menu, pg.menu, p.menu, f.id, f.valor vlr_programado, sum(fp.valor) as vlr_alocado
FROM programacoes p
	INNER JOIN programacoes pg ON p.programacao_id=pg.id
	INNER JOIN programacoes po on pg.programacao_id=po.id
	INNER JOIN financeiro f on f.programacao_id=p.id
	INNER JOIN financeiro fp on fp.origem_recurso_id=p.id
WHERE po.instrumento_id=8
GROUP BY po.ordem,pg.ordem,p.ordem,po.menu, pg.menu, p.menu, f.id, f.valor
ORDER BY po.ordem,pg.ordem,p.ordem






  CREATE OR REPLACE VIEW vw_execucao AS
 SELECT fp.id AS financeiro_id,
    fp.programacao_id AS orcamento_id,
    sum(d.valor) AS executado
   FROM despesas d
     JOIN financeiro f ON d.financeiro_id = f.id
     JOIN financeiro fp ON f.origem_recurso_id = fp.programacao_id
  GROUP BY fp.id, fp.programacao_id
  ORDER BY fp.id;

ALTER TABLE vw_execucao
  OWNER TO unasus_user;




CREATE OR REPLACE VIEW vw_orcamento AS
 SELECT p.id,
    po.id AS orcamento_id,
    po.menu AS fonte,
    pg.id AS grupo_id,
    pg.menu AS grupo_despesas,
    p.menu AS item_despesa,
    f.id AS financeiro_id,
    f.valor AS vlr_programado,
    sum(fp.valor) AS vlr_alocado
   FROM programacoes p
     JOIN programacoes pg ON p.programacao_id = pg.id
     JOIN programacoes po ON pg.programacao_id = po.id
     JOIN financeiro f ON f.programacao_id = p.id
     JOIN financeiro fp ON fp.origem_recurso_id = p.id
  WHERE po.instrumento_id = 8
  GROUP BY p.id, po.id, po.ordem, pg.id, pg.ordem, p.ordem, po.menu, pg.menu, p.menu, f.id, f.valor
  ORDER BY po.ordem, pg.ordem, p.ordem;

ALTER TABLE vw_orcamento
  OWNER TO unasus_user;



SELECT * FROM vw_orcamento vo LEFT OUTER JOIN vw_execucao as ve ON vo.financeiro_id=ve.financeiro_id














CREATE TABLE sistemas
(
  id serial NOT NULL,
  nome character varying(100), -- nome do sistema
  chave character varying(200),
  situacao_id integer NOT NULL DEFAULT 1,
  inclusao_data timestamp without time zone NOT NULL DEFAULT now(),
  inclusao_usuario_id integer,
  alteracao_data timestamp without time zone,
  alteracao_usuario_id integer,
  CONSTRAINT sistemas_pkey PRIMARY KEY (id),
  CONSTRAINT fk_situacao_id FOREIGN KEY (situacao_id)
      REFERENCES situacoes (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_usuario_alt FOREIGN KEY (alteracao_usuario_id)
      REFERENCES usuarios (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_usuario_inc FOREIGN KEY (inclusao_usuario_id)
      REFERENCES usuarios (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT sistemas_chave_key UNIQUE (chave)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE sistemas
  OWNER TO unasus_user;
COMMENT ON TABLE sistemas
  IS 'sistemas autorizados a integrar via REST com a aplicação';
COMMENT ON COLUMN sistemas.nome IS 'nome do sistema ';





CREATE TABLE programacao_sistemas
(
  id serial NOT NULL,
  programacao_id integer,
  sistema_id integer,
  CONSTRAINT programacao_sistemas_pkey PRIMARY KEY (id),
  CONSTRAINT programacao_sistemas_programacao_id_fkey FOREIGN KEY (programacao_id)
      REFERENCES programacoes (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT programacao_sistemas_sistema_id_fkey FOREIGN KEY (sistema_id)
      REFERENCES sistemas (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE programacao_sistemas
  OWNER TO unasus_user;

-- Index: programacao_sistemas_programacao_id_idx

-- DROP INDEX programacao_sistemas_programacao_id_idx;

CREATE INDEX programacao_sistemas_programacao_id_idx
  ON programacao_sistemas
  USING btree
  (programacao_id);

-- Index: programacao_sistemas_sistema_id_idx

-- DROP INDEX programacao_sistemas_sistema_id_idx;

CREATE INDEX programacao_sistemas_sistema_id_idx
  ON programacao_sistemas
  USING btree
  (sistema_id);

