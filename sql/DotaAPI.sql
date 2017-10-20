create table MatchHeader
(
  MatchId int Primary Key,
  MatchDate datetime,
  Duration time,
  LobbyType varchar(16),
  GameMode varchar(32),
  PlayerTeam varchar(8),
  PlayerVictory int
);
create table Heroes
(
  HeroId int Primary Key,
  HeroName varchar(64),
  HeroCode varchar(256),
  HeroImage varchar(512)
);
create table Items
(
  ItemId int Primary Key,
  ItemName varchar(64),
  ItemCode varchar(256),
  ItemImage varchar(512)
);
create table MatchLine
(
  MatchLineId int Primary Key auto_increment,
  MatchId int,
  PlayerId32 int,
  PlayerId64 int,
  PlayerName varchar(256),
  Team varchar(8),
  HeroId int,
  Kills int,
  Deaths int,
  Assists int,
  Level int,
  Networth int,
  LastHits int,
  Denies int,
  GPM int,
  XPM int,
  HeroDamage int,
  Healing int,
  BuildingDamage int,
  ItemId1 int,
  ItemId2 int,
  ItemId3 int,
  ItemId4 int,
  ItemId5 int,
  ItemId6 int,
  ItemId7 int,
  ItemId8 int,
  ItemId9 int,
  Foreign Key(MatchId) references MatchHeader(MatchId) on update no action on delete no action,
  Foreign Key(HeroId) references Heroes(HeroId) on update no action on delete no action,
  Foreign Key(ItemId1) references Items(ItemId) on update no action on delete no action,
  Foreign Key(ItemId2) references Items(ItemId) on update no action on delete no action,
  Foreign Key(ItemId3) references Items(ItemId) on update no action on delete no action,
  Foreign Key(ItemId4) references Items(ItemId) on update no action on delete no action,
  Foreign Key(ItemId5) references Items(ItemId) on update no action on delete no action,
  Foreign Key(ItemId6) references Items(ItemId) on update no action on delete no action,
  Foreign Key(ItemId7) references Items(ItemId) on update no action on delete no action,
  Foreign Key(ItemId8) references Items(ItemId) on update no action on delete no action,
  Foreign Key(ItemId9) references Items(ItemId) on update no action on delete no action
);
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (1,'Anti-Mage','npc_dota_hero_antimage','am.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (2,'Axe','npc_dota_hero_axe','axe.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (3,'Bane','npc_dota_hero_bane','bane.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (4,'Bloodseeker','npc_dota_hero_bloodseeker','blood.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (5,'Crystal Maiden','npc_dota_hero_crystal_maiden','cm.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (6,'Drow Ranger','npc_dota_hero_drow_ranger','drow.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (7,'Earth Shaker','npc_dota_hero_earthshaker','earthshaker.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (8,'Juggernaut','npc_dota_hero_juggernaut','jugg.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (9,'Mirana','npc_dota_hero_mirana','mirana.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (11,'Shadow Fiend','npc_dota_hero_nevermore','sf.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (10,'Morphling','npc_dota_hero_morphling','morph.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (12,'Phantom Lancer','npc_dota_hero_phantom_lancer','pl.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (13,'Puck','npc_dota_hero_puck','puck.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (14,'Pudge','npc_dota_hero_pudge','pudge.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (15,'Razor','npc_dota_hero_razor','razor.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (16,'Sand King','npc_dota_hero_sand_king','sk.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (17,'Storm Spirit','npc_dota_hero_storm_spirit','storm.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (18,'Sven','npc_dota_hero_sven','sven.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (19,'Tiny','npc_dota_hero_tiny','tiny.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (20,'Vengeful Spirit','npc_dota_hero_vengefulspirit','vs.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (21,'Windranger','npc_dota_hero_windrunner','wr.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (22,'Zeus','npc_dota_hero_zuus','zeus.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (23,'Kunkka','npc_dota_hero_kunkka','kunkka.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (25,'Lina','npc_dota_hero_lina','lina.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (31,'Lich','npc_dota_hero_lich','lich.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (26,'Lion','npc_dota_hero_lion','lion.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (27,'Shadow Shaman','npc_dota_hero_shadow_shaman','ss.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (28,'Slardar','npc_dota_hero_slardar','slardar.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (29,'Tidehunter','npc_dota_hero_tidehunter','tide.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (30,'Witch Doctor','npc_dota_hero_witch_doctor','wd.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (32,'Riki','npc_dota_hero_riki','riki.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (33,'Enigma','npc_dota_hero_enigma','enigma.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (34,'Tinker','npc_dota_hero_tinker','tinker.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (35,'Sniper','npc_dota_hero_sniper','sniper.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (36,'Necrophos','npc_dota_hero_necrolyte','necro.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (37,'Warlock','npc_dota_hero_warlock','lock.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (38,'Beastmaster','npc_dota_hero_beastmaster','beast.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (39,'Queen of Pain','npc_dota_hero_queenofpain','qop.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (40,'Venomancer','npc_dota_hero_venomancer','veno.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (41,'Faceless Void','npc_dota_hero_faceless_void','void.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (42,'Wraith King','npc_dota_hero_skeleton_king','wk.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (43,'Death Prophet','npc_dota_hero_death_prophet','dp.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (44,'Phantom Assassin','npc_dota_hero_phantom_assassin','pa.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (45,'Pugna','npc_dota_hero_pugna','pugna.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (46,'Templar Assassin','npc_dota_hero_templar_assassin','ta.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (47,'Viper','npc_dota_hero_viper','viper.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (48,'Luna','npc_dota_hero_luna','luna.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (49,'Dragon Knight','npc_dota_hero_dragon_knight','dk.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (50,'Dazzle','npc_dota_hero_dazzle','dazz.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (51,'Clockwork','npc_dota_hero_rattletrap','clock.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (52,'Leshrac','npc_dota_hero_leshrac','lesh.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (53,'Natures Prophet','npc_dota_hero_furion','np.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (54,'Lifestealer','npc_dota_hero_life_stealer','ls.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (55,'Dark Seer','npc_dota_hero_dark_seer','ds.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (56,'Clinkz','npc_dota_hero_clinkz','clinkz.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (57,'Omniknight','npc_dota_hero_omniknight','omni.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (58,'Enchantress','npc_dota_hero_enchantress','ench.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (59,'Huskar','npc_dota_hero_huskar','husk.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (60,'Night Stalker','npc_dota_hero_night_stalker','ns.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (61,'Broodmother','npc_dota_hero_broodmother','brood.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (62,'Bounty Hunter','npc_dota_hero_bounty_hunter','bh.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (63,'Weaver','npc_dota_hero_weaver','weaver.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (64,'Jakiro','npc_dota_hero_jakiro','jak.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (65,'Batrider','npc_dota_hero_batrider','bat.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (66,'Chen','npc_dota_hero_chen','chen.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (67,'Spectre','npc_dota_hero_spectre','spec.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (69,'Doom','npc_dota_hero_doom_bringer','doom.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (68,'Ancient Apparition','npc_dota_hero_ancient_apparition','aa.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (70,'Ursa','npc_dota_hero_ursa','ursa.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (71,'Spirit Breaker','npc_dota_hero_spirit_breaker','sb.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (72,'Gyrocopter','npc_dota_hero_gyrocopter','gyro.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (73,'Alchemist','npc_dota_hero_alchemist','alch.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (74,'Invoker','npc_dota_hero_invoker','invo.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (75,'Silencer','npc_dota_hero_silencer','silencer.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (76,'Outworld Devourer','npc_dota_hero_obsidian_destroyer','od.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (77,'Lycan','npc_dota_hero_lycan','lycan.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (78,'Brewmaster','npc_dota_hero_brewmaster','brew.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (79,'Shadow Demon','npc_dota_hero_shadow_demon','sd.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (80,'Lone Druid','npc_dota_hero_lone_druid','ld.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (81,'Chaos Knight','npc_dota_hero_chaos_knight','ck.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (82,'Meepo','npc_dota_hero_meepo','meepo.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (83,'Treant','npc_dota_hero_treant','tree.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (84,'Ogre Magi','npc_dota_hero_ogre_magi','ogre.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (85,'Undying','npc_dota_hero_undying','undy.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (86,'Rubick','npc_dota_hero_rubick','rubick.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (87,'Disruptor','npc_dota_hero_disruptor','disro.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (88,'Nyx Assassin','npc_dota_hero_nyx_assassin','nyx.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (89,'Naga Siren','npc_dota_hero_naga_siren','naga.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (90,'Keeper of the Light','npc_dota_hero_keeper_of_the_light','kotl.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (91,'Io','npc_dota_hero_wisp','io.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (92,'Visage','npc_dota_hero_visage','visage.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (93,'Slark','npc_dota_hero_slark','slark.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (94,'Medusa','npc_dota_hero_medusa','medusa.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (95,'Troll Warlord','npc_dota_hero_troll_warlord','troll.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (96,'Centuar','npc_dota_hero_centaur','cent.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (97,'Magnus','npc_dota_hero_magnataur','mag.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (98,'Timbersaw','npc_dota_hero_shredder','timber.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (99,'Bristleback','npc_dota_hero_bristleback','bristle.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (100,'Tusk','npc_dota_hero_tusk','tusk.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (101,'Skywrath Mage','npc_dota_hero_skywrath_mage','sky.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (102,'Abaddon','npc_dota_hero_abaddon','aba.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (103,'Elder Titan','npc_dota_hero_elder_titan','elder.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (104,'Legion Commander','npc_dota_hero_legion_commander','lc.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (106,'Ember Spirit','npc_dota_hero_ember_spirit','ember.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (107,'Earth Spirit','npc_dota_hero_earth_spirit','earthspirit.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (109,'Terrorblade','npc_dota_hero_terrorblade','terror.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (110,'Phoenix','npc_dota_hero_phoenix','phoenix.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (111,'Oracle','npc_dota_hero_oracle','oracle.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (105,'Techies','npc_dota_hero_techies','techies.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (112,'Winter Wyvern','npc_dota_hero_winter_wyvern','winter.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (113,'Arc Warden','npc_dota_hero_arc_warden','arc.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (108,'Underlord','npc_dota_hero_abyssal_underlord','under.jpg');
insert into Heroes(HeroId, HeroName, HeroCode, HeroImage) values (114,'Monkey King','npc_dota_hero_monkey_king','mk.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (1,'Blink Dagger','item_blink','blink.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (2,'Blades of Attack','item_blades_of_attack','blades_of_attack.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (3,'Broadsword','item_broadsword','broadsword.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (4,'Chainmail','item_chainmail','chainmail.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (5,'Claymore','item_claymore','claymore.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (6,'Helm of Iron Will','item_helm_of_iron_will','helm_of_iron_will.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (7,'Javelin','item_javelin','javelin.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (8,'Mithril Hammer','item_mithril_hammer','mithril_hammer.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (9,'Platemail','item_platemail','platemail.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (10,'Quaterstaff','item_quarterstaff','quarterstaff.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (11,'Quelling Blade','item_quelling_blade','quelling_blade.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (237,'Faerie Fire','item_faerie_fire','faerie_fire.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (265,'Infused Raindrop','item_infused_raindrop','infused_raindrop.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (244,'Wind Lace','item_wind_lace','wind_lace.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (12,'Ring of Protection','item_ring_of_protection','ring_of_protection.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (182,'Stout Shield','item_stout_shield','stout_shield.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (246,'Recipe: Moon Shard','item_recipe_moon_shard','recipe_moon_shard.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (247,'Moon Shard','item_moon_shard','moon_shard.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (13,'Gauntlets of Strength','item_gauntlets','gauntlets.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (14,'Slippers of Agility','item_slippers','slippers.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (15,'Mantle of Intelligence','item_mantle','mantle.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (16,'Iron Branch','item_branches','branches.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (17,'Belt of Strength','item_belt_of_strength','belt_of_strength.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (18,'Band of Elvenskin','item_boots_of_elves','boots_of_elves.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (19,'Robe of the Magi','item_robe','robe.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (20,'Circlet','item_circlet','circlet.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (21,'Ogre Club','item_ogre_axe','ogre_axe.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (22,'Blade of Alacrity','item_blade_of_alacrity','blade_of_alacrity.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (23,'Staff of Wizardry','item_staff_of_wizardry','staff_of_wizardry.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (24,'Ultimate Orb','item_ultimate_orb','ultimate_orb.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (25,'Gloves of Haste','item_gloves','gloves.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (26,'Morbid Mask','item_lifesteal','lifesteal.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (27,'Ring of Regen','item_ring_of_regen','ring_of_regen.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (28,'Sages Mask','item_sobi_mask','sobi_mask.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (29,'Boots of Speed','item_boots','boots.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (30,'Gem of True Sight','item_gem','gem.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (31,'Cloak','item_cloak','cloak.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (32,'Talisman of Evasion','item_talisman_of_evasion','talisman_of_evasion.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (33,'Cheese','item_cheese','cheese.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (34,'Magic Stick','item_magic_stick','magic_stick.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (35,'Recipe: Magic Wand','item_recipe_magic_wand','recipe_magic_wand.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (36,'Magic Wand','item_magic_wand','magic_wand.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (37,'Ghost Scepter','item_ghost','ghost.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (38,'Potion of Clarity','item_clarity','clarity.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (216,'Enchanted Mango','item_enchanted_mango','enchanted_mango.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (39,'Healing Salve','item_flask','flask.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (40,'Dust of Apperance','item_dust','dust.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (41,'Bottle','item_bottle','bottle.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (42,'Observer Ward','item_ward_observer','ward_observer.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (43,'Sentry Ward','item_ward_sentry','ward_sentry.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (217,'Recipe: Ward Dispenser','item_recipe_ward_dispenser','recipe_ward_dispenser.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (218,'Observer and Sentry Wards','item_ward_dispenser','ward_dispenser.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (44,'Tango','item_tango','tango.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (241,'Tango Single','item_tango_single','tango_single.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (45,'Courier','item_courier','courier.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (46,'Teleport Scroll','item_tpscroll','tpscroll.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (47,'Recipe: Boots of Travel','item_recipe_travel_boots','recipe_travel_boots.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (219,'Recipe: Boots of Travel 2','item_recipe_travel_boots_2','recipe_travel_boots_2.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (48,'Boots of Travel','item_travel_boots','travel_boots.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (220,'Boots of Travel 2','item_travel_boots_2','travel_boots_2.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (49,'Recipe: Phase Boots','item_recipe_phase_boots','recipe_phase_boots.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (50,'Phase Boots','item_phase_boots','phase_boots.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (51,'Demon Edge','item_demon_edge','demon_edge.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (52,'Eaglesong','item_eagle','eagle.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (53,'Reaver','item_reaver','reaver.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (54,'Sacred Relic','item_relic','relic.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (55,'Hyperstone','item_hyperstone','hyperstone.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (56,'Ring of Health','item_ring_of_health','ring_of_health.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (57,'Void Stone','item_void_stone','void_stone.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (58,'Mystic Staff','item_mystic_staff','mystic_staff.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (59,'Energy Booster','item_energy_booster','energy_booster.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (60,'Point Booster','item_point_booster','point_booster.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (61,'Vitality Booster','item_vitality_booster','vitality_booster.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (62,'Recipe: Power Treads','item_recipe_power_treads','recipe_power_treads.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (63,'Power Treads','item_power_treads','power_treads.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (64,'Recipe: Hand of Midas','item_recipe_hand_of_midas','recipe_hand_of_midas.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (65,'Hand of Midas','item_hand_of_midas','hand_of_midas.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (66,'Recipe: Oblivion Staff','item_recipe_oblivion_staff','recipe_oblivion_staff.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (67,'Oblivion Staff','item_oblivion_staff','oblivion_staff.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (68,'Recipe: Perseverance','item_recipe_pers','recipe_pers.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (69,'Perseverance','item_pers','pers.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (70,'Recipe: Poor Mans Shield','item_recipe_poor_mans_shield','recipe_poor_mans_shield.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (71,'Poor Mans Shield','item_poor_mans_shield','poor_mans_shield.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (72,'Recipe: Bracer','item_recipe_bracer','recipe_bracer.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (73,'Bracer','item_bracer','bracer.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (74,'Recipe: Wraith Band','item_recipe_wraith_band','recipe_wraith_band.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (75,'Wraith Band','item_wraith_band','wraith_band.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (76,'Recipe: Null Talisman','item_recipe_null_talisman','recipe_null_talisman.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (77,'Null Talisman','item_null_talisman','null_talisman.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (78,'Recipe: Mekansm','item_recipe_mekansm','recipe_mekansm.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (79,'Mekansm','item_mekansm','mekansm.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (80,'Recipe: Vladmirs Offering','item_recipe_vladmir','recipe_vladmir.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (81,'Vladmirs Offering','item_vladmir','vladmir.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (84,'Flying Courier','item_flying_courier','flying_courier.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (85,'Recipe: Buckler','item_recipe_buckler','recipe_buckler.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (86,'Buckler','item_buckler','buckler.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (87,'Recipe: Ring of Basilius','item_recipe_ring_of_basilius','recipe_ring_of_basilius.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (88,'Ring of Basilius','item_ring_of_basilius','ring_of_basilius.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (89,'Recipe: Pipe of Insight','item_recipe_pipe','recipe_pipe.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (90,'Pipe of Insight','item_pipe','pipe.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (91,'Recipe: Urn of Shadows','item_recipe_urn_of_shadows','recipe_urn_of_shadows.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (92,'Urn of Shadows','item_urn_of_shadows','urn_of_shadows.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (93,'Recipe: Headdress','item_recipe_headdress','recipe_headdress.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (94,'Headdress','item_headdress','headdress.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (95,'Recipe: Scythe of Vyse','item_recipe_sheepstick','recipe_sheepstick.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (96,'Scythe of Vyse','item_sheepstick','sheepstick.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (97,'Recipe: Orchid Malevolence','item_recipe_orchid','recipe_orchid.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (98,'Orchid Malevolence','item_orchid','orchid.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (245,'Recipe: Bloodthorn','item_recipe_bloodthorn','recipe_bloodthorn.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (250,'Bloodthorn','item_bloodthorn','bloodthorn.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (251,'Recipe: Echo Sabre','item_recipe_echo_sabre','recipe_echo_sabre.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (252,'Echo Sabre','item_echo_sabre','echo_sabre.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (99,'Recipe: Euls Scepter of Divinity','item_recipe_cyclone','recipe_cyclone.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (100,'Euls Scepter of Divinity','item_cyclone','cyclone.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (233,'Recipe: Aether Lens','item_recipe_aether_lens','recipe_aether_lens.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (232,'Aether Lens','item_aether_lens','aether_lens.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (101,'Recipe: Force Staff','item_recipe_force_staff','recipe_force_staff.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (102,'Force Staff','item_force_staff','force_staff.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (262,'Recipe: Hurricane Pike','item_recipe_hurricane_pike','recipe_hurricane_pike.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (263,'Hurricane Pike','item_hurricane_pike','hurricane_pike.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (103,'Recipe: Dagon','item_recipe_dagon','recipe_dagon.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (197,'Recipe: Dagon 2','item_recipe_dagon_2','recipe_dagon_2.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (198,'Recipe: Dagon 3','item_recipe_dagon_3','recipe_dagon_3.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (199,'Recipe: Dagon 4','item_recipe_dagon_4','recipe_dagon_4.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (200,'Recipe: Dagon 5','item_recipe_dagon_5','recipe_dagon_5.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (104,'Dagon','item_dagon','dagon.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (201,'Dagon 2','item_dagon_2','dagon_2.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (202,'Dagon 3','item_dagon_3','dagon_3.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (203,'Dagon 4','item_dagon_4','dagon_4.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (204,'Dagon 5','item_dagon_5','dagon_5.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (105,'Recipe: Necronomicon','item_recipe_necronomicon','recipe_necronomicon.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (191,'Recipe: Necronomicon 2','item_recipe_necronomicon_2','recipe_necronomicon_2.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (192,'Recipe: Necronomicon 3','item_recipe_necronomicon_3','recipe_necronomicon_3.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (106,'Necronomicon','item_necronomicon','necronomicon.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (193,'Necronomicon 2','item_necronomicon_2','necronomicon_2.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (194,'Necronomicon 3','item_necronomicon_3','necronomicon_3.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (107,'Recipe: Aghanims Scepter','item_recipe_ultimate_scepter','recipe_ultimate_scepter.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (108,'Aghanims Scepter','item_ultimate_scepter','ultimate_scepter.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (109,'Recipe: Refresher Orb','item_recipe_refresher','recipe_refresher.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (110,'Refresher Orb','item_refresher','refresher.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (111,'Recipe: Assault Cuirass','item_recipe_assault','recipe_assault.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (112,'Assault Cuirass','item_assault','assault.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (113,'Recipe: Heart of Tarrasque','item_recipe_heart','recipe_heart.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (114,'Heart of Tarrasque','item_heart','heart.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (115,'Recipe: Black King Bar','item_recipe_black_king_bar','recipe_black_king_bar.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (116,'Black King Bar','item_black_king_bar','black_king_bar.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (117,'Aegis of the Immortal','item_aegis','aegis.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (118,'Recipe: Shivas Guard','item_recipe_shivas_guard','recipe_shivas_guard.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (119,'Shivas Guard','item_shivas_guard','shivas_guard.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (120,'Recipe: Bloodstone','item_recipe_bloodstone','recipe_bloodstone.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (121,'Bloodstone','item_bloodstone','bloodstone.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (122,'Recipe: Linkins Sphere','item_recipe_sphere','recipe_sphere.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (123,'Linkins Sphere','item_sphere','sphere.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (221,'Recipe: Lotus Orb','item_recipe_lotus_orb','recipe_lotus_orb.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (226,'Lotus Orb','item_lotus_orb','lotus_orb.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (124,'Recipe: Vanguard','item_recipe_vanguard','recipe_vanguard.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (125,'Vanguard','item_vanguard','vanguard.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (243,'Recipe: Crimson Guard','item_recipe_crimson_guard','recipe_crimson_guard.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (242,'Crimson Guard','item_crimson_guard','crimson_guard.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (126,'Recipe: Blade Mail','item_recipe_blade_mail','recipe_blade_mail.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (127,'Blade Mail','item_blade_mail','blade_mail.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (128,'Recipe: Soul Booster','item_recipe_soul_booster','recipe_soul_booster.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (129,'Soul Booster','item_soul_booster','soul_booster.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (130,'Recipe: Hood of Defiance','item_recipe_hood_of_defiance','recipe_hood_of_defiance.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (131,'Hood of Defiance','item_hood_of_defiance','hood_of_defiance.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (132,'Recipe: Divine Rapier','item_recipe_rapier','recipe_rapier.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (133,'Divine Rapier','item_rapier','rapier.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (134,'Recipe: Monkey King Bar','item_recipe_monkey_king_bar','recipe_monkey_king_bar.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (135,'Monkey King Bar','item_monkey_king_bar','monkey_king_bar.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (136,'Recipe: Radiance','item_recipe_radiance','recipe_radiance.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (137,'Radiance','item_radiance','radiance.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (138,'Recipe: Butterfly','item_recipe_butterfly','recipe_butterfly.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (139,'Butterfly','item_butterfly','butterfly.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (140,'Recipe: Daedalus','item_recipe_greater_crit','recipe_greater_crit.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (141,'Daedalus','item_greater_crit','greater_crit.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (142,'Recipe: Basher','item_recipe_basher','recipe_basher.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (143,'Basher','item_basher','basher.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (144,'Recipe: Battlefury','item_recipe_bfury','recipe_bfury.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (145,'Battlefury','item_bfury','bfury.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (146,'Recipe: Manta Style','item_recipe_manta','recipe_manta.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (147,'Manta Style','item_manta','manta.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (148,'Recipe: Crystalys','item_recipe_lesser_crit','recipe_lesser_crit.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (149,'Crystalys','item_lesser_crit','lesser_crit.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (234,'Recipe: Dragon Lance','item_recipe_dragon_lance','recipe_dragon_lance.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (236,'Dragon Lance','item_dragon_lance','dragon_lance.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (150,'Recipe: Armlet of Mordiggian','item_recipe_armlet','recipe_armlet.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (151,'Armlet of Mordiggian','item_armlet','armlet.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (183,'Recipe: Shadowblade','item_recipe_invis_sword','recipe_invis_sword.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (152,'Shadowblade','item_invis_sword','invis_sword.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (248,'Recipe: Silver Edge','item_recipe_silver_edge','recipe_silver_edge.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (249,'Silver Edge','item_silver_edge','silver_edge.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (153,'Recipe: Sange and Yasha','item_recipe_sange_and_yasha','recipe_sange_and_yasha.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (154,'Sange and Yasha','item_sange_and_yasha','sange_and_yasha.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (155,'Recipe: Satanic','item_recipe_satanic','recipe_satanic.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (156,'Satanic','item_satanic','satanic.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (157,'Recipe: Mjollnir','item_recipe_mjollnir','recipe_mjollnir.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (158,'Mjollnir','item_mjollnir','mjollnir.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (159,'Recipe: Eye of Skadi','item_recipe_skadi','recipe_skadi.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (160,'Eye of Skadi','item_skadi','skadi.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (161,'Recipe: Sange','item_recipe_sange','recipe_sange.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (162,'Sange','item_sange','sange.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (163,'Recipe: Helm of the Dominator','item_recipe_helm_of_the_dominator','recipe_helm_of_the_dominator.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (164,'Helm of the Dominator','item_helm_of_the_dominator','helm_of_the_dominator.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (165,'Recipe: Maelstrom','item_recipe_maelstrom','recipe_maelstrom.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (166,'Maelstrom','item_maelstrom','maelstrom.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (167,'Recipe: Desolator','item_recipe_desolator','recipe_desolator.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (168,'Desolator','item_desolator','desolator.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (169,'Recipe: Yasha','item_recipe_yasha','recipe_yasha.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (170,'Yasha','item_yasha','yasha.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (171,'Recipe: Mask of Madness','item_recipe_mask_of_madness','recipe_mask_of_madness.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (172,'Mask of Madness','item_mask_of_madness','mask_of_madness.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (173,'Recipe: Diffusal Blade','item_recipe_diffusal_blade','recipe_diffusal_blade.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (195,'Recipe: Diffusal Blade 2','item_recipe_diffusal_blade_2','recipe_diffusal_blade_2.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (174,'Diffusal Blade','item_diffusal_blade','diffusal_blade.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (196,'Diffusal Blade 2','item_diffusal_blade_2','diffusal_blade_2.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (175,'Recipe: Ethereal Blade','item_recipe_ethereal_blade','recipe_ethereal_blade.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (176,'Ethereal Blade','item_ethereal_blade','ethereal_blade.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (177,'Recipe: Soul Ring','item_recipe_soul_ring','recipe_soul_ring.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (178,'Soul Ring','item_soul_ring','soul_ring.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (179,'Recipe: Arcane Boots','item_recipe_arcane_boots','recipe_arcane_boots.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (180,'Arcane Boots','item_arcane_boots','arcane_boots.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (228,'Recipe: Octarine Core','item_recipe_octarine_core','recipe_octarine_core.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (235,'Octarine Core','item_octarine_core','octarine_core.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (181,'Orb of Venom','item_orb_of_venom','orb_of_venom.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (240,'Blight Stone','item_blight_stone','blight_stone.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (184,'Recipe: Drums of Endurance','item_recipe_ancient_janggo','recipe_ancient_janggo.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (185,'Drums of Endurance','item_ancient_janggo','ancient_janggo.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (186,'Recipe: Medallion of Courage','item_recipe_medallion_of_courage','recipe_medallion_of_courage.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (187,'Medallion of Courage','item_medallion_of_courage','medallion_of_courage.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (227,'Recipe: Solar Crest','item_recipe_solar_crest','recipe_solar_crest.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (229,'Solar Crest','item_solar_crest','solar_crest.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (188,'Smoke of Deceit','item_smoke_of_deceit','smoke_of_deceit.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (257,'Tome of Knowledge','item_tome_of_knowledge','tome_of_knowledge.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (189,'Recipe: Veil of Discord','item_recipe_veil_of_discord','recipe_veil_of_discord.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (190,'Veil of Discord','item_veil_of_discord','veil_of_discord.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (230,'Recipe: Guardian Greaves','item_recipe_guardian_greaves','recipe_guardian_greaves.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (231,'Guardian Greaves','item_guardian_greaves','guardian_greaves.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (205,'Recipe: Rod of Atos','item_recipe_rod_of_atos','recipe_rod_of_atos.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (206,'Rod of Atos','item_rod_of_atos','rod_of_atos.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (238,'Recipe: Iron Talon','item_recipe_iron_talon','recipe_iron_talon.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (239,'Iron Talon','item_iron_talon','iron_talon.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (207,'Recipe: Abyssal Blade','item_recipe_abyssal_blade','recipe_abyssal_blade.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (208,'Abyssal Blade','item_abyssal_blade','abyssal_blade.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (209,'Recipe: Heavens Halberd','item_recipe_heavens_halberd','recipe_heavens_halberd.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (210,'Heavens Halberd','item_heavens_halberd','heavens_halberd.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (211,'Recipe: Ring of Aquila','item_recipe_ring_of_aquila','recipe_ring_of_aquila.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (212,'Ring of Aquila','item_ring_of_aquila','ring_of_aquila.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (213,'Recipe: Tranquil Boots','item_recipe_tranquil_boots','recipe_tranquil_boots.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (214,'Tranquil Boots','item_tranquil_boots','tranquil_boots.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (215,'Shadow Amulet','item_shadow_amulet','shadow_amulet.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (253,'Recipe: Glimmer Cape','item_recipe_glimmer_cape','recipe_glimmer_cape.jpg');
insert into Items(ItemId, ItemName, ItemCode, ItemImage) values (254,'Glimmer Cape','item_glimmer_cape','glimmer_cape.jpg');