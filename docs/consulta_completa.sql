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





utilizada para setar situacao para 2 (apagada)
UPDATE programacoes set situacao_id=2 where id in (
WITH RECURSIVE prog AS ( 
SELECT 1 as nivel, coalesce(cast(programacoes.supervisor_usuario_id as varchar),'0') as supervisores,* 
FROM programacoes WHERE situacao_id=2
UNION ALL SELECT prog.nivel+1, prog.supervisores || ',' || coalesce(cast(p.supervisor_usuario_id as varchar),'0'), p.* 
FROM programacoes p JOIN prog ON p.programacao_id = prog.id  ) 
SELECT prog.id
 FROM prog 
)



// utilizado para criar novas chaves
insert into sistemas (nome,chave) values'Sistema de Apoio Administrativo', crypt('123', gen_salt('bf', 8))