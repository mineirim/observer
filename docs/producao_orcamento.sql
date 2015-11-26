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
 SELECT fp.id financeiro_id, fp.programacao_id as orcamento_id,
    sum(d.valor) AS executado
   FROM despesas d
   INNER JOIN financeiro f on d.financeiro_id=f.id
   INNER JOIN financeiro fp on f.origem_recurso_id=fp.programacao_id
  GROUP BY fp.id,fp.programacao_id
  ORDER BY fp.id;

  SELECT * FROM vw_orcamento vo LEFT OUTER JOIN vw_execucao as ve ON vo.financeiro_id=ve.financeiro_id