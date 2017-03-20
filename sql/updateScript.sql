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