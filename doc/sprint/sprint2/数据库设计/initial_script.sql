/** 先删除所有数据再插入，删除情况各有不同，
且不同sql工具支持不同，因此不写在脚本中 */

INSERT INTO `mydb`.`User_type`
(`utid`,
`ut_name`)
VALUES
(1,
"默认来源");

INSERT INTO `mydb`.`Vip_level`
(`vlid`,
`vl_name`,
`buffet_discount`,
`lobby_discount`,
`lunch_discount`,
`bar_discount`,
`weekend_discount`)
VALUES
(1,
"普通用户",
100,
100,
100,
100,
100);

INSERT INTO `mydb`.`Vip_level`
(`vlid`,
`vl_name`,
`buffet_discount`,
`lobby_discount`,
`lunch_discount`,
`bar_discount`,
`weekend_discount`)
VALUES
(2,
"付费用户",
100,
100,
100,
100,
100);