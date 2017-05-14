alter table SavedGames
  add column purchasedPTO int not null;
update LevelHeader set MultiplierTier1 = 2900 where levelCode = 'level2';