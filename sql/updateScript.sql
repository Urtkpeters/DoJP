update LevelEntities le
  join LevelHeader lh on lh.LevelHeaderId = le.LevelHeaderId
    and lh.LevelCode = 'level11'
  join Entities ent on ent.EntityId = le.EntityId
    and ent.EntityName = 'lowBug'
set Movement = 'rightSimpleZigZag'
where le.Timing = 300;
update LevelEntities le
  join LevelHeader lh on lh.LevelHeaderId = le.LevelHeaderId
    and lh.LevelCode = 'level14'
  join Entities ent on ent.EntityId = le.EntityId
    and ent.EntityName = 'lowBug'
set Movement = 'leftBox'
where le.Timing = 2600;
update LevelEntities le
  join LevelHeader lh on lh.LevelHeaderId = le.LevelHeaderId
    and lh.LevelCode = 'level15'
  join Entities ent on ent.EntityId = le.EntityId
    and ent.EntityName = 'highBug'
set Movement = 'rightSwoop'
where le.Timing = 4100;
update LevelEntities le
  join LevelHeader lh on lh.LevelHeaderId = le.LevelHeaderId
    and lh.LevelCode = 'level20'
  join Entities ent on ent.EntityId = le.EntityId
    and ent.EntityName = 'tombstoneBug'
set Movement = 'tombstone'
where le.Timing = 4500;
update Entities
set Speed = 0.51
where EntityName = 'pitfall';
update Entities
set HP = 3500
where EntityName = 'tombstoneBug';
alter table LevelHeader
  drop column MultiplierTier5;
update LevelHeader set MultiplierTier1 = 2300, MultiplierTier2 = 2750, MultiplierTier3 = 3200, MultiplierTier4 = 3800 where LevelCode = 'level1';
update LevelHeader set MultiplierTier1 = 2700, MultiplierTier2 = 3150, MultiplierTier3 = 3600, MultiplierTier4 = 4200 where LevelCode = 'level2';
update LevelHeader set MultiplierTier1 = 2700, MultiplierTier2 = 3150, MultiplierTier3 = 3600, MultiplierTier4 = 4200 where LevelCode = 'level3';
update LevelHeader set MultiplierTier1 = 2600, MultiplierTier2 = 3050, MultiplierTier3 = 3500, MultiplierTier4 = 4100 where LevelCode = 'level4';
update LevelHeader set MultiplierTier1 = 3400, MultiplierTier2 = 3850, MultiplierTier3 = 4300, MultiplierTier4 = 4900 where LevelCode = 'level5';
update LevelHeader set MultiplierTier1 = 3000, MultiplierTier2 = 3450, MultiplierTier3 = 3900, MultiplierTier4 = 4500 where LevelCode = 'level6';
update LevelHeader set MultiplierTier1 = 3000, MultiplierTier2 = 3450, MultiplierTier3 = 3900, MultiplierTier4 = 4500 where LevelCode = 'level7';
update LevelHeader set MultiplierTier1 = 2400, MultiplierTier2 = 2850, MultiplierTier3 = 3300, MultiplierTier4 = 3900 where LevelCode = 'level8';
update LevelHeader set MultiplierTier1 = 2700, MultiplierTier2 = 3150, MultiplierTier3 = 3600, MultiplierTier4 = 4200 where LevelCode = 'level9';
update LevelHeader set MultiplierTier1 = 2600, MultiplierTier2 = 3050, MultiplierTier3 = 3500, MultiplierTier4 = 4100 where LevelCode = 'level10';
update LevelHeader set MultiplierTier1 = 2800, MultiplierTier2 = 3250, MultiplierTier3 = 3700, MultiplierTier4 = 4300 where LevelCode = 'level11';
update LevelHeader set MultiplierTier1 = 2600, MultiplierTier2 = 3050, MultiplierTier3 = 3500, MultiplierTier4 = 4100 where LevelCode = 'level12';
update LevelHeader set MultiplierTier1 = 4000, MultiplierTier2 = 4450, MultiplierTier3 = 4900, MultiplierTier4 = 5500 where LevelCode = 'level13';
update LevelHeader set MultiplierTier1 = 4200, MultiplierTier2 = 4650, MultiplierTier3 = 5100, MultiplierTier4 = 5700 where LevelCode = 'level14';
update LevelHeader set MultiplierTier1 = 2500, MultiplierTier2 = 2950, MultiplierTier3 = 3400, MultiplierTier4 = 3900 where LevelCode = 'level15';
update LevelHeader set MultiplierTier1 = 2700, MultiplierTier2 = 3150, MultiplierTier3 = 3600, MultiplierTier4 = 4200 where LevelCode = 'level16';
update LevelHeader set MultiplierTier1 = 4500, MultiplierTier2 = 4950, MultiplierTier3 = 5400, MultiplierTier4 = 6000 where LevelCode = 'level17';
update LevelHeader set MultiplierTier1 = 4300, MultiplierTier2 = 4750, MultiplierTier3 = 5200, MultiplierTier4 = 5600 where LevelCode = 'level18';
update LevelHeader set MultiplierTier1 = 6200, MultiplierTier2 = 6800, MultiplierTier3 = 7400, MultiplierTier4 = 8400 where LevelCode = 'level19';
update LevelHeader set MultiplierTier1 = 7000, MultiplierTier2 = 8000, MultiplierTier3 = 9000, MultiplierTier4 = 12000 where LevelCode = 'level20';
update Entities set Speed = 0.48 where EntityName = 'playerSleeping';