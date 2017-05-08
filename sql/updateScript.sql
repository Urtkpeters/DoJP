insert into Files (FilePath, FileType, FileName, Volume) values
  ('media/sprites/playerChar.png', 'spriteImage', 'player', NULL),
  ('media/sprites/entityBullet.png', 'spriteImage', 'entityBullet', NULL),
  ('media/sprites/bullet.png', 'spriteImage', 'bullet', NULL),
  ('media/sprites/bulletLeft.png', 'spriteImage', 'bulletLeft', NULL),
  ('media/sprites/bulletRight.png', 'spriteImage', 'bulletRight', NULL),
  ('media/sprites/bulletUpperLeft.png', 'spriteImage', 'bulletUpperLeft', NULL),
  ('media/sprites/bulletUpperRight.png', 'spriteImage', 'bulletUpperRight', NULL),
  ('media/sprites/bulletBig.png', 'spriteImage', 'bulletBig', NULL),
  ('media/sprites/laptop.png', 'spriteImage', 'laptop', NULL),
  ('media/sprites/explosion.png', 'spriteImage', 'explosion', NULL),
  ('media/sprites/lowBug.png', 'spriteImage', 'lowBug', NULL),
  ('media/sprites/mediumBug.png', 'spriteImage', 'mediumBug', NULL),
  ('media/sprites/highBug.png', 'spriteImage', 'highBug', NULL),
  ('media/sprites/todayBug.png', 'spriteImage', 'todayBug', NULL),
  ('media/sprites/tombstoneBug.png', 'spriteImage', 'tombstoneBug', NULL),
  ('media/sprites/lowBugDeath.png', 'spriteImage', 'lowBugDeath', NULL),
  ('media/sprites/mediumBugDeath.png', 'spriteImage', 'mediumBugDeath', NULL),
  ('media/sprites/highBugDeath.png', 'spriteImage', 'highBugDeath', NULL),
  ('media/sprites/todayBugDeath.png', 'spriteImage', 'todayBugDeath', NULL),
  ('media/sprites/tombstoneBugDeath.png', 'spriteImage', 'tombstoneBugDeath', NULL),
  ('media/sprites/floor.png', 'spriteImage', 'floor', NULL),
  ('media/sprites/pitfall.png', 'spriteImage', 'pitfall', NULL),
  ('media/sprites/leftTombstoneAttack.png', 'spriteImage', 'leftTombstoneAttack', NULL),
  ('media/sprites/rightTombstoneAttack.png', 'spriteImage', 'rightTombstoneAttack', NULL),
  ('media/sprites/centerTombstoneAttack.png', 'spriteImage', 'centerTombstoneAttack', NULL),
  ('media/sprites/playerSleeping.png', 'spriteImage', 'playerSleeping', NULL);
insert into Files (FilePath, FileType, FileName, Volume, TicksPerFrame) values
  ('media/sprites/playerChar.json', 'SpriteJSON', 'playerJSON', NULL, 8),
  ('media/sprites/entityBullet.json', 'SpriteJSON', 'entityBulletJSON', NULL, 8),
  ('media/sprites/bullet.json', 'SpriteJSON', 'bulletJSON', NULL, 8),
  ('media/sprites/bulletLeft.json', 'SpriteJSON', 'bulletLeftJSON', NULL, 8),
  ('media/sprites/bulletRight.json', 'SpriteJSON', 'bulletRightJSON', NULL, 8),
  ('media/sprites/bulletUpperLeft.json', 'SpriteJSON', 'bulletUpperLeftJSON', NULL, 8),
  ('media/sprites/bulletUpperRight.json', 'SpriteJSON', 'bulletUpperRightJSON', NULL, 8),
  ('media/sprites/bulletBig.json', 'SpriteJSON', 'bulletBigJSON', NULL, 8),
  ('media/sprites/laptop.json', 'SpriteJSON', 'laptopJSON', NULL, 8),
  ('media/sprites/explosion.json', 'SpriteJSON', 'explosionJSON', NULL, 8),
  ('media/sprites/lowBug.json', 'SpriteJSON', 'lowBugJSON', NULL, 8),
  ('media/sprites/mediumBug.json', 'SpriteJSON', 'mediumBugJSON', NULL, 8),
  ('media/sprites/highBug.json', 'SpriteJSON', 'highBugJSON', NULL, 8),
  ('media/sprites/todayBug.json', 'SpriteJSON', 'todayBugJSON', NULL, 8),
  ('media/sprites/tombstoneBug.json', 'SpriteJSON', 'tombstoneBugJSON', NULL, 8),
  ('media/sprites/lowBugDeath.json', 'SpriteJSON', 'lowBugDeathJSON', NULL, 8),
  ('media/sprites/mediumBugDeath.json', 'SpriteJSON', 'mediumBugDeathJSON', NULL, 8),
  ('media/sprites/highBugDeath.json', 'SpriteJSON', 'highBugDeathJSON', NULL, 8),
  ('media/sprites/todayBugDeath.json', 'SpriteJSON', 'todayBugDeathJSON', NULL, 8),
  ('media/sprites/tombstoneBugDeath.json', 'SpriteJSON', 'tombstoneBugDeathJSON', NULL, 8),
  ('media/sprites/floor.json', 'SpriteJSON', 'floorJSON', NULL, 8),
  ('media/sprites/pitfall.json', 'SpriteJSON', 'pitfallJSON', NULL, 8),
  ('media/sprites/leftTombstoneAttack.json', 'SpriteJSON', 'leftTombstoneAttackJSON', NULL, 8),
  ('media/sprites/rightTombstoneAttack.json', 'SpriteJSON', 'rightTombstoneAttackJSON', NULL, 8),
  ('media/sprites/centerTombstoneAttack.json', 'SpriteJSON', 'centerTombstoneAttackJSON', NULL, 8),
  ('media/sprites/playerSleeping.json', 'SpriteJSON', 'playerSleepingJSON', NULL, 8);
update Files set TicksPerFrame = 6 where FileName = 'lowBugDeathJSON';
update Files set TicksPerFrame = 6 where FileName = 'mediumBugDeathJSON';
update Files set TicksPerFrame = 6 where FileName = 'highBugDeathJSON';
update Files set TicksPerFrame = 6 where FileName = 'todayBugDeathJSON';
update Files set TicksPerFrame = 6 where FileName = 'tombstoneBugDeathJSON';
update Files set TicksPerFrame = 0 where FileName = 'leftTombstoneAttackJSON';
update Files set TicksPerFrame = 0 where FileName = 'rightTombstoneAttackJSON';
update Files set TicksPerFrame = 0 where FileName = 'centerTombstoneAttackJSON';
update LevelEntities
set timing = timing + 200
where type not in ('player','floor');
update Entities set speed = 2 where entityName = 'tombstoneBug';
update entities set hp = 90 where entityName = 'tombstoneBugDeath';
create table SavedGames
(
  SavedGameId int not null auto_increment,
  UserId int not null,
  NextLevel int not null,
  Earnings int not null,
  Score int not null,
  PTO int not null,
  WinDate int not null,
  Nespresso int not null,
  ActiveIDE varchar(64),
  Notepad int not null,
  NotepadPlusPlus int not null,
  Far int not null,
  Eclipse int not null,
  Dreamweaver int not null,
  MuleStudio int not null,
  IntelliJ int not null,
  Netbeans int not null,
  primary key (SavedGameId),
  foreign key FK_SavesUserId(UserId) references Users(UserId)
);
insert into levelHeader (levelName, levelCode, Music_FileId) values ('404 - Floor Not Found', 'level6', 23);
insert into levelHeader (levelName, levelCode, Music_FileId) values ('Right Down the Middle', 'level7', 21);
insert into levelHeader (levelName, levelCode, Music_FileId) values ('Beware the Swoop', 'level8', 22);
insert into levelHeader (levelName, levelCode, Music_FileId) values ('High Tide', 'level9', 23);
insert into levelHeader (levelName, levelCode, Music_FileId) values ('Milestone', 'level10', 21);
insert into levelHeader (levelName, levelCode, Music_FileId) values ('Before Sundown', 'level11', 22);
insert into levelHeader (levelName, levelCode, Music_FileId) values ('Why do today what can be done tomorrow?', 'level12', 23);
insert into levelHeader (levelName, levelCode, Music_FileId) values ('Threading the Needle', 'level13', 21);
insert into levelHeader (levelName, levelCode, Music_FileId) values ('The Dreaded Tombstone', 'level14', 22);
insert into levelHeader (levelName, levelCode, Music_FileId) values ('Swarm Surge', 'level15', 23);
insert into levelHeader (levelName, levelCode, Music_FileId) values ('Swish', 'level16', 21);
insert into levelHeader (levelName, levelCode, Music_FileId) values ('Little Bit of Everything', 'level17', 22);
insert into levelHeader (levelName, levelCode, Music_FileId) values ('Fighting in the Shade', 'level18', 23);
insert into levelHeader (levelName, levelCode, Music_FileId) values ('Tiers', 'level19', 21);
insert into levelHeader (levelName, levelCode, Music_FileId) values ('When it rains, it pours.', 'level20', 22);
set @levelHeaderId = (select levelHeaderId from levelHeader where levelCode = 'level6');
insert into levelEntities (levelHeaderId, type, position, movement, timing, entityId) values
  (@levelHeaderId, 'player', 'playerStart','player', 0, 26),
  (@levelHeaderId, 'floor', 'floor','floor', 0, 20),
  (@levelHeaderId, 'lowBug', 'right','rightX', 300, 21),
  (@levelHeaderId, 'lowBug', 'right','rightX', 310, 21),
  (@levelHeaderId, 'lowBug', 'right','rightX', 320, 21),
  (@levelHeaderId, 'pitfall', 'pit1','floor', 500, 19),
  (@levelHeaderId, 'lowBug', 'left','leftBox', 800, 21),
  (@levelHeaderId, 'mediumBug', 'left','leftBox', 810, 22),
  (@levelHeaderId, 'lowBug', 'left','leftBox', 820, 21),
  (@levelHeaderId, 'mediumBug', 'left','leftBox', 830, 22),
  (@levelHeaderId, 'lowBug', 'left','leftBox', 840, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSimpleZigZag', 1500, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSimpleZigZag', 1510, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSimpleZigZag', 1520, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSimpleZigZag', 1530, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSimpleZigZag', 1540, 21),
  (@levelHeaderId, 'pitfall', 'pit3','floor', 1800, 19),
  (@levelHeaderId, 'lowBug', 'right','rightBackAndForth', 2500, 21),
  (@levelHeaderId, 'mediumBug', 'right','rightBackAndForth', 2510, 22),
  (@levelHeaderId, 'lowBug', 'right','rightBackAndForth', 2520, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBackAndForth', 2530, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBackAndForth', 2540, 21),
  (@levelHeaderId, 'mediumBug', 'right','rightBackAndForth', 2550, 22),
  (@levelHeaderId, 'lowBug', 'right','rightBackAndForth', 2560, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 3200, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 3210, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 3220, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 3230, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 3240, 21);
set @levelHeaderId = (select levelHeaderId from levelHeader where levelCode = 'level7');
insert into levelEntities (levelHeaderId, type, position, movement, timing, entityId) values
  (@levelHeaderId, 'player', 'playerStart','player', 0, 26),
  (@levelHeaderId, 'floor', 'floor','floor', 0, 20),
  (@levelHeaderId, 'mediumBug', 'left','leftSimpleZigZag', 300, 22),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 310, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 320, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 330, 21),
  (@levelHeaderId, 'mediumBug', 'left','leftSimpleZigZag', 340, 22),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 1000, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 1010, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 1020, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 1030, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 1040, 21),
  (@levelHeaderId, 'pitfall', 'pit2','floor', 1100, 19),
  (@levelHeaderId, 'lowBug', 'right','centerBoxes', 1800, 21),
  (@levelHeaderId, 'lowBug', 'right','centerBoxes', 1810, 21),
  (@levelHeaderId, 'mediumBug', 'right','centerBoxes', 1820, 22),
  (@levelHeaderId, 'mediumBug', 'right','centerBoxes', 1830, 22),
  (@levelHeaderId, 'lowBug', 'right','centerBoxes', 1840, 21),
  (@levelHeaderId, 'lowBug', 'right','centerBoxes', 1850, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBackAndForth', 3000, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBackAndForth', 3010, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBackAndForth', 3020, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBackAndForth', 3030, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBackAndForth', 3040, 21),
  (@levelHeaderId, 'mediumBug', 'left','leftSimpleZigZag', 3700, 22),
  (@levelHeaderId, 'mediumBug', 'left','leftSimpleZigZag', 3710, 22),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 3720, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 3730, 21),
  (@levelHeaderId, 'mediumBug', 'left','leftSimpleZigZag', 3740, 22),
  (@levelHeaderId, 'mediumBug', 'left','leftSimpleZigZag', 3750, 22),
  (@levelHeaderId, 'lowBug', 'right','rightX', 4800, 21),
  (@levelHeaderId, 'lowBug', 'right','rightX', 4810, 21),
  (@levelHeaderId, 'lowBug', 'right','rightX', 4820, 21);
set @levelHeaderId = (select levelHeaderId from levelHeader where levelCode = 'level8');
insert into levelEntities (levelHeaderId, type, position, movement, timing, entityId) values
  (@levelHeaderId, 'player', 'playerStart','player', 0, 26),
  (@levelHeaderId, 'floor', 'floor','floor', 0, 20),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 300, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 310, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 320, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 330, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 340, 21),
  (@levelHeaderId, 'pitfall', 'pit1','floor', 900, 19),
  (@levelHeaderId, 'pitfall', 'pit4','floor', 900, 19),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 1200, 21),
  (@levelHeaderId, 'mediumBug', 'right','rightBox', 1210, 22),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 1220, 21),
  (@levelHeaderId, 'mediumBug', 'right','rightBox', 1230, 22),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 1240, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSwoop', 2000, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSwoop', 2010, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSwoop', 2020, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSwoop', 2030, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSwoop', 2040, 21),
  (@levelHeaderId, 'mediumBug', 'right','rightBackAndForth', 3000, 22),
  (@levelHeaderId, 'lowBug', 'left','rightBackAndForth', 3010, 21),
  (@levelHeaderId, 'lowBug', 'left','rightBackAndForth', 3020, 21),
  (@levelHeaderId, 'lowBug', 'left','rightBackAndForth', 3030, 21),
  (@levelHeaderId, 'mediumBug', 'right','rightBackAndForth', 3040, 22),
  (@levelHeaderId, 'lowBug', 'left','centerBoxes', 3600, 21),
  (@levelHeaderId, 'lowBug', 'left','centerBoxes', 3610, 21),
  (@levelHeaderId, 'lowBug', 'left','centerBoxes', 3620, 21),
  (@levelHeaderId, 'lowBug', 'left','centerBoxes', 3630, 21),
  (@levelHeaderId, 'lowBug', 'left','centerBoxes', 3640, 21);
set @levelHeaderId = (select levelHeaderId from levelHeader where levelCode = 'level9');
insert into levelEntities (levelHeaderId, type, position, movement, timing, entityId) values
  (@levelHeaderId, 'player', 'playerStart','player', 0, 26),
  (@levelHeaderId, 'floor', 'floor','floor', 0, 20),
  (@levelHeaderId, 'lowBug', 'right','rightSwoop', 300, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSwoop', 310, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSwoop', 320, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 1000, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 1010, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 1020, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 1030, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 1040, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 1050, 21),
  (@levelHeaderId, 'pitfall', 'pit2','floor', 1500, 19),
  (@levelHeaderId, 'pitfall', 'pit3','floor', 1500, 19),
  (@levelHeaderId, 'mediumBug', 'right','rightBackAndForth', 1800, 22),
  (@levelHeaderId, 'lowBug', 'right','rightBackAndForth', 1810, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBackAndForth', 1820, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBackAndForth', 1830, 21),
  (@levelHeaderId, 'mediumBug', 'right','rightBackAndForth', 1840, 22),
  (@levelHeaderId, 'lowBug', 'left','leftBox', 2700, 21),
  (@levelHeaderId, 'mediumBug', 'left','leftBox', 2710, 22),
  (@levelHeaderId, 'highBug', 'left','leftBox', 2720, 23),
  (@levelHeaderId, 'mediumBug', 'left','leftBox', 2730, 22),
  (@levelHeaderId, 'lowBug', 'left','leftBox', 2740, 21),
  (@levelHeaderId, 'lowBug', 'right','rightX', 3900, 21),
  (@levelHeaderId, 'lowBug', 'right','rightX', 3910, 21),
  (@levelHeaderId, 'lowBug', 'right','rightX', 3920, 21),
  (@levelHeaderId, 'lowBug', 'right','rightX', 3930, 21),
  (@levelHeaderId, 'lowBug', 'right','rightX', 3940, 21),
  (@levelHeaderId, 'lowBug', 'right','rightX', 3950, 21);
set @levelHeaderId = (select levelHeaderId from levelHeader where levelCode = 'level10');
insert into levelEntities (levelHeaderId, type, position, movement, timing, entityId) values
  (@levelHeaderId, 'player', 'playerStart','player', 0, 26),
  (@levelHeaderId, 'floor', 'floor','floor', 0, 20),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 300, 21),
  (@levelHeaderId, 'mediumBug', 'right','rightBox', 310, 22),
  (@levelHeaderId, 'highBug', 'right','rightBox', 320, 23),
  (@levelHeaderId, 'mediumBug', 'right','rightBox', 330, 22),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 340, 21),
  (@levelHeaderId, 'mediumBug', 'right','rightBackAndForth', 1200, 22),
  (@levelHeaderId, 'mediumBug', 'right','rightBackAndForth', 1210, 22),
  (@levelHeaderId, 'mediumBug', 'right','rightBackAndForth', 1220, 22),
  (@levelHeaderId, 'mediumBug', 'right','rightBackAndForth', 1230, 22),
  (@levelHeaderId, 'lowBug', 'left','leftX', 2000, 21),
  (@levelHeaderId, 'lowBug', 'left','leftX', 2010, 21),
  (@levelHeaderId, 'highBug', 'left','leftX', 2020, 23),
  (@levelHeaderId, 'highBug', 'left','leftX', 2030, 23),
  (@levelHeaderId, 'lowBug', 'left','leftX', 2040, 21),
  (@levelHeaderId, 'lowBug', 'left','leftX', 2050, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 2600, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 2610, 21),
  (@levelHeaderId, 'highBug', 'left','leftSimpleZigZag', 2620, 23),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 2630, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 2640, 21),
  (@levelHeaderId, 'mediumBug', 'left','centerBoxes', 3700, 22),
  (@levelHeaderId, 'highBug', 'left','centerBoxes', 3710, 23),
  (@levelHeaderId, 'mediumBug', 'left','centerBoxes', 3720, 22),
  (@levelHeaderId, 'highBug', 'left','centerBoxes', 3730, 23),
  (@levelHeaderId, 'mediumBug', 'left','centerBoxes', 3740, 22);
set @levelHeaderId = (select levelHeaderId from levelHeader where levelCode = 'level11');
insert into levelEntities (levelHeaderId, type, position, movement, timing, entityId) values
  (@levelHeaderId, 'player', 'playerStart','player', 0, 26),
  (@levelHeaderId, 'floor', 'floor','floor', 0, 20),
  (@levelHeaderId, 'pitfall', 'pit3','floor', 300, 19),
  (@levelHeaderId, 'lowBug', 'right','rightSimpleZigZag', 300, 21),
  (@levelHeaderId, 'mediumBug', 'right','rightSimpleZigZag', 310, 22),
  (@levelHeaderId, 'mediumBug', 'right','rightSimpleZigZag', 320, 22),
  (@levelHeaderId, 'lowBug', 'right','rightSimpleZigZag', 330, 21),
  (@levelHeaderId, 'lowBug', 'left','leftX', 1000, 21),
  (@levelHeaderId, 'lowBug', 'left','leftX', 1010, 21),
  (@levelHeaderId, 'lowBug', 'left','leftX', 1020, 21),
  (@levelHeaderId, 'lowBug', 'left','leftX', 1030, 21),
  (@levelHeaderId, 'highBug', 'left','leftX', 1040, 22),
  (@levelHeaderId, 'lowBug', 'right','rightSwoop', 1600, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSwoop', 1610, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSwoop', 1620, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSwoop', 1630, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSwoop', 1640, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSwoop', 1650, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSwoop', 1660, 21),
  (@levelHeaderId, 'lowBug', 'left','leftBackAndForth', 2500, 21),
  (@levelHeaderId, 'mediumBug', 'left','leftBackAndForth', 2510, 22),
  (@levelHeaderId, 'todayBug', 'left','leftBackAndForth', 2520, 24),
  (@levelHeaderId, 'mediumBug', 'left','leftBackAndForth', 2530, 22),
  (@levelHeaderId, 'lowBug', 'left','leftBackAndForth', 2540, 21),
  (@levelHeaderId, 'pitfall', 'pit1','floor', 2800, 19),
  (@levelHeaderId, 'mediumBug', 'left','leftBox', 3300, 22),
  (@levelHeaderId, 'lowBug', 'left','leftBox', 3310, 21),
  (@levelHeaderId, 'highBug', 'left','leftBox', 3320, 23),
  (@levelHeaderId, 'lowBug', 'left','leftBox', 3330, 21),
  (@levelHeaderId, 'mediumBug', 'left','leftBox', 3340, 22),
  (@levelHeaderId, 'lowBug', 'left','centerBoxes', 3800, 21),
  (@levelHeaderId, 'lowBug', 'left','centerBoxes', 3810, 21),
  (@levelHeaderId, 'lowBug', 'left','centerBoxes', 3820, 21);
set @levelHeaderId = (select levelHeaderId from levelHeader where levelCode = 'level12');
insert into levelEntities (levelHeaderId, type, position, movement, timing, entityId) values
  (@levelHeaderId, 'player', 'playerStart','player', 0, 26),
  (@levelHeaderId, 'floor', 'floor','floor', 0, 20),
  (@levelHeaderId, 'lowBug', 'right','centerBoxes', 300, 21),
  (@levelHeaderId, 'lowBug', 'right','centerBoxes', 310, 21),
  (@levelHeaderId, 'todayBug', 'right','centerBoxes', 320, 24),
  (@levelHeaderId, 'lowBug', 'right','centerBoxes', 330, 21),
  (@levelHeaderId, 'lowBug', 'right','centerBoxes', 340, 21),
  (@levelHeaderId, 'pitfall', 'pit2','floor', 500, 19),
  (@levelHeaderId, 'mediumBug', 'right','rightBackAndForth', 1000, 22),
  (@levelHeaderId, 'mediumBug', 'right','rightBackAndForth', 1010, 22),
  (@levelHeaderId, 'highBug', 'right','rightBackAndForth', 1020, 23),
  (@levelHeaderId, 'highBug', 'right','rightBackAndForth', 1030, 23),
  (@levelHeaderId, 'todayBug', 'right','rightBackAndForth', 1040, 24),
  (@levelHeaderId, 'pitfall', 'pit3','floor', 1400, 19),
  (@levelHeaderId, 'lowBug', 'left','leftSwoop', 1900, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSwoop', 1910, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSwoop', 1920, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSwoop', 1930, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSwoop', 1940, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSwoop', 1950, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSwoop', 1960, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSimpleZigZag', 2700, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSimpleZigZag', 2710, 21),
  (@levelHeaderId, 'todayBug', 'right','rightSimpleZigZag', 2720, 24),
  (@levelHeaderId, 'lowBug', 'right','rightSimpleZigZag', 2730, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSimpleZigZag', 2740, 21),
  (@levelHeaderId, 'todayBug', 'left','leftSimpleZigZag', 3500, 24),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 3510, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 3520, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 3530, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 3540, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 3550, 21),
  (@levelHeaderId, 'pitfall', 'pit1','floor', 3900, 19),
  (@levelHeaderId, 'pitfall', 'pit4','floor', 3900, 19),
  (@levelHeaderId, 'todayBug', 'left','centerBoxes', 4300, 24);
set @levelHeaderId = (select levelHeaderId from levelHeader where levelCode = 'level13');
insert into levelEntities (levelHeaderId, type, position, movement, timing, entityId) values
  (@levelHeaderId, 'player', 'playerStart','player', 0, 26),
  (@levelHeaderId, 'floor', 'floor','floor', 0, 20),
  (@levelHeaderId, 'todayBug', 'left','leftBox', 300, 24),
  (@levelHeaderId, 'highBug', 'left','leftBox', 310, 23),
  (@levelHeaderId, 'mediumBug', 'left','leftBox', 320, 22),
  (@levelHeaderId, 'lowBug', 'left','leftBox', 330, 21),
  (@levelHeaderId, 'lowBug', 'left','leftBox', 340, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSimpleZigZag', 1000, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSimpleZigZag', 1010, 21),
  (@levelHeaderId, 'mediumBug', 'right','rightSimpleZigZag', 1020, 22),
  (@levelHeaderId, 'highBug', 'right','rightSimpleZigZag', 1030, 23),
  (@levelHeaderId, 'todayBug', 'right','rightSimpleZigZag', 1040, 24),
  (@levelHeaderId, 'pitfall', 'pit1','floor', 1200, 19),
  (@levelHeaderId, 'lowBug', 'left','leftX', 1700, 21),
  (@levelHeaderId, 'mediumBug', 'left','leftX', 1710, 22),
  (@levelHeaderId, 'highBug', 'left','leftX', 1720, 23),
  (@levelHeaderId, 'todayBug', 'left','leftX', 1730, 24),
  (@levelHeaderId, 'lowBug', 'left','leftX', 1740, 21),
  (@levelHeaderId, 'todayBug', 'right','rightBackAndForth', 2500, 24),
  (@levelHeaderId, 'mediumBug', 'right','rightBackAndForth', 2510, 22),
  (@levelHeaderId, 'lowBug', 'right','rightBackAndForth', 2520, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBackAndForth', 2530, 21),
  (@levelHeaderId, 'highBug', 'right','rightBackAndForth', 2540, 23),
  (@levelHeaderId, 'pitfall', 'pit2','floor', 2700, 19),
  (@levelHeaderId, 'lowBug', 'right','rightX', 3300, 21),
  (@levelHeaderId, 'todayBug', 'right','rightX', 3310, 24),
  (@levelHeaderId, 'highBug', 'right','rightX', 3320, 23),
  (@levelHeaderId, 'lowBug', 'right','rightX', 3330, 21),
  (@levelHeaderId, 'mediumBug', 'right','rightX', 3340, 22);
set @levelHeaderId = (select levelHeaderId from levelHeader where levelCode = 'level15');
insert into levelEntities (levelHeaderId, type, position, movement, timing, entityId) values
  (@levelHeaderId, 'player', 'playerStart','player', 0, 26),
  (@levelHeaderId, 'floor', 'floor','floor', 0, 20),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 300, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 310, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 320, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 330, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 340, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 350, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 360, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 370, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 380, 21),
  (@levelHeaderId, 'lowBug', 'right','rightBox', 390, 21),
  (@levelHeaderId, 'pitfall', 'pit2','floor', 700, 19),
  (@levelHeaderId, 'lowBug', 'left','leftSwoop', 900, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSwoop', 910, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSwoop', 920, 21),
  (@levelHeaderId, 'highBug', 'left','leftSwoop', 930, 23),
  (@levelHeaderId, 'highBug', 'left','leftSwoop', 940, 23),
  (@levelHeaderId, 'highBug', 'right','rightSimpleZigZag', 1800, 23),
  (@levelHeaderId, 'lowBug', 'right','rightSimpleZigZag', 1810, 21),
  (@levelHeaderId, 'highBug', 'right','rightSimpleZigZag', 1820, 23),
  (@levelHeaderId, 'lowBug', 'right','rightSimpleZigZag', 1830, 21),
  (@levelHeaderId, 'highBug', 'right','rightSimpleZigZag', 1840, 23),
  (@levelHeaderId, 'highBug', 'left','leftX', 2500, 23),
  (@levelHeaderId, 'lowBug', 'left','leftX', 2510, 21),
  (@levelHeaderId, 'highBug', 'left','leftX', 2520, 23),
  (@levelHeaderId, 'highBug', 'left','leftX', 2530, 23),
  (@levelHeaderId, 'logBug', 'left','leftX', 2540, 21),
  (@levelHeaderId, 'highBug', 'left','leftX', 2550, 23),
  (@levelHeaderId, 'pitfall', 'pit2','floor', 2800, 19),
  (@levelHeaderId, 'highBug', 'left','leftSimpleZigZag', 3200, 23),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 3210, 21),
  (@levelHeaderId, 'highBug', 'left','leftSimpleZigZag', 3220, 23),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 3230, 21),
  (@levelHeaderId, 'highBug', 'left','leftSimpleZigZag', 3240, 23),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 3250, 21),
  (@levelHeaderId, 'highBug', 'left','leftSimpleZigZag', 3260, 23),
  (@levelHeaderId, 'highBug', 'right','rightSwoop', 4100, 23),
  (@levelHeaderId, 'highBug', 'right','rightSwoop', 4110, 23),
  (@levelHeaderId, 'highBug', 'right','rightSwoop', 4120, 23),
  (@levelHeaderId, 'highBug', 'right','rightSwoop', 4130, 23),
  (@levelHeaderId, 'highBug', 'right','rightSwoop', 4140, 23),
  (@levelHeaderId, 'highBug', 'right','rightSwoop', 4150, 23),
  (@levelHeaderId, 'highBug', 'right','rightSwoop', 4160, 23),
  (@levelHeaderId, 'pitfall', 'pit4','floor', 4100, 19);
set @levelHeaderId = (select levelHeaderId from levelHeader where levelCode = 'level16');
insert into levelEntities (levelHeaderId, type, position, movement, timing, entityId) values
  (@levelHeaderId, 'player', 'playerStart','player', 0, 26),
  (@levelHeaderId, 'floor', 'floor','floor', 0, 20),
  (@levelHeaderId, 'mediumBug', 'right','rightX', 300, 22),
  (@levelHeaderId, 'mediumBug', 'right','rightX', 310, 22),
  (@levelHeaderId, 'mediumBug', 'right','rightX', 320, 22),
  (@levelHeaderId, 'mediumBug', 'right','rightX', 330, 22),
  (@levelHeaderId, 'mediumBug', 'right','rightX', 340, 22),
  (@levelHeaderId, 'highBug', 'left','leftSimpleZigZag', 1200, 23),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 1210, 21),
  (@levelHeaderId, 'todayBug', 'left','leftSimpleZigZag', 1220, 24),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 1230, 21),
  (@levelHeaderId, 'highBug', 'left','leftSimpleZigZag', 1240, 23),
  (@levelHeaderId, 'highBug', 'right','rightSwoop', 2100, 23),
  (@levelHeaderId, 'lowBug', 'right','rightSwoop', 2110, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSwoop', 2120, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSwoop', 2130, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSwoop', 2140, 21),
  (@levelHeaderId, 'lowBug', 'right','rightSwoop', 2150, 21),
  (@levelHeaderId, 'highBug', 'right','rightSwoop', 2160, 23),
  (@levelHeaderId, 'highBug', 'left','leftX', 3000, 23),
  (@levelHeaderId, 'highBug', 'left','leftX', 3010, 23),
  (@levelHeaderId, 'lowBug', 'left','leftX', 3020, 21),
  (@levelHeaderId, 'lowBug', 'left','leftX', 3030, 21),
  (@levelHeaderId, 'highBug', 'left','leftX', 3040, 23),
  (@levelHeaderId, 'highBug', 'left','leftX', 3050, 23),
  (@levelHeaderId, 'highBug', 'left','leftSwoop', 3900, 23),
  (@levelHeaderId, 'todayBug', 'left','leftSwoop', 3910, 24),
  (@levelHeaderId, 'todayBug', 'left','leftSwoop', 3920, 24),
  (@levelHeaderId, 'todayBug', 'left','leftSwoop', 3930, 24),
  (@levelHeaderId, 'todayBug', 'left','leftSwoop', 3940, 24),
  (@levelHeaderId, 'highBug', 'left','leftSwoop', 3950, 23),
  (@levelHeaderId, 'lowBug', 'left','centerBoxes', 4000, 21);
set @levelHeaderId = (select levelHeaderId from levelHeader where levelCode = 'level17');
insert into levelEntities (levelHeaderId, type, position, movement, timing, entityId) values
  (@levelHeaderId, 'player', 'playerStart','player', 0, 26),
  (@levelHeaderId, 'floor', 'floor','floor', 0, 20),
  (@levelHeaderId, 'lowBug', 'right','rightX', 300, 21),
  (@levelHeaderId, 'mediumBug', 'right','rightX', 310, 22),
  (@levelHeaderId, 'highBug', 'right','rightX', 320, 23),
  (@levelHeaderId, 'todayBug', 'right','rightX', 330, 24),
  (@levelHeaderId, 'todayBug', 'right','rightX', 340, 24),
  (@levelHeaderId, 'highBug', 'right','rightX', 350, 23),
  (@levelHeaderId, 'mediumBug', 'right','rightX', 360, 22),
  (@levelHeaderId, 'lowBug', 'right','rightX', 370, 21),
  (@levelHeaderId, 'todayBug', 'left','leftSimpleZigZag', 1200, 24),
  (@levelHeaderId, 'highBug', 'left','leftSimpleZigZag', 1210, 23),
  (@levelHeaderId, 'mediumBug', 'left','leftSimpleZigZag', 1220, 22),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 1230, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 1240, 21),
  (@levelHeaderId, 'mediumBug', 'left','leftSimpleZigZag', 1250, 22),
  (@levelHeaderId, 'highBug', 'left','leftSimpleZigZag', 1260, 23),
  (@levelHeaderId, 'todayBug', 'left','leftSimpleZigZag', 1270, 24),
  (@levelHeaderId, 'pitfall', 'pit1','floor', 1500, 19),
  (@levelHeaderId, 'pitfall', 'pit4','floor', 1500, 19),
  (@levelHeaderId, 'todayBug', 'left','centerBoxes', 2300, 24),
  (@levelHeaderId, 'todayBug', 'left','centerBoxes', 2310, 24),
  (@levelHeaderId, 'highBug', 'left','centerBoxes', 2320, 23),
  (@levelHeaderId, 'highBug', 'left','centerBoxes', 2330, 23),
  (@levelHeaderId, 'mediumBug', 'left','centerBoxes', 2340, 22),
  (@levelHeaderId, 'mediumBug', 'left','centerBoxes', 2350, 22),
  (@levelHeaderId, 'lowBug', 'left','centerBoxes', 2360, 21),
  (@levelHeaderId, 'lowBug', 'left','centerBoxes', 2370, 21),
  (@levelHeaderId, 'lowBug', 'right','rightX', 3200, 21),
  (@levelHeaderId, 'lowBug', 'right','rightX', 3210, 21),
  (@levelHeaderId, 'mediumBug', 'right','rightX', 3220, 22),
  (@levelHeaderId, 'mediumBug', 'right','rightX', 3230, 22),
  (@levelHeaderId, 'highBug', 'right','rightX', 3240, 23),
  (@levelHeaderId, 'highBug', 'right','rightX', 3250, 23),
  (@levelHeaderId, 'todayBug', 'right','rightX', 3260, 24),
  (@levelHeaderId, 'todayBug', 'right','rightX', 3270, 24),
  (@levelHeaderId, 'pitfall', 'pit2','floor', 3400, 19),
  (@levelHeaderId, 'pitfall', 'pit3','floor', 3400, 19),
  (@levelHeaderId, 'highBug', 'left','leftSwoop', 4500, 23),
  (@levelHeaderId, 'mediumBug', 'left','leftSwoop', 4510, 22),
  (@levelHeaderId, 'lowBug', 'left','leftSwoop', 4520, 21),
  (@levelHeaderId, 'todayBug', 'left','leftSwoop', 4530, 24),
  (@levelHeaderId, 'todayBug', 'left','leftSwoop', 4540, 24),
  (@levelHeaderId, 'lowBug', 'left','leftSwoop', 4550, 21),
  (@levelHeaderId, 'mediumBug', 'left','leftSwoop', 4560, 22),
  (@levelHeaderId, 'highBug', 'left','leftSwoop', 4570, 23);
set @levelHeaderId = (select levelHeaderId from levelHeader where levelCode = 'level18');
insert into levelEntities (levelHeaderId, type, position, movement, timing, entityId) values
  (@levelHeaderId, 'player', 'playerStart','player', 0, 26),
  (@levelHeaderId, 'floor', 'floor','floor', 0, 20),
  (@levelHeaderId, 'mediumBug', 'right','rightBackAndForth', 300, 22),
  (@levelHeaderId, 'mediumBug', 'right','rightBackAndForth', 310, 22),
  (@levelHeaderId, 'mediumBug', 'right','rightBackAndForth', 320, 22),
  (@levelHeaderId, 'mediumBug', 'right','rightBackAndForth', 330, 22),
  (@levelHeaderId, 'mediumBug', 'right','rightBackAndForth', 340, 22),
  (@levelHeaderId, 'mediumBug', 'left','leftSimpleZigZag', 1100, 22),
  (@levelHeaderId, 'mediumBug', 'left','leftSimpleZigZag', 1110, 22),
  (@levelHeaderId, 'todayBug', 'left','leftSimpleZigZag', 1120, 24),
  (@levelHeaderId, 'todayBug', 'left','leftSimpleZigZag', 1130, 24),
  (@levelHeaderId, 'mediumBug', 'left','leftSimpleZigZag', 1140, 22),
  (@levelHeaderId, 'mediumBug', 'left','leftSimpleZigZag', 1150, 22),
  (@levelHeaderId, 'mediumBug', 'right','rightBox', 2000, 22),
  (@levelHeaderId, 'todayBug', 'right','rightBox', 2010, 24),
  (@levelHeaderId, 'mediumBug', 'right','rightBox', 2020, 22),
  (@levelHeaderId, 'todayBug', 'right','rightBox', 2030, 24),
  (@levelHeaderId, 'mediumBug', 'right','rightBox', 2040, 22),
  (@levelHeaderId, 'todayBug', 'right','rightBox', 2050, 24),
  (@levelHeaderId, 'todayBug', 'left','leftX', 2900, 24),
  (@levelHeaderId, 'mediumBug', 'left','leftX', 2910, 22),
  (@levelHeaderId, 'todayBug', 'left','leftX', 2920, 24),
  (@levelHeaderId, 'mediumBug', 'left','leftX', 2930, 22),
  (@levelHeaderId, 'todayBug', 'left','leftX', 2940, 24),
  (@levelHeaderId, 'mediumBug', 'left','leftX', 2950, 22),
  (@levelHeaderId, 'mediumBug', 'left','leftBox', 4000, 22),
  (@levelHeaderId, 'mediumBug', 'left','leftBox', 4010, 22),
  (@levelHeaderId, 'mediumBug', 'left','leftBox', 4020, 22),
  (@levelHeaderId, 'todayBug', 'left','leftBox', 4030, 24),
  (@levelHeaderId, 'todayBug', 'left','leftBox', 4040, 24),
  (@levelHeaderId, 'todayBug', 'left','leftBox', 4050, 24),
  (@levelHeaderId, 'todayBug', 'right','rightSwoop', 5000, 24),
  (@levelHeaderId, 'mediumBug', 'right','rightSwoop', 5010, 22),
  (@levelHeaderId, 'todayBug', 'right','rightSwoop', 5020, 24),
  (@levelHeaderId, 'todayBug', 'right','rightSwoop', 5030, 24),
  (@levelHeaderId, 'mediumBug', 'right','rightSwoop', 5040, 22),
  (@levelHeaderId, 'todayBug', 'right','rightSwoop', 5050, 24);
set @levelHeaderId = (select levelHeaderId from levelHeader where levelCode = 'level19');
insert into levelEntities (levelHeaderId, type, position, movement, timing, entityId) values
  (@levelHeaderId, 'player', 'playerStart','player', 0, 26),
  (@levelHeaderId, 'floor', 'floor','floor', 0, 20),
  (@levelHeaderId, 'lowBug', 'right','rightX', 300, 21),
  (@levelHeaderId, 'lowBug', 'right','rightX', 310, 21),
  (@levelHeaderId, 'lowBug', 'right','rightX', 320, 21),
  (@levelHeaderId, 'lowBug', 'right','leftX', 300, 21),
  (@levelHeaderId, 'lowBug', 'right','leftX', 310, 21),
  (@levelHeaderId, 'lowBug', 'right','leftX', 320, 21),
  (@levelHeaderId, 'mediumBug', 'right','rightSimpleZigZag', 1000, 22),
  (@levelHeaderId, 'highBug', 'right','rightSimpleZigZag', 1010, 23),
  (@levelHeaderId, 'mediumBug', 'right','rightSimpleZigZag', 1020, 22),
  (@levelHeaderId, 'highBug', 'right','rightSimpleZigZag', 1030, 23),
  (@levelHeaderId, 'mediumBug', 'right','rightSimpleZigZag', 1040, 22),
  (@levelHeaderId, 'highBug', 'left','leftBox', 1800, 23),
  (@levelHeaderId, 'mediumBug', 'left','leftBox', 1810, 23),
  (@levelHeaderId, 'highBug', 'left','leftBox', 1820, 23),
  (@levelHeaderId, 'mediumBug', 'left','leftBox', 1830, 22),
  (@levelHeaderId, 'highBug', 'left','leftBox', 1840, 23),
  (@levelHeaderId, 'highBug', 'left','leftSwoop', 2600, 23),
  (@levelHeaderId, 'highBug', 'left','leftSwoop', 2610, 23),
  (@levelHeaderId, 'highBug', 'left','leftSwoop', 2620, 23),
  (@levelHeaderId, 'highBug', 'left','leftSwoop', 2630, 23),
  (@levelHeaderId, 'highBug', 'left','leftSwoop', 2640, 23),
  (@levelHeaderId, 'todayBug', 'left','centerBoxes', 3500, 24),
  (@levelHeaderId, 'todayBug', 'left','centerBoxes', 3510, 24),
  (@levelHeaderId, 'todayBug', 'left','centerBoxes', 3520, 24),
  (@levelHeaderId, 'todayBug', 'left','centerBoxes', 3530, 24),
  (@levelHeaderId, 'todayBug', 'left','centerBoxes', 3540, 24),
  (@levelHeaderId, 'tombstoneBug', 'tombstone','tombstone', 4300, 25),
  (@levelHeaderId, 'pitfall', 'pit2','floor', 5000, 19),
  (@levelHeaderId, 'pitfall', 'pit3','floor', 5000, 19),
  (@levelHeaderId, 'lowBug', 'right','rightX', 5200, 21),
  (@levelHeaderId, 'lowBug', 'right','rightX', 5210, 21),
  (@levelHeaderId, 'lowBug', 'right','rightX', 5220, 21),
  (@levelHeaderId, 'lowBug', 'right','rightX', 5230, 21),
  (@levelHeaderId, 'lowBug', 'right','rightX', 5240, 21),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 6000, 21),
  (@levelHeaderId, 'mediumBug', 'left','leftSimpleZigZag', 6010, 22),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 6020, 21),
  (@levelHeaderId, 'mediumBug', 'left','leftSimpleZigZag', 6030, 22),
  (@levelHeaderId, 'lowBug', 'left','leftSimpleZigZag', 6040, 21),
  (@levelHeaderId, 'lowBug', 'left','centerBoxes', 6800, 21),
  (@levelHeaderId, 'mediumBug', 'left','centerBoxes', 6810, 22),
  (@levelHeaderId, 'highBug', 'left','centerBoxes', 6820, 23),
  (@levelHeaderId, 'highBug', 'left','centerBoxes', 6830, 23),
  (@levelHeaderId, 'highBug', 'left','centerBoxes', 6840, 23),
  (@levelHeaderId, 'mediumBug', 'left','centerBoxes', 6850, 22),
  (@levelHeaderId, 'lowBug', 'left','centerBoxes', 6860, 21);
set @levelHeaderId = (select levelHeaderId from levelHeader where levelCode = 'level20');
insert into levelEntities (levelHeaderId, type, position, movement, timing, entityId) values
  (@levelHeaderId, 'player', 'playerStart','player', 0, 26),
  (@levelHeaderId, 'floor', 'floor','floor', 0, 20),
  (@levelHeaderId, 'tombstoneBug', 'tombstone','tombstone', 300, 25),
  (@levelHeaderId, 'highBug', 'right','rightX', 800, 23),
  (@levelHeaderId, 'todayBug', 'right','rightX', 810, 24),
  (@levelHeaderId, 'todayBug', 'right','rightX', 820, 24),
  (@levelHeaderId, 'highBug', 'right','rightX', 830, 23),
  (@levelHeaderId, 'pitfall', 'pit2','floor', 1000, 19),
  (@levelHeaderId, 'todayBug', 'left','leftSimpleZigZag', 1700, 24),
  (@levelHeaderId, 'highBug', 'left','leftSimpleZigZag', 1710, 23),
  (@levelHeaderId, 'highBug', 'left','leftSimpleZigZag', 1720, 23),
  (@levelHeaderId, 'todayBug', 'left','leftSimpleZigZag', 1730, 24),
  (@levelHeaderId, 'todayBug', 'right','rightSwoop', 2500, 24),
  (@levelHeaderId, 'todayBug', 'right','rightSwoop', 2510, 24),
  (@levelHeaderId, 'todayBug', 'right','rightSwoop', 2520, 24),
  (@levelHeaderId, 'highBug', 'right','rightSwoop', 2530, 23),
  (@levelHeaderId, 'highBug', 'right','rightSwoop', 2540, 23),
  (@levelHeaderId, 'highBug', 'right','rightSwoop', 2550, 23),
  (@levelHeaderId, 'highBug', 'right','centerBoxes', 3000, 23),
  (@levelHeaderId, 'highBug', 'right','centerBoxes', 3010, 23),
  (@levelHeaderId, 'highBug', 'right','centerBoxes', 3020, 23),
  (@levelHeaderId, 'todayBug', 'right','centerBoxes', 3030, 24),
  (@levelHeaderId, 'todayBug', 'right','centerBoxes', 3040, 24),
  (@levelHeaderId, 'todayBug', 'right','centerBoxes', 3050, 24),
  (@levelHeaderId, 'pitfall', 'pit1','floor', 3300, 19),
  (@levelHeaderId, 'pitfall', 'pit4','floor', 3300, 19),
  (@levelHeaderId, 'tombstoneBug', 'tombstone','tombstone', 4500, 25),
  (@levelHeaderId, 'pitfall', 'pit2','floor', 4500, 19),
  (@levelHeaderId, 'pitfall', 'pit3','floor', 4500, 19),
  (@levelHeaderId, 'todayBug', 'left','leftSwoop', 5000, 24),
  (@levelHeaderId, 'todayBug', 'left','leftSwoop', 5010, 24),
  (@levelHeaderId, 'todayBug', 'left','leftSwoop', 5020, 24),
  (@levelHeaderId, 'todayBug', 'left','leftSwoop', 5030, 24),
  (@levelHeaderId, 'highBug', 'right','rightSimpleZigZag', 5800, 23),
  (@levelHeaderId, 'highBug', 'right','rightSimpleZigZag', 5810, 23),
  (@levelHeaderId, 'highBug', 'right','rightSimpleZigZag', 5820, 23),
  (@levelHeaderId, 'highBug', 'right','rightSimpleZigZag', 5830, 23),
  (@levelHeaderId, 'pitfall', 'pit2','floor', 5900, 19),
  (@levelHeaderId, 'pitfall', 'pit3','floor', 5900, 19),
  (@levelHeaderId, 'pitfall', 'pit4','floor', 5900, 19),
  (@levelHeaderId, 'pitfall', 'pit1','floor', 6300, 19),
  (@levelHeaderId, 'pitfall', 'pit2','floor', 6300, 19),
  (@levelHeaderId, 'pitfall', 'pit3','floor', 6300, 19),
  (@levelHeaderId, 'highBug', 'right','rightSwoop', 6800, 23),
  (@levelHeaderId, 'highBug', 'right','rightSwoop', 6810, 23),
  (@levelHeaderId, 'highBug', 'right','rightSwoop', 6820, 23),
  (@levelHeaderId, 'todayBug', 'right','rightX', 6800, 24),
  (@levelHeaderId, 'todayBug', 'right','rightX', 6810, 24),
  (@levelHeaderId, 'todayBug', 'right','rightX', 6820, 24),
  (@levelHeaderId, 'todayBug', 'left','leftX', 6800, 24),
  (@levelHeaderId, 'todayBug', 'left','leftX', 6810, 24),
  (@levelHeaderId, 'todayBug', 'left','leftX', 6820, 24);
insert into files (FilePath, FileType, FileName, volume, TicksPerFrame) values ('media/ui/JaggedPeakLogo.png', 'ui', 'jaggedPeakLogo', NULL, NULL);
alter table levelHeader
add column levelNumber int not null;
update levelHeader
set levelNumber = right(levelCode,1)
where levelHeaderId in ('level0','level1','level2','level3','level4','level5','level6','level7','level8','level9');
update levelHeader
set levelNumber = right(levelCode,2)
where levelHeaderId in ('level10','level11','level12','level13','level14','level15','level16','level17','level18','level19','level20');
update levelentities set type = 'monster' where type in ('lowBug','mediumBug','highBug','todayBug','tombstoneBug');
update Files set volume = 1 where FileName = 'energyBar';
update files set FilePath = 'media/sounds/level2.mp3' where FileName = 'level2';
insert into files (FilePath, FileType, FileName, volume, TicksPerFrame)
  values ('media/sounds/level4.mp3','music','level4',0.30,NULL);
insert into files (FilePath, FileType, FileName, volume, TicksPerFrame)
  values ('media/sounds/level5.mp3','music','level5',0.30,NULL);
update levelheader set Music_FileID = 100 where levelCode = 'level4';
update levelheader set Music_FileID = 101 where levelCode = 'level5';
update levelheader set Music_FileID = 21 where levelCode = 'level6';
update levelheader set Music_FileID = 22 where levelCode = 'level7';
update levelheader set Music_FileID = 23 where levelCode = 'level8';
update levelheader set Music_FileID = 100 where levelCode = 'level9';
update levelheader set Music_FileID = 101 where levelCode = 'level10';
update levelheader set Music_FileID = 21 where levelCode = 'level11';
update levelheader set Music_FileID = 22 where levelCode = 'level12';
update levelheader set Music_FileID = 23 where levelCode = 'level13';
update levelheader set Music_FileID = 100 where levelCode = 'level14';
update levelheader set Music_FileID = 101 where levelCode = 'level15';
update levelheader set Music_FileID = 21 where levelCode = 'level16';
update levelheader set Music_FileID = 22 where levelCode = 'level17';
update levelheader set Music_FileID = 23 where levelCode = 'level18';
update levelheader set Music_FileID = 100 where levelCode = 'level19';
update levelheader set Music_FileID = 101 where levelCode = 'level20';
update levelheader set Music_FileID = 21 where levelCode = 'level26';
alter table levelheader
  add column MultiplierTier1 int not null,
  add column MultiplierTier2 int not null,
  add column MultiplierTier3 int not null,
  add column MultiplierTier4 int not null,
  add column MultiplierTier5 int not null;
update levelheader
set MultiplierTier1 = 3000,
    MultiplierTier2 = 4000,
    MultiplierTier3 = 5000,
    MultiplierTier4 = 6000,
    MultiplierTier5 = 7000
where levelCode = 'level0';
update levelheader
set MultiplierTier1 = 2750,
    MultiplierTier2 = 3250,
    MultiplierTier3 = 3750,
    MultiplierTier4 = 4500,
    MultiplierTier5 = 5000
where levelCode = 'level1';
update levelheader
set MultiplierTier1 = 2750,
    MultiplierTier2 = 3250,
    MultiplierTier3 = 4000,
    MultiplierTier4 = 4750,
    MultiplierTier5 = 5500
where levelCode = 'level2';
update levelheader
set MultiplierTier1 = 3750,
    MultiplierTier2 = 4250,
    MultiplierTier3 = 4750,
    MultiplierTier4 = 5500,
    MultiplierTier5 = 6250
where levelCode = 'level3';
update levelheader
set MultiplierTier1 = 3250,
    MultiplierTier2 = 3750,
    MultiplierTier3 = 4500,
    MultiplierTier4 = 5250,
    MultiplierTier5 = 6000
where levelCode = 'level4';
update levelheader
set MultiplierTier1 = 5250,
    MultiplierTier2 = 5750,
    MultiplierTier3 = 6250,
    MultiplierTier4 = 7000,
    MultiplierTier5 = 7750
where levelCode = 'level5';
update levelheader
set MultiplierTier1 = 3500,
    MultiplierTier2 = 4000,
    MultiplierTier3 = 4500,
    MultiplierTier4 = 5250,
    MultiplierTier5 = 6000
where levelCode = 'level6';
update levelheader
set MultiplierTier1 = 5750,
    MultiplierTier2 = 6250,
    MultiplierTier3 = 6750,
    MultiplierTier4 = 7500,
    MultiplierTier5 = 8250
where levelCode = 'level7';
update levelheader
set MultiplierTier1 = 5750,
    MultiplierTier2 = 6250,
    MultiplierTier3 = 6750,
    MultiplierTier4 = 7500,
    MultiplierTier5 = 8250
where levelCode = 'level8';
update levelheader
set MultiplierTier1 = 3750,
    MultiplierTier2 = 4250,
    MultiplierTier3 = 4750,
    MultiplierTier4 = 5500,
    MultiplierTier5 = 6250
where levelCode = 'level9';
update levelheader
set MultiplierTier1 = 5500,
    MultiplierTier2 = 6000,
    MultiplierTier3 = 6500,
    MultiplierTier4 = 7250,
    MultiplierTier5 = 8000
where levelCode = 'level10';
update levelheader
set MultiplierTier1 = 5750,
    MultiplierTier2 = 6250,
    MultiplierTier3 = 6750,
    MultiplierTier4 = 7500,
    MultiplierTier5 = 8250
where levelCode = 'level11';
update levelheader
set MultiplierTier1 = 5500,
    MultiplierTier2 = 6000,
    MultiplierTier3 = 6500,
    MultiplierTier4 = 7250,
    MultiplierTier5 = 8000
where levelCode = 'level12';
update levelheader
set MultiplierTier1 = 7250,
    MultiplierTier2 = 7750,
    MultiplierTier3 = 8250,
    MultiplierTier4 = 9000,
    MultiplierTier5 = 9750
where levelCode = 'level13';
update levelheader
set MultiplierTier1 = 7250,
    MultiplierTier2 = 7750,
    MultiplierTier3 = 8250,
    MultiplierTier4 = 9000,
    MultiplierTier5 = 9750
where levelCode = 'level14';
update levelheader
set MultiplierTier1 = 5750,
    MultiplierTier2 = 6250,
    MultiplierTier3 = 6750,
    MultiplierTier4 = 7500,
    MultiplierTier5 = 8250
where levelCode = 'level15';
update levelheader
set MultiplierTier1 = 6500,
    MultiplierTier2 = 7000,
    MultiplierTier3 = 7500,
    MultiplierTier4 = 8250,
    MultiplierTier5 = 9000
where levelCode = 'level16';
update levelheader
set MultiplierTier1 = 6750,
    MultiplierTier2 = 7250,
    MultiplierTier3 = 7750,
    MultiplierTier4 = 8500,
    MultiplierTier5 = 9250
where levelCode = 'level17';
update levelheader
set MultiplierTier1 = 8000,
    MultiplierTier2 = 8500,
    MultiplierTier3 = 9000,
    MultiplierTier4 = 9750,
    MultiplierTier5 = 10500
where levelCode = 'level18';
update levelheader
set MultiplierTier1 = 8500,
    MultiplierTier2 = 9000,
    MultiplierTier3 = 9500,
    MultiplierTier4 = 10250,
    MultiplierTier5 = 11000
where levelCode = 'level19';
update levelheader
set MultiplierTier1 = 10000,
    MultiplierTier2 = 11000,
    MultiplierTier3 = 12000,
    MultiplierTier4 = 13000,
    MultiplierTier5 = 14000
where levelCode = 'level20';
update levelheader
set MultiplierTier1 = 3000,
    MultiplierTier2 = 4000,
    MultiplierTier3 = 5000,
    MultiplierTier4 = 6000,
    MultiplierTier5 = 7000
where levelCode = 'level26';
update levelentities set type = 'monster' where type = 'tombstoneB';
update levelentities set type = 'monster' where type = 'logBug';