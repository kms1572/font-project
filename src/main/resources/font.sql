-- Drop table

-- DROP TABLE PUBLIC.FONT;
create table FONT(
    ID             BIGINT auto_increment primary key,
    FONT_COPYRIGHT CHARACTER,
    FONT_NAME      CHARACTER,
    FONT_URL       CHARACTER
);