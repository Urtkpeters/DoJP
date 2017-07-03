alter table Users
add column ARCUser bit not null;
update Users
set ARCUser = 1
where Username = 'Odonen';
create table ArcBuildHeader
(
  ArcBuildHeaderId int auto_increment not null,
  CreateUserId int not null,
  CreateDate datetime not null,
  ModifiedUserId int,
  ModifiedDate datetime,
  BuildTitle varchar(256) not null,
  BuildType int not null,
  Description text,
  primary key (ArcBuildHeaderId),
  foreign key (CreateUserId)
    references Users(UserId)
    on update no action
    on delete no action,
  foreign key (ModifiedUserId)
    references Users(UserId)
    on update no action
    on delete no action
);
create table ArcBuildLine
(
  ArcBuildLineId int auto_increment not null,
  ArcBuildHeaderId int not null,
  Team int not null,
  Hero int not null,
  LanePosition int not null,
  SortOrder int not null,
  primary key (ArcBuildLineId),
  foreign key (ArcBuildHeaderId)
    references ArcBuildHeader(ArcBuildHeaderId)
    on update no action
    on delete no action
);