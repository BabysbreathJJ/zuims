drop table if exists picture_detail;
drop table if exists restaurant_detail;
drop Procedure if exists insert_rest;

create table restaurant_detail
(
    RestaurantID            int(6) unsigned primary key auto_increment,
    City                    varchar(128),
    HotelName               varchar(128),
    HotelTele               varchar(128),
    HotelAddress            varchar(512),
    RestaurantName          varchar(128),
    RestaurantTele          varchar(128),
    RestaurantAddress       varchar(512),
    RestaurantOpenTime      varchar(128),
    Introduction            text,
    Price                   varchar(128),
    Park                    varchar(128),
    Smoke                   varchar(128),
    Location                point not null
);

create table picture_detail
(
    ID                      int(10) unsigned primary key auto_increment,
    RestaurantID            int(6) unsigned,
    FileName                varchar(128),
    PictureIntro            varchar(512),
    
    foreign key (RestaurantID) references restaurant_detail(RestaurantID) 
);

ALTER TABLE restaurant_detail ADD SPATIAL INDEX(Location);


DELIMITER //
create Procedure insert_rest(   _City                   varchar(128),
                                _HotelName              varchar(128),
                                _HotelTele              varchar(128),
                                _HotelAddress           varchar(512),
                                _RestaurantName         varchar(128),
                                _RestaurantTele         varchar(128),
                                _RestaurantAddress      varchar(512),
                                _RestaurantOpenTime     varchar(128),
                                _Introduction           text,
                                _Price                  varchar(128),
                                _Park                   varchar(128),
                                _Smoke                  varchar(128),
                                _location               varchar(128),
                                out _restId int)
Begin
    start transaction;
    INSERT INTO restaurant_detail   
    (City, HotelName, HotelTele, HotelAddress, 
    RestaurantName, RestaurantTele, RestaurantAddress, RestaurantOpenTime, 
    Introduction, Price, Park, Smoke, Location)
    VALUES
    (_City, _HotelName, _HotelTele, _HotelAddress, 
    _RestaurantName, _RestaurantTele, _RestaurantAddress, _RestaurantOpenTime, 
    _Introduction, _Price, _Park, _Smoke, ST_GeomFromText(_location));  
    select LAST_INSERT_ID() into _restId;
    commit;
End //
