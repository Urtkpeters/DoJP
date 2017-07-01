create table LevelStats
(
  LevelStatId int auto_increment not null,
  LevelHeaderId int not null,
  CreateDate datetime not null,
  LevelTiming int not null,
  PlayerEarnings int not null,
  PlayerPTO int not null,
  PlayerIDE varchar(16) not null,
  primary key (LevelStatId),
  foreign key (LevelHeaderId)
    references LevelHeader(LevelHeaderId)
    on update no action
    on delete no action
)