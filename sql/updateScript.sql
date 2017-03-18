alter table levelEntities drop column bounty;
create table Entities
(
  entityId int not null auto_increment,
  entityName varchar(64) not null,
  entityType varchar(10) not null,
  hp int not null,
  speed int not null,
  attackType varchar(7),
  cooldown int not null,
  spawnSound nvarchar(64),
  primary key (entityId)
);
alter table levelEntities drop column assetName;
insert into Entities (entityName, entityType, hp, speed, attackType, cooldown, spawnSound) values
  ('entityBullet', 'temp', 100, 7, 'melee', 0, NULL),
  ('bullet', 'temp', 30, 9, 'melee', 0, NULL),
  ('bulletLeft', 'temp', 30, 9, 'melee', 0, NULL),
  ('bulletRight', 'temp', 30, 9, 'melee', 0, NULL),
  ('bulletUpperLeft', 'temp', 30, 9, 'melee', 0, NULL),
  ('bulletUpperRight', 'temp', 30, 9, 'melee', 0, NULL),
  ('bulletBig', 'temp', 30, 9, 'melee', 0, NULL),
  ('laptop', 'temp', 40, 5, 'none', 0, NULL),
  ('explosion', 'temp', 40, 0, 'melee', 0, NULL),
  ('leftTombstoneAttack', 'temp', 5000, 0, 'none', 0, NULL),
  ('rightTombstoneAttack', 'temp', 5000, 0, 'none', 0, NULL),
  ('centerTombstoneAttack', 'temp', 5000, 0, 'none', 0, NULL),
  ('playerSleeping', 'death', 150, 0.6, 'none', 0, NULL),
  ('lowBugDeath', 'death', 45, 0, 'none', 0, NULL),
  ('mediumBugDeath', 'death', 45, 0, 'none', 0, NULL),
  ('highBugDeath', 'death', 45, 0, 'none', 0, NULL),
  ('todayBugDeath', 'death', 45, 0, 'none', 0, NULL),
  ('tombstoneBugDeath', 'death', 45, 0, 'none', 0, NULL),
  ('pitfall', 'level', 2000, 0.6, 'melee', 0, NULL),
  ('floor', 'level', 4400, 0.6, 'none', 0, NULL),
  ('lowBug', 'level', 8, 100, 'melee', 0, NULL),
  ('mediumBug', 'level', 16, 100, 'ranged', 60, NULL),
  ('highBug', 'level', 32, 100, 'melee', 0, NULL),
  ('todayBug', 'level',64, 100, 'ranged', 45, NULL),
  ('tombstoneBug', 'level', 1000, 100, 'special', 300, 'tombstoneRoar');
alter table levelEntities
add column entityId int not null default 1,
add foreign key fk_entityId(entityId) references Entities(entityId) on delete cascade;
insert into entities (entityName, entityType, hp, speed, attackType, cooldown, spawnSound) values ('player','level',1 ,100 ,'ranged', 0, NULL);
update levelentities
set entityid = (select entityid from entities where entityname = 'lowBug')
where levelentityid = 3;
update levelentities
set entityid = (select entityid from entities where entityname = 'floor')
where levelentityid = 2;
update levelentities
set entityid = (select entityid from entities where entityname = 'player')
where levelentityid = 1;
alter table entities
  add column bounty int not null default 0;
update entities set bounty = 20 where entityname = 'lowBug';
update entities set bounty = 30 where entityname = 'mediumBug';
update entities set bounty = 40 where entityname = 'highBug';
update entities set bounty = 50 where entityname = 'todayBug';
update entities set bounty = 1000 where entityname = 'tombstoneBug';
alter table entities modify column speed decimal(5,2) not null;
update entities set speed = 0.6 where entityid in (13,19,20);
insert into levelHeader (levelName, levelCode, levelMusic)
values
  ('Welcome to Jagged Peak', 'level1', 'level1'),
  ('They''ll soon be back and in greater numbers','level2','level2'),
  ('X Marks the Spot','level3','level3'),
  ('Enter the Shooter','level4','level1'),
  ('Swarm','level5','level2');
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 2, 'player', 'playerStart', 'player', 0, entityId from entities where entityname = 'player';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 2, 'floor', 'floor', 'floor', 0, entityId from entities where entityname = 'floor';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 2, 'monster', 'left', 'leftBackAndForth', 100, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 2, 'monster', 'left', 'leftBackAndForth', 110, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 2, 'monster', 'left', 'leftBackAndForth', 120, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 2, 'monster', 'right', 'rightBox', 600, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 2, 'monster', 'right', 'rightBox', 610, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 2, 'monster', 'right', 'rightBox', 620, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 2, 'monster', 'right', 'rightBox', 630, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 2, 'monster', 'left', 'leftSimpleZigZag', 1200, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 2, 'monster', 'left', 'leftSimpleZigZag', 1210, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 2, 'monster', 'left', 'leftSimpleZigZag', 1220, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 2, 'monster', 'left', 'leftSimpleZigZag', 1230, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 2, 'monster', 'right', 'rightBackAndForth', 1850, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 2, 'monster', 'right', 'rightBackAndForth', 1860, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 2, 'monster', 'right', 'rightBackAndForth', 1870, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 2, 'monster', 'right', 'rightBackAndForth', 1880, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'player', 'playerStart', 'player', 0, entityId from entities where entityname = 'player';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'floor', 'floor', 'floor', 0, entityId from entities where entityname = 'floor';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'right', 'rightBox', 100, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'right', 'rightBox', 110, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'right', 'rightBox', 120, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'right', 'rightBox', 130, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'right', 'rightBox', 140, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'right', 'rightBox', 150, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'right', 'rightBox', 160, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'right', 'rightBox', 170, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'left', 'leftBackAndForth', 900, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'left', 'leftBackAndForth', 910, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'left', 'leftBackAndForth', 920, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'left', 'leftBackAndForth', 930, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'left', 'leftBackAndForth', 940, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'left', 'leftBackAndForth', 950, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'left', 'leftBackAndForth', 960, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'right', 'rightSimpleZigZag', 1500, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'right', 'rightSimpleZigZag', 1510, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'right', 'rightSimpleZigZag', 1520, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'right', 'rightSimpleZigZag', 1530, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'right', 'rightSimpleZigZag', 1540, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'right', 'rightSimpleZigZag', 1550, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'left', 'leftBox', 2200, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'left', 'leftBox', 2210, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'left', 'leftBox', 2220, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'left', 'leftBox', 2230, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 3, 'monster', 'left', 'leftBox', 2240, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'player', 'playerStart', 'player', 0, entityId from entities where entityname = 'player';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'floor', 'floor', 'floor', 0, entityId from entities where entityname = 'floor';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'right', 'rightSimpleZigZag', 100, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'right', 'rightSimpleZigZag', 110, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'right', 'rightSimpleZigZag', 120, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'right', 'rightSimpleZigZag', 130, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'right', 'rightSimpleZigZag', 140, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftBackAndForth', 700, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftBackAndForth', 710, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftBackAndForth', 720, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftBackAndForth', 730, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftBackAndForth', 740, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftBackAndForth', 750, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftBackAndForth', 760, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftBackAndForth', 770, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftBackAndForth', 780, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftBackAndForth', 790, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'right', 'rightX', 1500, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'right', 'rightX', 1510, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'right', 'rightX', 1520, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'right', 'rightX', 1530, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'right', 'rightX', 1540, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftSimpleZigZag', 2200, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftSimpleZigZag', 2210, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftSimpleZigZag', 2220, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftSimpleZigZag', 2230, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftSimpleZigZag', 2240, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftX', 3000, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftX', 3010, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftX', 3020, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftX', 3030, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 4, 'monster', 'left', 'leftX', 3040, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'player', 'playerStart', 'player', 0, entityId from entities where entityname = 'player';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'floor', 'floor', 'floor', 0, entityId from entities where entityname = 'floor';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'right', 'rightX', 100, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'right', 'rightX', 110, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'right', 'rightX', 120, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'right', 'rightX', 130, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'right', 'rightX', 140, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'right', 'rightX', 150, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'right', 'rightX', 160, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'left', 'leftSimpleZigZag', 900, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'left', 'leftSimpleZigZag', 910, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'left', 'leftSimpleZigZag', 920, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'left', 'leftSimpleZigZag', 930, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'left', 'leftSimpleZigZag', 940, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'left', 'leftSimpleZigZag', 950, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'right', 'rightBox', 1600, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'right', 'rightBox', 1610, entityId from entities where entityname = 'mediumBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'right', 'rightBox', 1620, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'right', 'rightBox', 1630, entityId from entities where entityname = 'mediumBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'right', 'rightBox', 1640, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'right', 'rightBackAndForth', 2200, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'right', 'rightBackAndForth', 2210, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'right', 'rightBackAndForth', 2220, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'right', 'rightBackAndForth', 2230, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'right', 'rightBackAndForth', 2240, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'right', 'rightBackAndForth', 2250, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 5, 'monster', 'right', 'rightBackAndForth', 2260, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'player', 'playerStart', 'player', 0, entityId from entities where entityname = 'player';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'floor', 'floor', 'floor', 0, entityId from entities where entityname = 'floor';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftSimpleZigZag', 100, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftSimpleZigZag', 110, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftSimpleZigZag', 120, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftSimpleZigZag', 130, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftSimpleZigZag', 140, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftSimpleZigZag', 150, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftSimpleZigZag', 160, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftSimpleZigZag', 170, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftSimpleZigZag', 180, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftSimpleZigZag', 190, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightX', 1000, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightX', 1010, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightX', 1020, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightX', 1030, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightX', 1040, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightX', 1050, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightX', 1060, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightX', 1070, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightX', 1080, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightX', 1090, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightBox', 1800, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightBox', 1810, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightBox', 1820, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightBox', 1830, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightBox', 1840, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightBox', 1850, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightBox', 1860, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightBox', 1870, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightBox', 1880, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightBox', 1890, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftBackAndForth', 2900, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftBackAndForth', 2910, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftBackAndForth', 2920, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftBackAndForth', 2930, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftBackAndForth', 2940, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftBackAndForth', 2950, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftBackAndForth', 2960, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftBackAndForth', 2970, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftBackAndForth', 2980, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftBackAndForth', 2990, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightSimpleZigZag', 3800, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightSimpleZigZag', 3810, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightSimpleZigZag', 3820, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightSimpleZigZag', 3830, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightSimpleZigZag', 3840, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightSimpleZigZag', 3850, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightSimpleZigZag', 3860, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightSimpleZigZag', 3870, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightSimpleZigZag', 3880, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'right', 'rightSimpleZigZag', 3890, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftX', 4500, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftX', 4510, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftX', 4520, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftX', 4530, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftX', 4540, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftX', 4550, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftX', 4560, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftX', 4570, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftX', 4580, entityId from entities where entityname = 'lowBug';
insert into levelentities (levelheaderid, type, position, movement, timing, entityId) select 6, 'monster', 'left', 'leftX', 4590, entityId from entities where entityname = 'lowBug';