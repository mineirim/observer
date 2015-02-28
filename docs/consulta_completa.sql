WITH RECURSIVE prog AS ( 
	(SELECT 1 as nivel, array[pp.id] AS path,i.singular ,pp.* 
	FROM programacoes pp inner join instrumentos i  on pp.instrumento_id=i.id
	WHERE  pp.situacao_id <>2  and pp.programacao_id is null and pp.instrumento_id=2
	order by pp.ordem
	)
	UNION ALL 
	(
	SELECT prog.nivel+1,prog.path || p.id,i.singular,p.* 
	FROM programacoes p JOIN prog ON p.programacao_id = prog.id 
	inner join instrumentos i  on p.instrumento_id=i.id
	WHERE p.situacao_id <>2 
	order by ordem
	)
) 
SELECT * FROM prog ORDER BY path
