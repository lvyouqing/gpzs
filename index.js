// ==================== 股票监控系统 - 完整版 ====================

// ==================== 行业分类映射 ====================
// 行业分类用于市场页面的左侧筛选
const STOCK_CATEGORIES = {
    bank: ['601398', '601288', '601988', '601328', '600036', '601166', '600016', '601998', '600000', '601818', '601169', '601009', '600919', '601229', '600926', '002142', '601077', '601128', '002807', '002839'],
    power: ['000543', '600886', '600674', '600236', '003816', '601985', '000777', '600905', '600027', '600011', '600795', '601991'],
    insurance: ['601318', '601628', '601336', '601601', '600030', '000776'],
    broker: ['600030', '000776', '601688', '300059', '600837', '600999', '601211', '000728'],
    energy: ['601857', '600028', '601088', '601699', '600188', '601015', '600408'],
    medicine: ['002100', '600276', '000538', '603259', '300760', '600436', '000963', '300015', '600196', '300003'],
    tech: ['000725', '002230', '002594', '300750', '603501', '002371', '000938', '600570', '600584', '000066'],
    consumer: ['600519', '000858', '002714', '600887', '000333', '000651', '002027', '603288', '600690', '002032'],
    construction: ['601668', '601390', '601186', '601800', '601618', '601117', '601669', '002081', '002392', '600585']
};

// A股股票列表（完整版 - 与之前系统一致）
// 股息数据：最近12个月总分红（元/股）
const A_STOCKS = [
    // 金融银行（银行股通常股息率3-6%）
    { code: "601398", name: "工商银行", dividend: 0.293 },
    { code: "601288", name: "农业银行", dividend: 0.222 },
    { code: "601988", name: "中国银行", dividend: 0.208 },
    { code: "601328", name: "交通银行", dividend: 0.375 },
    { code: "600036", name: "招商银行", dividend: 1.972 },
    { code: "601166", name: "兴业银行", dividend: 1.04 },
    { code: "600016", name: "民生银行", dividend: 0.13 },
    { code: "601998", name: "中信银行", dividend: 0.325 },
    { code: "600000", name: "浦发银行", dividend: 0.32 },
    { code: "601818", name: "光大银行", dividend: 0.173 },
    { code: "601169", name: "北京银行", dividend: 0.31 },
    { code: "601009", name: "南京银行", dividend: 0.51 },
    { code: "600919", name: "江苏银行", dividend: 0.46 },
    { code: "601229", name: "上海银行", dividend: 0.4 },
    { code: "600926", name: "杭州银行", dividend: 0.52 },
    { code: "002142", name: "宁波银行", dividend: 0.6 },
    { code: "601077", name: "渝农商行", dividend: 0.27 },
    { code: "601128", name: "常熟银行", dividend: 0.25 },
    { code: "002807", name: "江阴银行", dividend: 0.18 },
    { code: "002839", name: "张家港行", dividend: 0.2 },
    // 金融保险证券
    { code: "601318", name: "中国平安" },
    { code: "601628", name: "中国人寿" },
    { code: "601601", name: "中国太保" },
    { code: "601336", name: "新华保险" },
    { code: "600030", name: "中信证券" },
    { code: "600837", name: "海通证券" },
    { code: "601688", name: "华泰证券" },
    { code: "600999", name: "招商证券" },
    { code: "000776", name: "广发证券" },
    { code: "601211", name: "国泰君安" },
    { code: "600958", name: "东方证券" },
    { code: "601377", name: "兴业证券" },
    { code: "000166", name: "申万宏源" },
    { code: "601881", name: "中国银河" },
    { code: "601901", name: "方正证券" },
    { code: "601555", name: "东吴证券" },
    { code: "600109", name: "国金证券" },
    { code: "002736", name: "国信证券" },
    { code: "600061", name: "国投资本" },
    { code: "601066", name: "中信建投" },
    // 白酒饮料
    { code: "600519", name: "贵州茅台" },
    { code: "000858", name: "五粮液" },
    { code: "000568", name: "泸州老窖" },
    { code: "002304", name: "洋河股份" },
    { code: "600779", name: "水井坊" },
    { code: "000596", name: "古井贡酒" },
    { code: "000860", name: "顺鑫农业" },
    { code: "600809", name: "山西汾酒" },
    { code: "603589", name: "口子窖" },
    { code: "603369", name: "今世缘" },
    { code: "600702", name: "舍得酒业" },
    { code: "000799", name: "酒鬼酒" },
    { code: "600197", name: "伊力特" },
    { code: "600559", name: "老白干酒" },
    { code: "603198", name: "迎驾贡酒" },
    { code: "600600", name: "青岛啤酒" },
    { code: "000729", name: "燕京啤酒" },
    { code: "600132", name: "重庆啤酒" },
    { code: "603288", name: "海天味业" },
    { code: "603027", name: "千禾味业" },
    // 家电
    { code: "000333", name: "美的集团" },
    { code: "000651", name: "格力电器" },
    { code: "600690", name: "海尔智家" },
    { code: "002032", name: "苏泊尔" },
    { code: "002242", name: "九阳股份" },
    { code: "603868", name: "飞科电器" },
    { code: "002508", name: "老板电器" },
    { code: "002035", name: "华帝股份" },
    { code: "603579", name: "荣泰健康" },
    { code: "603355", name: "莱克电气" },
    // 汽车
    { code: "002594", name: "比亚迪" },
    { code: "601633", name: "长城汽车" },
    { code: "601127", name: "赛力斯" },
    { code: "000625", name: "长安汽车" },
    { code: "600104", name: "上汽集团" },
    { code: "600066", name: "宇通客车" },
    { code: "000338", name: "潍柴动力" },
    { code: "601238", name: "广汽集团" },
    { code: "600741", name: "华域汽车" },
    { code: "603596", name: "伯特利" },
    { code: "002920", name: "德赛西威" },
    { code: "601689", name: "拓普集团" },
    { code: "002048", name: "宁波华翔" },
    { code: "603197", name: "保隆科技" },
    { code: "600660", name: "福耀玻璃" },
    // 新能源产业链
    { code: "300750", name: "宁德时代" },
    { code: "300014", name: "亿纬锂能" },
    { code: "002074", name: "国轩高科" },
    { code: "300207", name: "欣旺达" },
    { code: "688567", name: "孚能科技" },
    { code: "002460", name: "赣锋锂业" },
    { code: "002466", name: "天齐锂业" },
    { code: "603799", name: "华友钴业" },
    { code: "002812", name: "恩捷股份" },
    { code: "002709", name: "天赐材料" },
    { code: "300073", name: "当升科技" },
    { code: "601012", name: "隆基绿能" },
    { code: "600438", name: "通威股份" },
    { code: "300274", name: "阳光电源" },
    { code: "002459", name: "晶澳科技" },
    { code: "688599", name: "天合光能" },
    { code: "600732", name: "爱旭股份" },
    { code: "601615", name: "明阳智能" },
    { code: "002202", name: "金风科技" },
    { code: "600875", name: "东方电气" },
    // 医药
    { code: "002100", name: "天康生物", dividend: 0.25 },
    { code: "600276", name: "恒瑞医药" },
    { code: "000538", name: "云南白药" },
    { code: "603259", name: "药明康德" },
    { code: "300760", name: "迈瑞医疗" },
    { code: "600436", name: "片仔癀" },
    { code: "000963", name: "华东医药" },
    { code: "300015", name: "爱尔眼科" },
    { code: "300122", name: "智飞生物" },
    { code: "600196", name: "复星医药" },
    { code: "000661", name: "长春高新" },
    { code: "603392", name: "万泰生物" },
    { code: "300896", name: "爱美客" },
    { code: "300347", name: "泰格医药" },
    { code: "600085", name: "同仁堂" },
    { code: "300003", name: "乐普医疗" },
    { code: "002007", name: "华兰生物" },
    { code: "603939", name: "益丰药房" },
    { code: "603233", name: "大参林" },
    { code: "603883", name: "老百姓" },
    { code: "603590", name: "康辰药业" },
    // 食品饮料
    { code: "600887", name: "伊利股份" },
    { code: "000895", name: "双汇发展" },
    { code: "603517", name: "绝味食品" },
    { code: "002557", name: "洽洽食品" },
    { code: "603866", name: "桃李面包" },
    { code: "600882", name: "妙可蓝多" },
    { code: "002507", name: "涪陵榨菜" },
    { code: "603345", name: "安井食品" },
    { code: "300999", name: "金龙鱼" },
    { code: "002481", name: "双塔食品" },
    // 消费电子
    { code: "000725", name: "京东方A" },
    { code: "002415", name: "海康威视" },
    { code: "000100", name: "TCL科技" },
    { code: "002475", name: "立讯精密" },
    { code: "300433", name: "蓝思科技" },
    { code: "002241", name: "歌尔股份" },
    { code: "601138", name: "工业富联" },
    { code: "002456", name: "欧菲光" },
    { code: "300136", name: "信维通信" },
    { code: "002384", name: "东山精密" },
    { code: "002236", name: "大华股份" },
    { code: "002049", name: "紫光国微" },
    { code: "603501", name: "韦尔股份" },
    { code: "603986", name: "兆易创新" },
    { code: "688981", name: "中芯国际" },
    { code: "688012", name: "中微公司" },
    { code: "688008", name: "澜起科技" },
    // 互联网科技
    { code: "603444", name: "吉比特" },
    { code: "002555", name: "三七互娱" },
    { code: "002624", name: "完美世界" },
    { code: "300418", name: "昆仑万维" },
    { code: "002602", name: "世纪华通" },
    { code: "002558", name: "巨人网络" },
    { code: "300413", name: "芒果超媒" },
    { code: "002027", name: "分众传媒" },
    { code: "300792", name: "壹网壹创" },
    { code: "300770", name: "新媒股份" },
    // 能源
    { code: "601857", name: "中国石油" },
    { code: "600028", name: "中国石化" },
    { code: "601088", name: "中国神华" },
    { code: "601225", name: "陕西煤业" },
    { code: "600188", name: "兖矿能源" },
    { code: "601699", name: "潞安环能" },
    { code: "600348", name: "华阳股份" },
    { code: "600157", name: "永泰能源" },
    { code: "601015", name: "陕西黑猫" },
    { code: "600508", name: "上海能源" },
    // 电力产业链
    { code: "600011", name: "华能国际" },
    { code: "600795", name: "国电电力" },
    { code: "601991", name: "大唐发电" },
    { code: "600027", name: "华电国际" },
    { code: "600023", name: "浙能电力" },
    { code: "600900", name: "长江电力" },
    { code: "600025", name: "华能水电" },
    { code: "600886", name: "国投电力" },
    { code: "600674", name: "川投能源" },
    { code: "600236", name: "桂冠电力" },
    { code: "003816", name: "中国广核", dividend: 0.09 },
    { code: "601985", name: "中国核电" },
    { code: "000777", name: "中核科技" },
    { code: "600905", name: "三峡能源" },
    { code: "001289", name: "龙源电力" },
    { code: "601016", name: "节能风电" },
    { code: "000591", name: "太阳能" },
    { code: "601778", name: "晶科科技" },
    { code: "600406", name: "国电南瑞" },
    { code: "600089", name: "特变电工" },
    { code: "000400", name: "许继电气" },
    { code: "600312", name: "平高电气" },
    { code: "002028", name: "思源电气" },
    { code: "601179", name: "中国西电" },
    { code: "600021", name: "上海电力" },
    { code: "000875", name: "吉电股份" },
    { code: "000883", name: "湖北能源" },
    { code: "000539", name: "粤电力A" },
    { code: "000543", name: "皖能电力", dividend: 0.22 },
    // 通信
    { code: "600050", name: "中国联通" },
    { code: "600941", name: "中国移动" },
    { code: "601728", name: "中国电信" },
    { code: "600498", name: "烽火通信" },
    { code: "600487", name: "亨通光电" },
    { code: "002281", name: "光迅科技" },
    { code: "300308", name: "中际旭创" },
    { code: "002396", name: "星网锐捷" },
    { code: "300502", name: "新易盛" },
    // 建筑建材
    { code: "601668", name: "中国建筑" },
    { code: "601390", name: "中国中铁" },
    { code: "601186", name: "中国铁建" },
    { code: "601800", name: "中国交建" },
    { code: "601618", name: "中国中冶" },
    { code: "601117", name: "中国化学" },
    { code: "601669", name: "中国电建" },
    { code: "002081", name: "金螳螂", dividend: 0.15 },
    { code: "002392", name: "北京利尔" },
    { code: "600585", name: "海螺水泥" },
    { code: "600801", name: "华新水泥" },
    { code: "000877", name: "天山股份" },
    { code: "002233", name: "塔牌集团" },
    { code: "600176", name: "中国巨石" },
    { code: "002080", name: "中材科技" },
    { code: "000786", name: "北新建材" },
    { code: "002372", name: "伟星新材" },
    { code: "603737", name: "三棵树" },
    { code: "002043", name: "兔宝宝" },
    // 交通运输
    { code: "600009", name: "上海机场" },
    { code: "600004", name: "白云机场" },
    { code: "000089", name: "深圳机场" },
    { code: "600029", name: "南方航空" },
    { code: "601111", name: "中国国航" },
    { code: "600115", name: "东方航空" },
    { code: "601021", name: "春秋航空" },
    { code: "603885", name: "吉祥航空" },
    { code: "600125", name: "铁龙物流" },
    { code: "601006", name: "大秦铁路" },
    { code: "601333", name: "广深铁路" },
    { code: "600026", name: "中远海能" },
    { code: "601919", name: "中远海控" },
    { code: "601872", name: "招商轮船" },
    // 化工
    { code: "600309", name: "万华化学" },
    { code: "002493", name: "荣盛石化" },
    { code: "000703", name: "恒逸石化" },
    { code: "002648", name: "卫星化学" },
    { code: "600346", name: "恒力石化" },
    { code: "601233", name: "桐昆股份" },
    { code: "603225", name: "新凤鸣" },
    { code: "002064", name: "华峰化学" },
    { code: "600426", name: "华鲁恒升" },
    { code: "600486", name: "扬农化工" },
    // 有色金属
    { code: "601899", name: "紫金矿业" },
    { code: "600547", name: "山东黄金" },
    { code: "600489", name: "中金黄金" },
    { code: "601600", name: "中国铝业" },
    { code: "000807", name: "云铝股份" },
    { code: "600362", name: "江西铜业" },
    { code: "000630", name: "铜陵有色" },
    { code: "600111", name: "北方稀土" },
    { code: "600392", name: "盛和资源" },
    { code: "603993", name: "洛阳钼业" },
    // 钢铁
    { code: "600019", name: "宝钢股份" },
    { code: "000932", name: "华菱钢铁" },
    { code: "600808", name: "马钢股份" },
    { code: "000708", name: "中信特钢" },
    { code: "600022", name: "山东钢铁" },
    { code: "601003", name: "柳钢股份" },
    { code: "600282", name: "南钢股份" },
    { code: "000959", name: "首钢股份" },
    { code: "600010", name: "包钢股份" },
    { code: "000825", name: "太钢不锈" },
    // 房地产
    { code: "000002", name: "万科A" },
    { code: "600048", name: "保利发展" },
    { code: "001979", name: "招商蛇口" },
    { code: "600606", name: "绿地控股" },
    { code: "000069", name: "华侨城A" },
    { code: "600383", name: "金地集团" },
    { code: "601155", name: "新城控股" },
    { code: "002146", name: "荣盛发展" },
    { code: "000656", name: "金科股份" },
    { code: "600340", name: "华夏幸福" },
    // 农林牧渔
    { code: "002714", name: "牧原股份" },
    { code: "300498", name: "温氏股份" },
    { code: "002157", name: "正邦科技" },
    { code: "002124", name: "天邦食品" },
    { code: "002299", name: "圣农发展" },
    { code: "002458", name: "益生股份" },
    { code: "002385", name: "大北农" },
    { code: "000998", name: "隆平高科" },
    { code: "600598", name: "北大荒" },
    { code: "002041", name: "登海种业" },
    // 纺织服装
    { code: "600398", name: "海澜之家" },
    { code: "002563", name: "森马服饰" },
    { code: "603877", name: "太平鸟" },
    { code: "600177", name: "雅戈尔" },
    { code: "002293", name: "罗莱生活" },
    { code: "603365", name: "水星家纺" },
    { code: "002327", name: "富安娜" },
    { code: "603808", name: "歌力思" },
    { code: "603839", name: "安正时尚" },
    { code: "600612", name: "老凤祥" },
    // 其他
    { code: "601888", name: "中国中免" },
    { code: "600729", name: "重庆百货" },
    { code: "002419", name: "天虹股份" },
    { code: "601828", name: "美凯龙" },
    { code: "600315", name: "上海家化" },
    { code: "603605", name: "珀莱雅" },
    { code: "300957", name: "贝泰妮" },
    { code: "600754", name: "锦江酒店" },
    { code: "600258", name: "首旅酒店" },
    { code: "300144", name: "宋城演艺" },
    { code: "002707", name: "众信旅游" },
    { code: "000888", name: "峨眉山A" },
    { code: "002033", name: "丽江股份" },
    { code: "600138", name: "中青旅" },
    { code: "601766", name: "中国中车" },
    { code: "002008", name: "大族激光" },
    { code: "300124", name: "汇川技术" },
    { code: "002747", name: "埃斯顿" },
    { code: "300450", name: "先导智能" },
    { code: "300316", name: "晶盛机电" },
    // 人工智能
    { code: "002230", name: "科大讯飞" },
    { code: "688256", name: "寒武纪" },
    { code: "300033", name: "同花顺" },
    { code: "300496", name: "中科创达" },
    { code: "688787", name: "海天瑞声" },
    { code: "300229", name: "拓尔思" },
    { code: "300474", name: "景嘉微" },
    { code: "300678", name: "中科信息" },
    { code: "002362", name: "汉王科技" },
    { code: "300170", name: "汉得信息" },
    // 算力产业链
    { code: "688256", name: "寒武纪" },
    { code: "688041", name: "海光信息" },
    { code: "300474", name: "景嘉微" },
    { code: "688047", name: "龙芯中科" },
    { code: "601138", name: "工业富联" },
    { code: "000938", name: "中科曙光" },
    { code: "603019", name: "浪潮信息" },
    { code: "002261", name: "拓维信息" },
    { code: "000034", name: "神州数码" },
    { code: "002229", name: "鸿博股份" },
    { code: "603629", name: "利通电子" },
    { code: "603985", name: "恒润股份" },
    { code: "600602", name: "云赛智联" },
    { code: "688158", name: "优刻得" },
    { code: "300308", name: "中际旭创" },
    { code: "300394", name: "天孚通信" },
    { code: "300502", name: "新易盛" },
    { code: "000988", name: "华工科技" },
    { code: "002281", name: "光迅科技" },
    { code: "002463", name: "沪电股份" },
    { code: "300476", name: "胜宏科技" },
    { code: "002837", name: "英维克" },
    { code: "300499", name: "高澜股份" },
    { code: "301018", name: "申菱环境" },
    // AI应用
    { code: "300418", name: "昆仑万维" },
    { code: "300364", name: "中文在线" },
    { code: "300459", name: "汤姆猫" },
    { code: "300624", name: "万兴科技" },
    { code: "300182", name: "捷成股份" },
    { code: "300226", name: "上海钢联" },
    { code: "300339", name: "润和软件" },
    { code: "300253", name: "卫宁健康" },
    { code: "300451", name: "创业慧康" },
    { code: "300212", name: "易华录" },
    // 低空经济
    { code: "002151", name: "北斗星通" },
    { code: "300900", name: "广联航空" },
    { code: "002097", name: "山河智能" },
    { code: "002389", name: "航天彩虹" },
    { code: "300114", name: "中航电测" },
    { code: "002013", name: "中航机电" },
    { code: "300775", name: "三角防务" },
    { code: "002179", name: "中航光电" },
    { code: "300696", name: "爱乐达" },
    { code: "002560", name: "通达股份" },
    // 人形机器人
    { code: "688017", name: "绿的谐波" },
    { code: "002472", name: "双环传动" },
    { code: "002896", name: "中大力德" },
    { code: "300124", name: "汇川技术" },
    { code: "002747", name: "埃斯顿" },
    { code: "688320", name: "禾川科技" },
    { code: "300024", name: "机器人" },
    { code: "688165", name: "埃夫特" },
    { code: "002527", name: "新时达" },
    { code: "300607", name: "拓斯达" },
    { code: "002050", name: "三花智控" },
    { code: "601689", name: "拓普集团" },
    { code: "603728", name: "鸣志电器" },
    { code: "300660", name: "江苏雷利" },
    { code: "689009", name: "九号公司" },
    { code: "603666", name: "亿嘉和" },
    { code: "688290", name: "景业智能" },
    // 商业航天
    { code: "600118", name: "中国卫星" },
    { code: "601698", name: "中国卫通" },
    { code: "300455", name: "航天智装" },
    { code: "002025", name: "航天电器" },
    { code: "300342", name: "天银机电" },
    { code: "300123", name: "亚光科技" },
    { code: "002935", name: "天奥电子" },
    { code: "300159", name: "新研股份" },
    { code: "300101", name: "振芯科技" },
    { code: "002544", name: "普天科技" },
    // 高股息-煤炭
    { code: "601088", name: "中国神华" },
    { code: "601225", name: "陕西煤业" },
    { code: "600188", name: "兖矿能源" },
    { code: "601699", name: "潞安环能" },
    { code: "600123", name: "兰花科创" },
    { code: "600971", name: "恒源煤电" },
    { code: "601015", name: "陕西黑猫" },
    { code: "600395", name: "盘江股份" },
    { code: "601666", name: "平煤股份" },
    { code: "600408", name: "安泰集团" },
    // 中字头
    { code: "601668", name: "中国建筑" },
    { code: "601390", name: "中国中铁" },
    { code: "601186", name: "中国铁建" },
    { code: "601800", name: "中国交建" },
    { code: "601618", name: "中国中冶" },
    { code: "601669", name: "中国电建" },
    { code: "601868", name: "中国能建" },
    { code: "601728", name: "中国电信" },
    { code: "601888", name: "中国中免" },
    { code: "601766", name: "中国中车" },
    // 设备更新-工业母机
    { code: "000837", name: "秦川机床" },
    { code: "002008", name: "大族激光" },
    { code: "300083", name: "创世纪" },
    { code: "002559", name: "亚威股份" },
    { code: "300161", name: "华中数控" },
    { code: "002248", name: "华东数控" },
    { code: "300809", name: "华辰装备" },
    { code: "688305", name: "科德数控" },
    { code: "002903", name: "宇环数控" },
    { code: "300606", name: "金太阳" }
];

// ==================== 全局状态 ====================
let currentTab = 'home';
let currentFilter = 'all';
let marketFilter = 'all';
let marketCategory = 'all'; // 当前市场页面选中的行业分类
let screenerMAFilter = 'above'; // 筛选页面的MA250过滤条件
let currentDetailStock = null;
let detailChart = null;

// 股票数据缓存
let stockDataCache = {};

// ==================== localStorage 操作 ====================
const Storage = {
    // 获取自定义价格
    getCustomPrice(code) {
        const data = JSON.parse(localStorage.getItem('customPrices') || '{}');
        return data[code] || null;
    },
    
    // 保存自定义价格
    setCustomPrice(code, buyPrice, sellPrice) {
        const data = JSON.parse(localStorage.getItem('customPrices') || '{}');
        data[code] = { buyPrice, sellPrice, updatedAt: Date.now() };
        localStorage.setItem('customPrices', JSON.stringify(data));
    },
    
    // 获取自选列表
    getWatchlist() {
        return JSON.parse(localStorage.getItem('watchlist') || '[]');
    },
    
    // 添加自选
    addToWatchlist(code) {
        const list = this.getWatchlist();
        if (!list.includes(code)) {
            list.push(code);
            localStorage.setItem('watchlist', JSON.stringify(list));
        }
    },
    
    // 移除自选
    removeFromWatchlist(code) {
        const list = this.getWatchlist();
        const idx = list.indexOf(code);
        if (idx > -1) {
            list.splice(idx, 1);
            localStorage.setItem('watchlist', JSON.stringify(list));
        }
    },
    
    // 获取持仓
    getHoldings() {
        return JSON.parse(localStorage.getItem('holdings') || '[]');
    },
    
    // 保存持仓
    setHoldings(holdings) {
        localStorage.setItem('holdings', JSON.stringify(holdings));
    },
    
    // 获取自选股的持仓信息（股数和成本价）
    getWatchlistHolding(code) {
        const data = JSON.parse(localStorage.getItem('watchlistHoldings') || '{}');
        return data[code] || null;
    },
    
    // 保存自选股的持仓信息
    setWatchlistHolding(code, shares, costPrice, commissionRate = 0.00025) {
        const data = JSON.parse(localStorage.getItem('watchlistHoldings') || '{}');
        if (shares > 0 && costPrice > 0) {
            data[code] = { shares, costPrice, commissionRate, updatedAt: Date.now() };
        } else {
            delete data[code];
        }
        localStorage.setItem('watchlistHoldings', JSON.stringify(data));
    },
    
    // 获取所有有持仓的自选股
    getAllWatchlistHoldings() {
        const data = JSON.parse(localStorage.getItem('watchlistHoldings') || '{}');
        const result = [];
        for (const code in data) {
            if (data[code].shares > 0) {
                result.push({ code, ...data[code] });
            }
        }
        return result;
    },
    
    // 访问统计
    recordVisit() {
        const today = new Date().toDateString();
        const stats = JSON.parse(localStorage.getItem('visitStats') || '{"today":0,"total":0,"date":""}');
        
        if (stats.date !== today) {
            stats.today = 0;
            stats.date = today;
        }
        stats.today++;
        stats.total++;
        localStorage.setItem('visitStats', JSON.stringify(stats));
        return stats;
    },
    
    getVisitStats() {
        return JSON.parse(localStorage.getItem('visitStats') || '{"today":0,"total":0,"date":""}');
    }
};

// ==================== 核心算法 ====================
const Algorithm = {
    // 计算MA250
    calculateMA250(klineData) {
        if (!klineData || klineData.length < 250) return 0;
        const prices = klineData.slice(-250).map(item => parseFloat(item[2]));
        const sum = prices.reduce((a, b) => a + b, 0);
        return sum / 250;
    },
    
    // 获取有效买入价（自定义优先）
    getEffectiveBuyPrice(code, ma250) {
        const custom = Storage.getCustomPrice(code);
        if (custom && custom.buyPrice > 0) return custom.buyPrice;
        return ma250 * 0.75;
    },
    
    // 获取有效卖出价（自定义优先）
    getEffectiveSellPrice(code, ma250) {
        const custom = Storage.getCustomPrice(code);
        if (custom && custom.sellPrice > 0) return custom.sellPrice;
        return ma250 * 1.5;
    },
    
    // 计算综合得分（基于价格位置）
    calculateScore(currentPrice, buyPrice, sellPrice) {
        if (!currentPrice || !buyPrice || !sellPrice) return 0;
        const range = sellPrice - buyPrice;
        if (range <= 0) return 50;
        const position = (currentPrice - buyPrice) / range;
        // 越接近买入价，得分越高（适合买入）
        // 越接近卖出价，得分越低（适合卖出）
        return Math.max(0, Math.min(100, (1 - position) * 100));
    },
    
    // 判断状态
    getStatus(currentPrice, buyPrice, sellPrice) {
        if (!currentPrice || !buyPrice || !sellPrice) return 'hold';
        if (currentPrice <= buyPrice) return 'buy';
        if (currentPrice >= sellPrice) return 'sell';
        return 'hold';
    },
    
    // ==================== 股息计算 ====================
    // 计算股息率 = 最近12个月总分红 ÷ 当前股价 × 100%
    calculateDividendYield(dividend, currentPrice) {
        if (!dividend || !currentPrice || currentPrice <= 0) return 0;
        return (dividend / currentPrice) * 100;
    },
    
    // 判断是否为红利票（股息率≥3%）
    isDividendStock(dividendYield) {
        return dividendYield >= 3.0;
    },
    
    // 获取股息评级
    getDividendRating(dividendYield) {
        if (dividendYield >= 5.0) return { level: 'A', text: '高股息', color: '#52c41a' };
        if (dividendYield >= 3.0) return { level: 'B', text: '红利票', color: '#1890ff' };
        if (dividendYield >= 2.0) return { level: 'C', text: '一般', color: '#faad14' };
        return { level: 'D', text: '低股息', color: '#999' };
    }
};

// ==================== 数据获取 ====================
async function fetchStockData(code) {
    if (stockDataCache[code] && Date.now() - stockDataCache[code].timestamp < 60000) {
        return stockDataCache[code];
    }
    
    const marketPrefix = code.startsWith('6') ? 'sh' : 'sz';
    const stockCode = marketPrefix + code;
    
    try {
        // 获取实时价格
        const realtimeRes = await fetch(`https://qt.gtimg.cn/q=${stockCode}`);
        const realtimeText = await realtimeRes.text();
        const match = realtimeText.match(new RegExp(`v_${stockCode}="([^"]+)"`));
        
        let currentPrice = 0, prevClose = 0;
        if (match) {
            const arr = match[1].split('~');
            currentPrice = parseFloat(arr[3]) || 0;
            prevClose = parseFloat(arr[4]) || 0;
        }
        
        // 获取K线数据计算MA250
        const klineRes = await fetch(`https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?param=${stockCode},day,,,365,qfq`);
        const klineData = await klineRes.json();
        let klineList = [];
        
        if (klineData.data && klineData.data[stockCode]) {
            klineList = klineData.data[stockCode].qfqday || klineData.data[stockCode].qfq || [];
        }
        
        const ma250 = Algorithm.calculateMA250(klineList);
        const buyPrice = Algorithm.getEffectiveBuyPrice(code, ma250);
        const sellPrice = Algorithm.getEffectiveSellPrice(code, ma250);
        const score = Algorithm.calculateScore(currentPrice, buyPrice, sellPrice);
        const status = Algorithm.getStatus(currentPrice, buyPrice, sellPrice);
        
        const data = {
            code,
            currentPrice,
            prevClose,
            ma250,
            buyPrice,
            sellPrice,
            score,
            status,
            klineList,
            timestamp: Date.now()
        };
        
        stockDataCache[code] = data;
        return data;
    } catch (e) {
        console.error('获取股票数据失败:', code, e);
        return null;
    }
}

// ==================== 统一的股票分析函数 ====================
function analyzeStockForDisplay(stock, data) {
    const currentPrice = data.currentPrice || 0;
    const ma250 = data.ma250 || 0;
    const dividend = stock.dividend || 0;
    
    // 计算股息率
    const dividendYield = Algorithm.calculateDividendYield(dividend, currentPrice);
    const isDividendStock = Algorithm.isDividendStock(dividendYield);
    const dividendRating = Algorithm.getDividendRating(dividendYield);
    
    // 买卖Call信号分析
    const isMacdBullish = currentPrice > ma250;
    const isBuyPos = currentPrice <= ma250 * 1.05;
    const isSellPos = currentPrice >= ma250 * 1.3;
    const isMoonDraw = currentPrice < ma250 * 0.9;
    
    // 计算得分
    let score = 50;
    if (isMacdBullish) score += 20;
    if (isBuyPos) score += 15;
    if (!isMoonDraw) score += 15;
    if (isDividendStock) score += 10; // 红利票加分
    
    // 判断信号
    let signal = 'hold';
    let signalText = '持有观望';
    if (isMoonDraw) {
        signal = 'forbidden';
        signalText = '禁止操作';
    } else if (isMacdBullish && isBuyPos && score >= 70) {
        signal = 'buy';
        signalText = '建议买入';
    } else if (isSellPos) {
        signal = 'sell';
        signalText = '建议卖出';
    }
    
    return {
        currentPrice,
        ma250,
        dividend,
        dividendYield,
        isDividendStock,
        dividendRating,
        score,
        signal,
        signalText,
        isMacdBullish,
        isBuyPos,
        isSellPos,
        isMoonDraw,
        suggestBuyPrice: ma250 * 0.95,
        suggestSellPrice: ma250 * 1.25
    };
}

// ==================== 页面渲染 ====================
function renderStockItem(stock, data, options = {}) {
    const analysis = analyzeStockForDisplay(stock, data);
    const { showSignal = true, showScore = true } = options;
    
    const statusTagClass = {
        buy: 'status-tag-buy',
        sell: 'status-tag-sell',
        hold: 'status-tag-hold',
        forbidden: 'status-tag-forbidden'
    };
    
    const statusClass = { buy: 'status-buy', sell: 'status-sell', hold: 'status-hold' };
    
    // 股息标签
    const dividendTagHtml = analysis.dividend > 0 ? `
        <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 11px; padding: 2px 8px; border-radius: 4px; background: ${analysis.isDividendStock ? '#f6ffed' : '#f5f5f5'}; color: ${analysis.dividendRating.color}; border: 1px solid ${analysis.isDividendStock ? '#b7eb8f' : '#d9d9d9'}; margin-left: 6px;">
            💰 ${analysis.dividendYield.toFixed(2)}%
        </span>
    ` : '';
    
    // 信号标签（所有信号都可点击查看详细解释）
    const signalTagHtml = showSignal ? `
        <span class="status-tag ${statusTagClass[analysis.signal]}" 
              onclick="event.stopPropagation(); openSignalExplainModal('${stock.code}')" 
              style="cursor: pointer;" 
              title="点击查看信号解释">
            ${analysis.signalText}
        </span>
    ` : '';
    
    // 得分显示（可点击查看详情）
    const scoreHtml = showScore ? `
        <div style="font-size: 10px; color: #8c8c8c; margin-top: 4px; cursor: pointer;" 
             onclick="event.stopPropagation(); openScoreDetailModal('${stock.code}')" 
             title="点击查看得分计算详情">
            得分: ${analysis.score.toFixed(1)} 💡
        </div>
    ` : '';
    
    return `
        <div class="stock-item" onclick="openDetail('${stock.code}')">
            <div class="stock-header">
                <div>
                    <span class="stock-name">${stock.name}</span>
                    <span class="stock-code">${stock.code}</span>
                    ${dividendTagHtml}
                </div>
                <div style="text-align: right;">
                    ${signalTagHtml}
                    ${scoreHtml}
                </div>
            </div>
            <div class="stock-price-row">
                <div>
                    <div class="price-label">当前价</div>
                    <div class="price-current">¥${analysis.currentPrice.toFixed(2)}</div>
                </div>
            </div>
            <div class="stock-price-row" style="margin-top: 8px; font-size: 12px; display: flex; justify-content: space-between;">
                <div style="text-align: left; flex: 1;" onclick="event.stopPropagation(); showTermExplain('suggestBuy')">
                    <div class="price-label" style="font-size: 11px; margin-bottom: 2px; cursor: pointer; text-decoration: underline; text-decoration-style: dotted; color: #1890ff;">建议买入</div>
                    <div class="${statusClass.buy}" style="font-weight: 500;">¥${analysis.suggestBuyPrice.toFixed(2)}</div>
                </div>
                <div style="text-align: center; flex: 1;" onclick="event.stopPropagation(); showTermExplain('ma250')">
                    <div class="price-label" style="font-size: 11px; margin-bottom: 2px; cursor: pointer; text-decoration: underline; text-decoration-style: dotted; color: #1890ff;">MA250</div>
                    <div style="font-weight: 500; color: #262626;">¥${analysis.ma250.toFixed(2)}</div>
                </div>
                <div style="text-align: right; flex: 1;" onclick="event.stopPropagation(); showTermExplain('suggestSell')">
                    <div class="price-label" style="font-size: 11px; margin-bottom: 2px; cursor: pointer; text-decoration: underline; text-decoration-style: dotted; color: #1890ff;">建议卖出</div>
                    <div class="${statusClass.sell}" style="font-weight: 500;">¥${analysis.suggestSellPrice.toFixed(2)}</div>
                </div>
            </div>
        </div>
    `;
}

async function renderHomeList() {
    const watchlist = Storage.getWatchlist();
    const container = document.getElementById('homeStockList');
    
    if (watchlist.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding: 40px 20px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 16px;">📋</div>
                <div style="font-size: 16px; font-weight: 600; color: #262626; margin-bottom: 8px;">暂无自选股票</div>
                <div style="font-size: 14px; color: #8c8c8c; margin-bottom: 20px;">
                    请先添加股票到自选列表
                </div>
                <button onclick="document.getElementById('stockSearchInput').focus()" style="padding: 12px 24px; background: #1890ff; color: white; border: none; border-radius: 8px; font-size: 14px; cursor: pointer;">
                    去添加自选股 →
                </button>
            </div>
        `;
        return;
    }
    
    // 显示加载状态
    container.innerHTML = `
        <div class="empty-state" style="padding: 60px 20px; text-align: center;">
            <div class="loading-spinner large" style="margin-bottom: 16px;"></div>
            <div style="font-size: 14px; color: #8c8c8c;">正在加载股票数据...</div>
        </div>
    `;
    
    // 先加载所有股票数据到缓存
    for (const code of watchlist) {
        const stock = A_STOCKS.find(s => s.code === code);
        if (stock && !stockDataCache[code]) {
            await fetchStockData(code);
        }
    }
    
    // 获取所有股票对象
    const stocks = watchlist.map(code => A_STOCKS.find(s => s.code === code)).filter(Boolean);
    
    // 使用统一的筛选和排序函数（已按得分降序排序）
    const filtered = filterAndSortStocks(stocks, currentFilter);
    
    container.innerHTML = filtered.map(({ stock, data }) => renderStockItem(stock, data)).join('');
}

async function renderMarketList() {
    const watchlist = Storage.getWatchlist();
    const container = document.getElementById('marketStockList');
    
    // 显示加载状态
    container.innerHTML = `
        <div class="empty-state" style="padding: 60px 20px; text-align: center;">
            <div class="loading-spinner large" style="margin-bottom: 16px;"></div>
            <div style="font-size: 14px; color: #8c8c8c;">正在加载股票数据...</div>
        </div>
    `;
    
    // 根据行业分类获取股票列表
    let stocksToShow = [];
    if (marketCategory === 'all') {
        // 全部：加载所有股票
        stocksToShow = A_STOCKS;
    } else {
        // 特定分类：从分类映射中获取股票代码
        const categoryCodes = STOCK_CATEGORIES[marketCategory] || [];
        stocksToShow = A_STOCKS.filter(stock => categoryCodes.includes(stock.code));
    }
    
    // 限制显示数量（全部时只显示前50只，避免加载过慢）
    if (marketCategory === 'all') {
        stocksToShow = stocksToShow.slice(0, 50);
    }
    
    // 先加载所有股票数据到缓存
    for (const stock of stocksToShow) {
        if (!stockDataCache[stock.code]) {
            await fetchStockData(stock.code);
        }
    }
    
    // 使用统一的筛选和排序函数（已按得分降序排序）
    const filtered = filterAndSortStocks(stocksToShow, marketFilter);
    
    container.innerHTML = filtered.map(({ stock, data }) => renderStockItem(stock, data)).join('');
}

// 根据筛选条件排序
function sortByFilterRule(dataA, dataB, filter) {
    if (filter === 'buy') {
        // 可买入：按距离买入价的距离升序（越接近买入价越优先）
        // 距离 = (当前价 - 买入价) / 买入价
        const distA = (dataA.currentPrice - dataA.buyPrice) / dataA.buyPrice;
        const distB = (dataB.currentPrice - dataB.buyPrice) / dataB.buyPrice;
        return distA - distB;
    } else if (filter === 'sell') {
        // 可卖出：按距离卖出价的距离升序（越接近卖出价越优先）
        // 距离 = (卖出价 - 当前价) / 卖出价
        const distA = (dataA.sellPrice - dataA.currentPrice) / dataA.sellPrice;
        const distB = (dataB.sellPrice - dataB.currentPrice) / dataB.sellPrice;
        return distA - distB;
    } else {
        // 全部：按综合得分降序
        return dataB.score - dataA.score;
    }
}

// 计算卖出费用
function calculateSellingFees(code, shares, currentPrice, commissionRate) {
    const sellAmount = shares * currentPrice;
    
    // 印花税：卖出金额的0.1%
    const stampTax = sellAmount * 0.001;
    
    // 券商佣金：卖出金额 × 佣金比例，最低5元
    let commission = sellAmount * commissionRate;
    if (commission < 5) commission = 5;
    
    // 过户费：仅沪市股票（6开头），每1000股收1元，不足1000股按1元
    let transferFee = 0;
    if (code.startsWith('6')) {
        transferFee = Math.max(Math.ceil(shares / 1000), 1);
    }
    
    return {
        stampTax,
        commission,
        transferFee,
        totalFees: stampTax + commission + transferFee
    };
}

async function renderHoldings() {
    // 从自选股持仓中获取数据
    const watchlistHoldings = Storage.getAllWatchlistHoldings();
    const container = document.getElementById('holdingList');
    
    let totalInvest = 0;
    let totalValue = 0;
    let totalGrossProfit = 0;
    let totalFees = 0;
    let totalNetProfit = 0;
    
    if (watchlistHoldings.length === 0) {
        container.innerHTML = '<div class="empty-state">暂无持仓<br>请在自选股票详情页添加持仓信息</div>';
    } else {
        const html = [];
        for (const holding of watchlistHoldings) {
            const data = await fetchStockData(holding.code);
            if (!data) continue;
            
            const stock = A_STOCKS.find(s => s.code === holding.code);
            const invest = holding.costPrice * holding.shares;
            const value = data.currentPrice * holding.shares;
            const commissionRate = holding.commissionRate || 0.00025;
            
            // 扣税前盈亏（毛利润）
            const grossProfit = value - invest;
            
            // 计算卖出费用
            const fees = calculateSellingFees(holding.code, holding.shares, data.currentPrice, commissionRate);
            
            // 扣税后盈亏（净利润）
            const netProfit = grossProfit - fees.totalFees;
            const netProfitPercent = invest > 0 ? (netProfit / invest * 100) : 0;
            
            totalInvest += invest;
            totalValue += value;
            totalGrossProfit += grossProfit;
            totalFees += fees.totalFees;
            totalNetProfit += netProfit;
            
            const netProfitClass = netProfit >= 0 ? 'positive' : 'negative';
            const netProfitSign = netProfit >= 0 ? '+' : '';
            
            html.push(`
                <div class="holding-item">
                    <div class="holding-header">
                        <div>
                            <span class="holding-name">${stock?.name || holding.code}</span>
                            <span style="color: #999; font-size: 12px;">${holding.code}</span>
                        </div>
                        <div class="holding-profit ${netProfitClass}">${netProfitSign}${netProfitPercent.toFixed(2)}%</div>
                    </div>
                    <div class="holding-grid">
                        <div>
                            <div class="label">成本</div>
                            <div>¥${holding.costPrice.toFixed(2)}</div>
                        </div>
                        <div>
                            <div class="label">现价</div>
                            <div>¥${data.currentPrice.toFixed(2)}</div>
                        </div>
                        <div>
                            <div class="label">股数</div>
                            <div>${holding.shares.toLocaleString()}</div>
                        </div>
                        <div>
                            <div class="label">投入</div>
                            <div>¥${invest.toLocaleString()}</div>
                        </div>
                        <div>
                            <div class="label">市值</div>
                            <div>¥${value.toLocaleString()}</div>
                        </div>
                        <div>
                            <div class="label">净利润</div>
                            <div class="${netProfitClass}">${netProfitSign}¥${netProfit.toLocaleString()}</div>
                        </div>
                    </div>
                </div>
            `);
        }
        container.innerHTML = html.join('');
    }
    
    // 更新统计 - 显示税后净利润
    const netProfitClass = totalNetProfit >= 0 ? 'positive' : 'negative';
    const grossProfitClass = totalGrossProfit >= 0 ? 'positive' : 'negative';
    
    document.getElementById('totalInvest').textContent = '¥' + totalInvest.toLocaleString('zh-CN', { minimumFractionDigits: 2 });
    document.getElementById('totalValue').textContent = '¥' + totalValue.toLocaleString('zh-CN', { minimumFractionDigits: 2 });
    
    // 毛利润
    const grossSign = totalGrossProfit >= 0 ? '+' : '';
    const grossEl = document.getElementById('totalGrossProfit');
    grossEl.textContent = grossSign + '¥' + totalGrossProfit.toLocaleString('zh-CN', { minimumFractionDigits: 2 });
    grossEl.className = 'stats-value ' + grossProfitClass;
    
    // 卖出费用
    document.getElementById('totalFees').textContent = '-¥' + totalFees.toLocaleString('zh-CN', { minimumFractionDigits: 2 });
    
    // 净利润（重点显示）
    const netSign = totalNetProfit >= 0 ? '+' : '';
    const netEl = document.getElementById('totalNetProfit');
    netEl.textContent = netSign + '¥' + totalNetProfit.toLocaleString('zh-CN', { minimumFractionDigits: 2 });
    netEl.className = 'stats-value ' + netProfitClass;
}

// ==================== 术语解释 ====================
const termExplains = {
    ma250: {
        title: 'MA250（250日均线）',
        content: `
            <p><strong>定义：</strong>MA250是过去250个交易日收盘价的平均值，又称年线。</p>
            <p style="margin-top: 10px;"><strong>计算方法：</strong></p>
            <p>将最近250个交易日的收盘价相加，再除以250。</p>
            <p style="margin-top: 10px;"><strong>投资意义：</strong></p>
            <p>• MA250是重要的长期趋势指标</p>
            <p>• 股价在MA250上方，通常视为长期牛市</p>
            <p>• 股价在MA250下方，通常视为长期熊市</p>
            <p>• 本系统用MA250作为估值中枢参考</p>
        `
    },
    suggestBuy: {
        title: '建议买入价',
        content: `
            <p><strong>定义：</strong>系统根据估值模型计算出的合理买入价位。</p>
            <p style="margin-top: 10px;"><strong>计算方法：</strong></p>
            <p>建议买入价 = MA250 × 0.75</p>
            <p style="margin-top: 10px;"><strong>逻辑说明：</strong></p>
            <p>• 当价格低于MA250的75%时，被认为低估</p>
            <p>• 此时买入有较大的安全边际</p>
            <p>• 适合价值投资者分批建仓</p>
            <p style="margin-top: 10px;"><strong>注意：</strong>此为系统建议，不构成投资建议</p>
        `
    },
    suggestSell: {
        title: '建议卖出价',
        content: `
            <p><strong>定义：</strong>系统根据估值模型计算出的合理卖出价位。</p>
            <p style="margin-top: 10px;"><strong>计算方法：</strong></p>
            <p>建议卖出价 = MA250 × 1.5</p>
            <p style="margin-top: 10px;"><strong>逻辑说明：</strong></p>
            <p>• 当价格高于MA250的150%时，被认为高估</p>
            <p>• 此时卖出可以锁定利润</p>
            <p>• 适合获利了结或减仓</p>
            <p style="margin-top: 10px;"><strong>注意：</strong>此为系统建议，不构成投资建议</p>
        `
    },
    median: {
        title: '中位数',
        content: `
            <p><strong>定义：</strong>近1年所有交易日价格排序后的中间值。</p>
            <p style="margin-top: 10px;"><strong>计算方法：</strong></p>
            <p>将最近365个交易日的价格从高到低排序，取第183个（正中间）的价格。</p>
            <p style="margin-top: 10px;"><strong>投资意义：</strong></p>
            <p>• 中位数代表一年价格的中心位置</p>
            <p>• 比平均值更能反映典型价格水平</p>
            <p>• 不受极端高价或低价的影响</p>
        `
    },
    yearHigh: {
        title: '近1年最高价',
        content: `
            <p><strong>定义：</strong>最近365个交易日中的最高价格。</p>
            <p style="margin-top: 10px;"><strong>投资意义：</strong></p>
            <p>• 代表过去一年的压力位</p>
            <p>• 股价接近此价位时可能面临抛压</p>
            <p>• 突破此价位可能开启新的上涨趋势</p>
        `
    },
    yearLow: {
        title: '近1年最低价',
        content: `
            <p><strong>定义：</strong>最近365个交易日中的最低价格。</p>
            <p style="margin-top: 10px;"><strong>投资意义：</strong></p>
            <p>• 代表过去一年的支撑位</p>
            <p>• 股价接近此价位时可能获得支撑</p>
            <p>• 跌破此价位可能继续下探</p>
        `
    },
    commission: {
        title: '券商佣金',
        content: `
            <p><strong>定义：</strong>证券公司收取的交易手续费。</p>
            <p style="margin-top: 10px;"><strong>费率说明：</strong></p>
            <p>• 万1.5：每万元收取1.5元</p>
            <p>• 万2.5：每万元收取2.5元（默认）</p>
            <p>• 万3：每万元收取3元</p>
            <p style="margin-top: 10px;"><strong>最低收费：</strong></p>
            <p>每笔交易最低收取5元，即使按比例计算不足5元也按5元收取。</p>
        `
    },
    stampTax: {
        title: '印花税',
        content: `
            <p><strong>定义：</strong>国家税收，仅在卖出股票时收取。</p>
            <p style="margin-top: 10px;"><strong>税率：</strong>卖出金额的0.1%</p>
            <p style="margin-top: 10px;"><strong>特点：</strong></p>
            <p>• 买入不收，卖出才收</p>
            <p>• 由国家统一规定，无法降低</p>
            <p>• 是股票交易的主要成本之一</p>
        `
    },
    transferFee: {
        title: '过户费',
        content: `
            <p><strong>定义：</strong>股票所有权转移时收取的费用。</p>
            <p style="margin-top: 10px;"><strong>收费标准：</strong></p>
            <p>• 仅沪市股票（6开头）收取</p>
            <p>• 每1000股收取1元</p>
            <p>• 不足1000股按1元收取</p>
            <p style="margin-top: 10px;"><strong>深市股票：</strong></p>
            <p>深市股票（0或3开头）不收取过户费。</p>
        `
    },
    grossProfit: {
        title: '毛利润（扣税前）',
        content: `
            <p><strong>定义：</strong>未扣除卖出费用的账面盈亏。</p>
            <p style="margin-top: 10px;"><strong>计算方法：</strong></p>
            <p>毛利润 = (当前价 - 成本价) × 持股数量</p>
            <p style="margin-top: 10px;"><strong>说明：</strong></p>
            <p>• 这是未考虑交易费用的理论盈亏</p>
            <p>• 实际到手金额需要扣除卖出费用</p>
            <p>• 仅供参考，以净利润为准</p>
        `
    },
    sellingFees: {
        title: '卖出费用',
        content: `
            <p><strong>定义：</strong>卖出股票时需要支付的各种费用总和。</p>
            <p style="margin-top: 10px;"><strong>包含项目：</strong></p>
            <p>• <strong>印花税：</strong>卖出金额的0.1%</p>
            <p>• <strong>券商佣金：</strong>按设置比例，最低5元</p>
            <p>• <strong>过户费：</strong>沪市股票每1000股1元</p>
            <p style="margin-top: 10px;"><strong>注意：</strong></p>
            <p>这些费用在卖出时才会实际扣除。</p>
        `
    },
    netProfit: {
        title: '净利润（扣税后）',
        content: `
            <p><strong>定义：</strong>扣除所有卖出费用后的实际盈亏。</p>
            <p style="margin-top: 10px;"><strong>计算方法：</strong></p>
            <p>净利润 = 毛利润 - 卖出费用</p>
            <p style="margin-top: 10px;"><strong>意义：</strong></p>
            <p>• 这是您实际能拿到手的盈亏金额</p>
            <p>• 已考虑印花税、佣金、过户费</p>
            <p>• 最真实的投资收益指标</p>
            <p style="margin-top: 10px;"><strong>颜色说明：</strong></p>
            <p>• 红色：盈利（中国股市习惯）</p>
            <p>• 绿色：亏损</p>
        `
    }
};

// 显示术语解释弹窗
function showTermExplain(termKey) {
    const term = termExplains[termKey];
    if (!term) return;
    
    document.getElementById('termExplainTitle').textContent = term.title;
    document.getElementById('termExplainContent').innerHTML = term.content;
    document.getElementById('termExplainModal').style.display = 'flex';
}

// 关闭术语解释弹窗
function closeTermExplainModal() {
    document.getElementById('termExplainModal').style.display = 'none';
}

// ==================== 详情页 ====================
async function openDetail(code) {
    currentDetailStock = code;
    const stock = A_STOCKS.find(s => s.code === code);
    const data = await fetchStockData(code);
    
    if (!data) {
        alert('获取股票数据失败');
        return;
    }
    
    document.getElementById('detailTitle').textContent = `${stock.name} (${code})`;
    document.getElementById('detailCurrentPrice').textContent = '¥' + data.currentPrice.toFixed(2);
    document.getElementById('detailMA250').textContent = '¥' + data.ma250.toFixed(2);
    document.getElementById('detailDefaultBuy').textContent = '¥' + (data.ma250 * 0.75).toFixed(2);
    document.getElementById('detailDefaultSell').textContent = '¥' + (data.ma250 * 1.5).toFixed(2);
    
    const statusText = { buy: '可买入', sell: '可卖出', hold: '持有观望' };
    document.getElementById('detailStatus').textContent = statusText[data.status];
    
    // 显示股息信息
    const dividend = stock.dividend || 0;
    const dividendYield = Algorithm.calculateDividendYield(dividend, data.currentPrice);
    const dividendRating = Algorithm.getDividendRating(dividendYield);
    const isDividendStock = Algorithm.isDividendStock(dividendYield);
    
    // 更新或创建股息显示元素
    let dividendEl = document.getElementById('detailDividend');
    if (!dividendEl) {
        dividendEl = document.createElement('div');
        dividendEl.id = 'detailDividend';
        dividendEl.className = 'detail-card';
        dividendEl.style.marginBottom = '12px';
        document.querySelector('.detail-content').insertBefore(dividendEl, document.querySelector('.detail-content').firstChild);
    }
    
    dividendEl.innerHTML = `
        <div class="detail-card-title">💰 股息信息（红利低波筛选）</div>
        <div class="detail-row">
            <span class="detail-label">最近12个月分红</span>
            <span class="detail-value">¥${dividend.toFixed(3)}/股</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">当前股息率</span>
            <span class="detail-value" style="color: ${dividendRating.color}; font-weight: 600;">${dividendYield.toFixed(2)}%</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">股息评级</span>
            <span class="detail-value" style="color: ${dividendRating.color};">${dividendRating.level}级 - ${dividendRating.text}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">是否红利票</span>
            <span class="detail-value" style="color: ${isDividendStock ? '#52c41a' : '#999'};">${isDividendStock ? '✅ 是（股息率≥3%）' : '❌ 否'}</span>
        </div>
        <div style="margin-top: 12px; padding: 10px; background: #f6ffed; border-radius: 6px; font-size: 12px; color: #389e0d;">
            💡 <strong>股息怎么用？</strong><br>
            股息率 = 年分红 ÷ 股价，只用来<strong>筛选好票</strong>，不是买卖点。<br>
            ≥3%算红利票，适合长期持有+波段操作。
        </div>
    `;
    
    // 加载自定义价格
    const custom = Storage.getCustomPrice(code);
    document.getElementById('customBuyPrice').value = custom?.buyPrice || '';
    document.getElementById('customSellPrice').value = custom?.sellPrice || '';
    
    // 加载持仓信息
    const holding = Storage.getWatchlistHolding(code);
    document.getElementById('holdingShares').value = holding?.shares || '';
    document.getElementById('holdingCostPrice').value = holding?.costPrice || '';
    document.getElementById('commissionRate').value = holding?.commissionRate || '0.00025';
    
    // 更新持仓收益展示
    updateHoldingProfitDisplay(data);
    
    // 更新自选按钮
    updateWatchlistBtn();
    
    // 显示详情页
    document.getElementById('detailPage').classList.add('active');
    
    // 渲染K线图（需要在页面显示后渲染，否则获取不到容器尺寸）
    setTimeout(() => {
        renderDetailChart(data);
    }, 100);
}

// 更新持仓收益展示
function updateHoldingProfitDisplay(data) {
    const holding = Storage.getWatchlistHolding(currentDetailStock);
    const profitCard = document.getElementById('holdingProfitCard');
    
    if (!holding || holding.shares <= 0) {
        profitCard.style.display = 'none';
        return;
    }
    
    const shares = holding.shares;
    const costPrice = holding.costPrice;
    const commissionRate = holding.commissionRate || 0.00025;
    const currentPrice = data.currentPrice;
    const costValue = shares * costPrice;
    const currentValue = shares * currentPrice;
    
    // 扣税前盈亏（毛利润）
    const grossProfit = currentValue - costValue;
    
    // 计算卖出费用
    const fees = calculateSellingFees(currentDetailStock, shares, currentPrice, commissionRate);
    
    // 扣税后盈亏（净利润）
    const netProfit = grossProfit - fees.totalFees;
    
    // 盈亏比例（基于成本）
    const profitPercent = (netProfit / costValue) * 100;
    
    // 颜色设置（中国股市：红涨绿跌）
    const profitColor = netProfit >= 0 ? '#f5222d' : '#52c41a';
    const grossProfitColor = grossProfit >= 0 ? '#f5222d' : '#52c41a';
    
    // 更新显示
    document.getElementById('displayHoldingShares').textContent = shares.toLocaleString() + ' 股';
    document.getElementById('displayHoldingCost').textContent = '¥' + costPrice.toFixed(2);
    document.getElementById('displayHoldingValue').textContent = '¥' + currentValue.toFixed(2);
    
    // 毛利润
    const grossSign = grossProfit >= 0 ? '+' : '';
    document.getElementById('displayGrossProfit').textContent = grossSign + '¥' + grossProfit.toFixed(2);
    document.getElementById('displayGrossProfit').style.color = grossProfitColor;
    
    // 卖出费用（显示为负数，表示扣除）
    document.getElementById('displayTotalFees').textContent = '-¥' + fees.totalFees.toFixed(2);
    
    // 净利润（重点显示）
    const netSign = netProfit >= 0 ? '+' : '';
    document.getElementById('displayNetProfit').textContent = netSign + '¥' + netProfit.toFixed(2);
    document.getElementById('displayNetProfit').style.color = profitColor;
    
    // 盈亏比例
    const profitPercentEl = document.getElementById('displayHoldingProfitPercent');
    profitPercentEl.textContent = netSign + profitPercent.toFixed(2) + '%';
    profitPercentEl.style.color = profitColor;
    
    // 费用明细
    document.getElementById('displayStampTax').textContent = '¥' + fees.stampTax.toFixed(2);
    document.getElementById('displayCommission').textContent = '¥' + fees.commission.toFixed(2) + ' (' + (commissionRate * 10000).toFixed(0) + '万)';
    document.getElementById('displayTransferFee').textContent = '¥' + fees.transferFee.toFixed(2);
    
    profitCard.style.display = 'block';
}

// 保存持仓信息
function saveHoldingInfo() {
    if (!currentDetailStock) return;
    
    const shares = parseInt(document.getElementById('holdingShares').value) || 0;
    const costPrice = parseFloat(document.getElementById('holdingCostPrice').value) || 0;
    const commissionRate = parseFloat(document.getElementById('commissionRate').value) || 0.00025;
    
    if (shares > 0 && costPrice <= 0) {
        alert('请输入有效的成本价');
        return;
    }
    
    Storage.setWatchlistHolding(currentDetailStock, shares, costPrice, commissionRate);
    
    // 刷新显示
    fetchStockData(currentDetailStock).then(data => {
        if (data) updateHoldingProfitDisplay(data);
    });
    
    // 刷新持仓页面
    renderHoldings();
    
    alert(shares > 0 ? '持仓保存成功！' : '持仓已清除');
}

function closeDetail() {
    document.getElementById('detailPage').classList.remove('active');
    currentDetailStock = null;
    if (detailChart) {
        detailChart.dispose();
        detailChart = null;
    }
}

function renderDetailChart(data) {
    const chartDiv = document.getElementById('detailChart');
    if (!chartDiv) return;
    
    if (detailChart) detailChart.dispose();
    
    // 检查K线数据
    if (!data.klineList || data.klineList.length === 0) {
        chartDiv.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #999; font-size: 14px;">暂无K线数据</div>';
        return;
    }
    
    detailChart = echarts.init(chartDiv);
    
    // 取最近120天数据
    const klineData = data.klineList.slice(-120);
    const dates = klineData.map(item => item[0]);
    const prices = klineData.map(item => parseFloat(item[2]));
    
    // 计算MA60线
    const maLine = prices.map((_, i) => {
        if (i < 59) return null;
        const slice = prices.slice(i - 59, i + 1);
        return slice.reduce((a, b) => a + b, 0) / 60;
    });
    
    // 添加MA250线（使用完整的kline数据计算，不仅限于显示的120天）
    const fullPrices = data.klineList.map(item => parseFloat(item[2]));
    const ma250Value = fullPrices.length >= 250 ? 
        fullPrices.slice(-250).reduce((a, b) => a + b, 0) / 250 : 
        (fullPrices.length > 0 ? fullPrices.reduce((a, b) => a + b, 0) / fullPrices.length : data.ma250);
    
    // MA250作为水平参考线显示（最新值）
    const ma250Line = prices.map(() => ma250Value);
    
    const option = {
        grid: { left: 10, right: 10, top: 40, bottom: 20, containLabel: true },
        tooltip: { 
            trigger: 'axis',
            formatter: function(params) {
                let result = params[0].axisValue + '<br/>';
                params.forEach(p => {
                    if (p.value !== null && p.value !== undefined) {
                        result += p.marker + ' ' + p.seriesName + ': ¥' + p.value.toFixed(2) + '<br/>';
                    }
                });
                return result;
            }
        },
        legend: { 
            data: ['收盘价', 'MA60', 'MA250'],
            top: 5,
            textStyle: { fontSize: 11 }
        },
        xAxis: { 
            type: 'category', 
            data: dates, 
            axisLabel: { 
                show: true,
                formatter: function(value) {
                    return value.substring(5); // 只显示月-日
                }
            }
        },
        yAxis: { 
            type: 'value', 
            scale: true,
            axisLabel: {
                formatter: '¥{value}'
            }
        },
        dataZoom: [{ type: 'inside', start: 50, end: 100 }],
        series: [
            {
                name: '收盘价',
                type: 'line',
                data: prices,
                smooth: true,
                symbol: 'none',
                lineStyle: { color: '#1890ff', width: 1.5 }
            },
            {
                name: 'MA60',
                type: 'line',
                data: maLine,
                smooth: true,
                symbol: 'none',
                lineStyle: { color: '#faad14', width: 1 }
            },
            {
                name: 'MA250',
                type: 'line',
                data: ma250Line,
                smooth: false,
                symbol: 'none',
                lineStyle: { color: '#f5222d', width: 2, type: 'dashed' },
                markLine: {
                    silent: true,
                    symbol: 'none',
                    lineStyle: { color: '#f5222d', width: 1, type: 'dotted' },
                    label: {
                        position: 'end',
                        formatter: 'MA250: ¥{c}',
                        fontSize: 10,
                        color: '#f5222d'
                    },
                    data: [
                        { yAxis: ma250Value, name: 'MA250' }
                    ]
                }
            }
        ]
    };
    
    detailChart.setOption(option);
}

function saveCustomPrice() {
    if (!currentDetailStock) return;
    
    const buyPrice = parseFloat(document.getElementById('customBuyPrice').value);
    const sellPrice = parseFloat(document.getElementById('customSellPrice').value);
    
    if (isNaN(buyPrice) || isNaN(sellPrice)) {
        alert('请输入有效的价格');
        return;
    }
    
    if (buyPrice >= sellPrice) {
        alert('买入价必须小于卖出价');
        return;
    }
    
    Storage.setCustomPrice(currentDetailStock, buyPrice, sellPrice);
    
    // 清除缓存重新获取
    delete stockDataCache[currentDetailStock];
    
    alert('保存成功！');
    
    // 刷新列表
    if (currentTab === 'home') renderHomeList();
    if (currentTab === 'market') renderMarketList();
}

function updateWatchlistBtn() {
    const btn = document.getElementById('watchlistToggleBtn');
    const watchlist = Storage.getWatchlist();
    const isInWatchlist = watchlist.includes(currentDetailStock);
    
    btn.textContent = isInWatchlist ? '移除自选' : '加入自选';
    btn.className = isInWatchlist ? 'watchlist-btn remove' : 'watchlist-btn';
}

function toggleWatchlist() {
    if (!currentDetailStock) return;
    
    const watchlist = Storage.getWatchlist();
    const isInWatchlist = watchlist.includes(currentDetailStock);
    
    if (isInWatchlist) {
        Storage.removeFromWatchlist(currentDetailStock);
    } else {
        Storage.addToWatchlist(currentDetailStock);
    }
    
    updateWatchlistBtn();
    
    // 刷新列表
    if (currentTab === 'home') renderHomeList();
}

// ==================== 筛选功能 ====================
let currentSearchResult = null;

function filterStocks(type) {
    currentFilter = type;
    document.querySelectorAll('#pageHome .filter-tab').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderHomeList();
}

// 筛选并排序股票列表
function filterAndSortStocks(stocks, filterType) {
    // 先获取每只股票的数据和分析
    const stocksWithAnalysis = stocks.map(stock => {
        const data = stockDataCache[stock.code] || {};
        const analysis = analyzeStockForDisplay(stock, data);
        return { stock, data, analysis };
    });
    
    // 根据筛选条件过滤
    let filtered = stocksWithAnalysis;
    if (filterType === 'buy') {
        // 只显示建议买入的股票
        filtered = stocksWithAnalysis.filter(item => item.analysis.signal === 'buy');
    } else if (filterType === 'sell') {
        // 只显示建议卖出的股票
        filtered = stocksWithAnalysis.filter(item => item.analysis.signal === 'sell');
    }
    
    // 按得分降序排序（得分高的在前）
    filtered.sort((a, b) => b.analysis.score - a.analysis.score);
    
    return filtered;
}

// 搜索股票
function searchStock() {
    const input = document.getElementById('stockSearchInput').value.trim();
    const resultDiv = document.getElementById('searchResult');
    const contentDiv = document.getElementById('searchResultContent');
    
    if (!input) {
        resultDiv.style.display = 'none';
        currentSearchResult = null;
        return;
    }
    
    // 在股票列表中搜索
    let found = null;
    
    // 先按代码精确匹配
    found = A_STOCKS.find(s => s.code === input);
    
    // 再按代码模糊匹配
    if (!found) {
        found = A_STOCKS.find(s => s.code.includes(input));
    }
    
    // 再按名称匹配
    if (!found) {
        found = A_STOCKS.find(s => s.name.includes(input));
    }
    
    if (found) {
        currentSearchResult = found;
        const isInWatchlist = Storage.getWatchlist().includes(found.code);
        contentDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <span style="font-weight: 600; font-size: 16px;">${found.name}</span>
                    <span style="color: #8c8c8c; margin-left: 8px;">${found.code}</span>
                </div>
                ${isInWatchlist ? '<span style="color: #52c41a; font-size: 12px;">已在自选</span>' : ''}
            </div>
        `;
        resultDiv.style.display = 'block';
        
        // 如果已在自选，隐藏添加按钮
        const addBtn = resultDiv.querySelector('button');
        if (isInWatchlist) {
            addBtn.style.display = 'none';
        } else {
            addBtn.style.display = 'block';
        }
    } else {
        currentSearchResult = null;
        contentDiv.innerHTML = '<span style="color: #f5222d;">未找到匹配的股票</span>';
        resultDiv.style.display = 'block';
        resultDiv.querySelector('button').style.display = 'none';
    }
}

// 添加搜索结果到自选
function addSearchResultToWatchlist() {
    if (!currentSearchResult) return;
    
    const watchlist = Storage.getWatchlist();
    if (watchlist.includes(currentSearchResult.code)) {
        alert('该股票已在自选列表中');
        return;
    }
    
    Storage.addToWatchlist(currentSearchResult.code);
    
    // 清空搜索
    document.getElementById('stockSearchInput').value = '';
    document.getElementById('searchResult').style.display = 'none';
    currentSearchResult = null;
    
    // 刷新列表
    renderHomeList();
    
    alert(`已将 ${currentSearchResult?.name || '股票'} 添加到自选`);
}

function filterMarketStocks(type) {
    marketFilter = type;
    document.querySelectorAll('#pageMarket .filter-tab').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderMarketList();
}

// 按行业分类筛选市场股票
function filterMarketByCategory(category) {
    marketCategory = category;
    
    // 更新分类标签样式
    document.querySelectorAll('#categoryTabs .category-tab').forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = '#f5f5f5';
        btn.style.color = '#595959';
    });
    event.target.classList.add('active');
    event.target.style.background = '#1890ff';
    event.target.style.color = 'white';
    
    renderMarketList();
}

// ==================== 标签切换 ====================
function switchTab(tab) {
    currentTab = tab;
    
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.bottom-tab').forEach(b => b.classList.remove('active'));
    
    if (tab === 'strategy') {
        document.getElementById('pageStrategy').classList.add('active');
        document.querySelectorAll('.bottom-tab')[0].classList.add('active');
        renderStrategyPage();
    } else if (tab === 'home') {
        document.getElementById('pageHome').classList.add('active');
        document.querySelectorAll('.bottom-tab')[1].classList.add('active');
        renderHomeList();
    } else if (tab === 'market') {
        document.getElementById('pageMarket').classList.add('active');
        document.querySelectorAll('.bottom-tab')[2].classList.add('active');
        renderMarketList();
    } else if (tab === 'screener') {
        document.getElementById('pageScreener').classList.add('active');
        document.querySelectorAll('.bottom-tab')[3].classList.add('active');
    } else if (tab === 'profile') {
        document.getElementById('pageProfile').classList.add('active');
        document.querySelectorAll('.bottom-tab')[4].classList.add('active');
        renderHoldings();
    }
}

// ==================== 初始化 ====================
window.onload = async function() {
    // 记录访问
    const stats = Storage.recordVisit();
    document.getElementById('todayVisit').textContent = stats.today;
    document.getElementById('totalVisit').textContent = stats.total;
    
    // 初始化默认自选股（如果为空）
    initDefaultWatchlist();
    
    // 默认显示买卖Call策略页面（第1个标签）
    currentTab = 'strategy';
    await renderStrategyPage();
    
    // 检查并提醒可买入/可卖出股票
    await checkAndAlertTradeOpportunities();
    
    // 定时刷新
    setInterval(() => {
        stockDataCache = {}; // 清除缓存
        if (currentTab === 'strategy') renderStrategyPage();
        if (currentTab === 'home') renderHomeList();
        if (currentTab === 'market') renderMarketList();
    }, 60000); // 每分钟刷新
};

// 检查并提醒交易机会
async function checkAndAlertTradeOpportunities() {
    const watchlist = Storage.getWatchlist();
    if (watchlist.length === 0) return;
    
    const buyStocks = [];
    const sellStocks = [];
    
    for (const code of watchlist) {
        const stock = A_STOCKS.find(s => s.code === code);
        if (!stock) continue;
        
        const data = await fetchStockData(code);
        if (!data) continue;
        
        if (data.status === 'buy') {
            buyStocks.push({ name: stock.name, code: code, price: data.currentPrice, target: data.buyPrice });
        } else if (data.status === 'sell') {
            sellStocks.push({ name: stock.name, code: code, price: data.currentPrice, target: data.sellPrice });
        }
    }
    
    if (buyStocks.length === 0 && sellStocks.length === 0) return;
    
    // 构建弹窗内容
    let alertHtml = '<div style="text-align:left;max-height:300px;overflow-y:auto;">';
    
    if (buyStocks.length > 0) {
        alertHtml += `<div style="margin-bottom:12px;"><div style="color:#52c41a;font-weight:600;margin-bottom:8px;font-size:16px;">建议买入 (${buyStocks.length}只)</div>`;
        buyStocks.forEach(s => {
            alertHtml += `<div style="color:#52c41a;margin:4px 0;font-size:14px;">• ${s.name}(${s.code}) ¥${s.price.toFixed(2)} / 目标¥${s.target.toFixed(2)}</div>`;
        });
        alertHtml += '</div>';
    }
    
    if (sellStocks.length > 0) {
        alertHtml += `<div><div style="color:#f5222d;font-weight:600;margin-bottom:8px;font-size:16px;">建议卖出 (${sellStocks.length}只)</div>`;
        sellStocks.forEach(s => {
            alertHtml += `<div style="color:#f5222d;margin:4px 0;font-size:14px;">• ${s.name}(${s.code}) ¥${s.price.toFixed(2)} / 目标¥${s.target.toFixed(2)}</div>`;
        });
        alertHtml += '</div>';
    }
    
    alertHtml += '</div>';
    
    // 创建自定义弹窗
    const modal = document.createElement('div');
    modal.id = 'tradeAlertModal';
    modal.innerHTML = `
        <div style="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;" onclick="if(event.target===this)document.getElementById('tradeAlertModal').remove()">
            <div style="background:white;border-radius:16px;padding:24px;max-width:400px;width:100%;box-shadow:0 8px 32px rgba(0,0,0,0.2);">
                <div style="font-size:18px;font-weight:600;margin-bottom:16px;text-align:center;color:#262626;">交易提醒</div>
                ${alertHtml}
                <button onclick="document.getElementById('tradeAlertModal').remove()" style="width:100%;padding:12px;background:#1890ff;color:white;border:none;border-radius:8px;font-size:16px;margin-top:16px;cursor:pointer;">知道了</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 初始化默认自选股
function initDefaultWatchlist() {
    const watchlist = Storage.getWatchlist();
    if (watchlist.length === 0) {
        // 添加默认股票：皖能电力、金螳螂、招商银行、中国广核、天康生物
        const defaultStocks = ['000543', '002081', '600036', '003816', '002100'];
        defaultStocks.forEach(code => Storage.addToWatchlist(code));
        console.log('已添加默认自选股:', defaultStocks);
    }
}

// 窗口大小改变时调整图表
window.addEventListener('resize', () => {
    if (detailChart) detailChart.resize();
});

// ==================== 全局刷新功能 ====================
let isRefreshing = false;

async function refreshAllData() {
    if (isRefreshing) return;
    
    isRefreshing = true;
    const btn = document.getElementById('globalRefreshBtn');
    btn.classList.add('spinning');
    btn.disabled = true;
    
    // 清除缓存
    stockDataCache = {};
    
    // 根据当前页面刷新对应数据
    try {
        if (currentTab === 'home') {
            await renderHomeList();
        } else if (currentTab === 'market') {
            await renderMarketList();
        } else if (currentTab === 'strategy') {
            await renderStrategyPage();
        } else if (currentTab === 'profile') {
            await renderHoldings();
        }
        
        // 显示刷新成功提示
        showToast('数据已刷新', 'success');
    } catch (e) {
        console.error('刷新失败:', e);
        showToast('刷新失败，请重试', 'error');
    } finally {
        isRefreshing = false;
        btn.classList.remove('spinning');
        btn.disabled = false;
    }
}

// Toast提示
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? '#52c41a' : type === 'error' ? '#f5222d' : '#1890ff';
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${bgColor};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: fadeInDown 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOutUp 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInDown {
        from { opacity: 0; transform: translate(-50%, -20px); }
        to { opacity: 1; transform: translate(-50%, 0); }
    }
    @keyframes fadeOutUp {
        from { opacity: 1; transform: translate(-50%, 0); }
        to { opacity: 0; transform: translate(-50%, -20px); }
    }
`;
document.head.appendChild(style);

// ==================== 买卖Call策略中心 ====================
let strategyFilter = 'all';
let currentStrategyStock = null;
let currentLogicStock = null; // 当前查看逻辑的股票

// 买卖Call策略Storage
const StrategyStorage = {
    // 获取波段持仓
    getBandHoldings() {
        return JSON.parse(localStorage.getItem('bandHoldings') || '[]');
    },
    
    // 保存波段持仓
    setBandHoldings(holdings) {
        localStorage.setItem('bandHoldings', JSON.stringify(holdings));
    },
    
    // 添加波段持仓
    addBandHolding(code, shares, buyPrice, stopLoss) {
        const holdings = this.getBandHoldings();
        const existing = holdings.find(h => h.code === code);
        if (existing) {
            existing.shares += shares;
            existing.buyPrice = (existing.buyPrice * existing.shares + buyPrice * shares) / (existing.shares + shares);
        } else {
            holdings.push({ code, shares, buyPrice, stopLoss, buyTime: Date.now() });
        }
        this.setBandHoldings(holdings);
    },
    
    // 减少/清除波段持仓
    reduceBandHolding(code, shares) {
        const holdings = this.getBandHoldings();
        const idx = holdings.findIndex(h => h.code === code);
        if (idx > -1) {
            holdings[idx].shares -= shares;
            if (holdings[idx].shares <= 0) {
                holdings.splice(idx, 1);
            }
            this.setBandHoldings(holdings);
        }
    }
};

// 分析股票买卖Call信号（模拟数据，实际应从API获取）
function analyzeStockSignal(stock, data) {
    // 模拟MACD和BOLL分析
    // 实际项目中这里应该调用API获取月线MACD和日线/周线BOLL数据
    
    const currentPrice = data.currentPrice;
    const ma250 = data.ma250;
    
    // 模拟判断逻辑
    const isMacdBullish = currentPrice > ma250; // 价格在MA250上方视为出坑
    const isBuyPos = currentPrice <= ma250 * 1.05; // 价格在MA250附近5%视为下轨
    const isSellPos = currentPrice >= ma250 * 1.3; // 价格高于MA250 30%视为上轨
    const isMoonDraw = currentPrice < ma250 * 0.9; // 价格低于MA250 10%视为月下吸
    
    // 综合得分
    let score = 50;
    if (isMacdBullish) score += 20;
    if (isBuyPos) score += 15;
    if (!isMoonDraw) score += 15;
    
    // 判断信号
    let signal = 'hold';
    if (isMoonDraw) {
        signal = 'forbidden'; // 月下吸禁止操作
    } else if (isMacdBullish && isBuyPos && score >= 70) {
        signal = 'buy'; // 买入Call
    } else if (isSellPos) {
        signal = 'sell'; // 卖出Call
    }
    
    return {
        signal,
        score,
        isMacdBullish,
        isBuyPos,
        isSellPos,
        isMoonDraw,
        suggestBuyPrice: ma250 * 0.95,
        suggestSellPrice: ma250 * 1.25,
        stopLoss: ma250 * 0.92
    };
}

// 渲染买卖Call策略页面
async function renderStrategyPage() {
    const watchlist = Storage.getWatchlist();
    const container = document.getElementById('strategyStockList');
    
    // 如果没有自选股，显示引导添加的提示
    if (watchlist.length === 0) {
        container.innerHTML = `
            <div class="empty-state" style="padding: 40px 20px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 16px;">📋</div>
                <div style="font-size: 16px; font-weight: 600; color: #262626; margin-bottom: 8px;">暂无自选股票</div>
                <div style="font-size: 14px; color: #8c8c8c; margin-bottom: 20px;">
                    买卖Call策略需要基于您的自选股进行分析<br>
                    请先添加股票到自选列表
                </div>
                <button onclick="switchTab('home')" style="padding: 12px 24px; background: #1890ff; color: white; border: none; border-radius: 8px; font-size: 14px; cursor: pointer;">
                    去添加自选股 →
                </button>
            </div>
        `;
        // 清空策略总览
        resetStrategyOverview();
        // 清空持仓显示
        document.getElementById('strategyBandHoldings').innerHTML = '<div class="empty-state" style="padding: 20px;">暂无波段持仓</div>';
        document.getElementById('strategyBaseHoldings').innerHTML = '<div class="empty-state" style="padding: 20px;">暂无底仓持仓</div>';
        return;
    }
    
    // 显示加载状态
    container.innerHTML = `
        <div class="empty-state" style="padding: 60px 20px; text-align: center;">
            <div class="loading-spinner large" style="margin-bottom: 16px;"></div>
            <div style="font-size: 14px; color: #8c8c8c;">正在分析买卖Call信号...</div>
        </div>
    `;
    
    const analyzedStocks = [];
    for (const code of watchlist) {
        const stock = A_STOCKS.find(s => s.code === code);
        if (!stock) continue;
        
        const data = await fetchStockData(code);
        if (!data) continue;
        
        const signal = analyzeStockSignal(stock, data);
        const hasBaseHolding = Storage.getWatchlistHolding(code);
        const hasBandHolding = StrategyStorage.getBandHoldings().find(h => h.code === code);
        
        analyzedStocks.push({ stock, data, signal, hasBaseHolding, hasBandHolding });
    }
    
    // 更新策略总览
    updateStrategyOverview(analyzedStocks);
    
    // 筛选
    let filtered = analyzedStocks;
    if (strategyFilter === 'buy') filtered = analyzedStocks.filter(s => s.signal.signal === 'buy');
    if (strategyFilter === 'sell') filtered = analyzedStocks.filter(s => s.signal.signal === 'sell');
    if (strategyFilter === 'hold') filtered = analyzedStocks.filter(s => s.signal.signal === 'hold' || s.signal.signal === 'forbidden');
    
    // 按得分排序
    filtered.sort((a, b) => b.signal.score - a.signal.score);
    
    container.innerHTML = filtered.map(item => renderStrategyStockItem(item)).join('');
    
    // 渲染持仓
    renderStrategyHoldings(analyzedStocks);
}

// 更新策略总览
function updateStrategyOverview(analyzedStocks) {
    const tradeable = analyzedStocks.filter(s => s.signal.signal === 'buy' || s.signal.signal === 'sell');
    const forbidden = analyzedStocks.filter(s => s.signal.signal === 'forbidden');
    const macdBullish = analyzedStocks.filter(s => s.signal.isMacdBullish).length;
    
    document.getElementById('strategyMacdStatus').textContent = macdBullish > analyzedStocks.length / 2 ? '✅ 出坑' : '⚠️ 震荡';
    document.getElementById('strategyTradeableCount').textContent = tradeable.length + ' 只';
    document.getElementById('strategyForbiddenCount').textContent = forbidden.length + ' 只';
    
    let suggestion = '观望等待';
    if (tradeable.length > 0) {
        const buyCount = analyzedStocks.filter(s => s.signal.signal === 'buy').length;
        const sellCount = analyzedStocks.filter(s => s.signal.signal === 'sell').length;
        if (buyCount > sellCount) suggestion = '轻仓波段，逢低买入';
        else if (sellCount > buyCount) suggestion = '获利了结，减仓观望';
        else suggestion = '平衡操作，高抛低吸';
    }
    document.getElementById('strategySuggestion').textContent = suggestion;
}

// 重置策略总览（无自选股时）
function resetStrategyOverview() {
    document.getElementById('strategyMacdStatus').textContent = '--';
    document.getElementById('strategyTradeableCount').textContent = '--';
    document.getElementById('strategyForbiddenCount').textContent = '--';
    document.getElementById('strategySuggestion').textContent = '请先添加自选股';
}

// 渲染策略股票项
function renderStrategyStockItem({ stock, data, signal, hasBaseHolding, hasBandHolding }) {
    const signalText = {
        buy: '🟢 买入Call',
        sell: '🔴 卖出Call',
        hold: '⚪ 持有观望',
        forbidden: '⚫ 禁止操作'
    };
    
    const signalClass = {
        buy: 'status-tag-buy',
        sell: 'status-tag-sell',
        hold: 'status-tag-hold',
        forbidden: 'status-tag-forbidden'
    };
    
    // 计算股息信息
    const dividend = stock.dividend || 0;
    const dividendYield = Algorithm.calculateDividendYield(dividend, data.currentPrice);
    const isDividendStock = Algorithm.isDividendStock(dividendYield);
    
    const btnHtml = signal.signal === 'buy' ? 
        `<button onclick="openBuyCallModal('${stock.code}')" style="padding: 6px 12px; background: #52c41a; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">买入</button>` :
        signal.signal === 'sell' && hasBandHolding ?
        `<button onclick="openSellCallModal('${stock.code}')" style="padding: 6px 12px; background: #f5222d; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">卖出</button>` :
        `<button disabled style="padding: 6px 12px; background: #d9d9d9; color: #999; border: none; border-radius: 4px; font-size: 12px;">--</button>`;
    
    // 股息标签
    const dividendTagHtml = dividend > 0 ? `
        <span style="display: inline-flex; align-items: center; gap: 4px; font-size: 10px; padding: 2px 6px; border-radius: 4px; background: ${isDividendStock ? '#f6ffed' : '#f5f5f5'}; color: ${isDividendStock ? '#52c41a' : '#999'}; border: 1px solid ${isDividendStock ? '#b7eb8f' : '#d9d9d9'}; margin-left: 4px;">
            💰${dividendYield.toFixed(2)}%
        </span>
    ` : '';
    
    return `
        <div class="stock-item" style="margin-bottom: 10px;">
            <div class="stock-header">
                <div>
                    <span class="stock-name">${stock.name}</span>
                    <span class="stock-code">${stock.code}</span>
                    ${dividendTagHtml}
                    ${hasBaseHolding ? '<span style="font-size: 10px; color: #1890ff; margin-left: 4px;">📌底仓</span>' : ''}
                    ${hasBandHolding ? '<span style="font-size: 10px; color: #52c41a; margin-left: 4px;">📈波段</span>' : ''}
                </div>
                <div style="text-align: right;">
                    <span class="status-tag ${signalClass[signal.signal]}">${signalText[signal.signal]}</span>
                    <div style="font-size: 10px; color: #8c8c8c; margin-top: 4px;">得分: ${signal.score}</div>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; padding-top: 10px; border-top: 1px solid #f0f0f0;">
                <div style="font-size: 14px;">
                    <span style="color: #8c8c8c;">现价: </span>
                    <span style="font-weight: 600;">¥${data.currentPrice.toFixed(2)}</span>
                </div>
                <div style="font-size: 12px; color: #8c8c8c;">
                    建议买: <span style="color: #52c41a;">¥${signal.suggestBuyPrice.toFixed(2)}</span> | 
                    建议卖: <span style="color: #f5222d;">¥${signal.suggestSellPrice.toFixed(2)}</span>
                </div>
                ${btnHtml}
            </div>
        </div>
    `;
}

// 渲染策略持仓
async function renderStrategyHoldings(analyzedStocks) {
    // 波段持仓
    const bandHoldings = StrategyStorage.getBandHoldings();
    const bandContainer = document.getElementById('strategyBandHoldings');
    
    if (bandHoldings.length === 0) {
        bandContainer.innerHTML = '<div class="empty-state" style="padding: 20px;">暂无波段持仓</div>';
    } else {
        const html = [];
        for (const holding of bandHoldings) {
            const stock = A_STOCKS.find(s => s.code === holding.code);
            const data = await fetchStockData(holding.code);
            if (!data) continue;
            
            const value = data.currentPrice * holding.shares;
            const cost = holding.buyPrice * holding.shares;
            const profit = value - cost;
            const profitPercent = (profit / cost) * 100;
            const profitClass = profit >= 0 ? 'positive' : 'negative';
            const profitSign = profit >= 0 ? '+' : '';
            
            html.push(`
                <div class="holding-item" style="margin-bottom: 8px;">
                    <div class="holding-header">
                        <div>
                            <span class="holding-name">${stock?.name || holding.code}</span>
                            <span style="color: #999; font-size: 12px;">${holding.code}</span>
                        </div>
                        <div class="holding-profit ${profitClass}">${profitSign}${profitPercent.toFixed(2)}%</div>
                    </div>
                    <div class="holding-grid" style="grid-template-columns: repeat(4, 1fr);">
                        <div><div class="label">成本</div><div>¥${holding.buyPrice.toFixed(2)}</div></div>
                        <div><div class="label">现价</div><div>¥${data.currentPrice.toFixed(2)}</div></div>
                        <div><div class="label">股数</div><div>${holding.shares}</div></div>
                        <div><div class="label">盈亏</div><div class="${profitClass}">${profitSign}¥${profit.toFixed(0)}</div></div>
                    </div>
                    <div style="margin-top: 8px; display: flex; gap: 8px;">
                        <button onclick="openSellCallModal('${holding.code}')" style="flex: 1; padding: 8px; background: #f5222d; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">卖出平仓</button>
                        <button onclick="updateStopLoss('${holding.code}')" style="padding: 8px 12px; background: #faad14; color: white; border: none; border-radius: 4px; font-size: 12px; cursor: pointer;">更新止损</button>
                    </div>
                </div>
            `);
        }
        bandContainer.innerHTML = html.join('');
    }
    
    // 底仓持仓（只读）
    const baseHoldings = Storage.getAllWatchlistHoldings();
    const baseContainer = document.getElementById('strategyBaseHoldings');
    
    if (baseHoldings.length === 0) {
        baseContainer.innerHTML = '<div class="empty-state" style="padding: 20px;">暂无底仓持仓</div>';
    } else {
        const html = [];
        for (const holding of baseHoldings) {
            const stock = A_STOCKS.find(s => s.code === holding.code);
            const data = await fetchStockData(holding.code);
            if (!data) continue;
            
            const value = data.currentPrice * holding.shares;
            const cost = holding.costPrice * holding.shares;
            const profit = value - cost;
            const profitPercent = (profit / cost) * 100;
            const profitClass = profit >= 0 ? 'positive' : 'negative';
            const profitSign = profit >= 0 ? '+' : '';
            
            html.push(`
                <div class="holding-item" style="margin-bottom: 8px; opacity: 0.8;">
                    <div class="holding-header">
                        <div>
                            <span class="holding-name">${stock?.name || holding.code}</span>
                            <span style="color: #999; font-size: 12px;">${holding.code}</span>
                        </div>
                        <div class="holding-profit ${profitClass}">${profitSign}${profitPercent.toFixed(2)}%</div>
                    </div>
                    <div class="holding-grid" style="grid-template-columns: repeat(3, 1fr);">
                        <div><div class="label">成本</div><div>¥${holding.costPrice.toFixed(2)}</div></div>
                        <div><div class="label">现价</div><div>¥${data.currentPrice.toFixed(2)}</div></div>
                        <div><div class="label">盈亏</div><div class="${profitClass}">${profitSign}¥${profit.toFixed(0)}</div></div>
                    </div>
                </div>
            `);
        }
        baseContainer.innerHTML = html.join('');
    }
}

// 筛选策略股票
function filterStrategyStocks(type) {
    strategyFilter = type;
    document.querySelectorAll('#pageStrategy .filter-tab').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderStrategyPage();
}

// 打开买入Call弹窗
async function openBuyCallModal(code) {
    currentStrategyStock = code;
    const stock = A_STOCKS.find(s => s.code === code);
    const data = await fetchStockData(code);
    const signal = analyzeStockSignal(stock, data);
    
    const content = document.getElementById('buyCallContent');
    content.innerHTML = `
        <div style="margin-bottom: 16px;">
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 4px;">${stock.name} (${code})</div>
            <div style="color: #8c8c8c; font-size: 12px;">当前价: ¥${data.currentPrice.toFixed(2)}</div>
        </div>
        <div class="input-group" style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #666; margin-bottom: 6px;">买入股数</label>
            <input type="number" id="bandBuyShares" value="1000" step="100" style="width: 100%; padding: 12px; border: 1px solid #d9d9d9; border-radius: 8px;">
        </div>
        <div class="input-group" style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #666; margin-bottom: 6px;">买入价格（建议: ¥${signal.suggestBuyPrice.toFixed(2)}）</label>
            <input type="number" id="bandBuyPrice" value="${data.currentPrice.toFixed(2)}" step="0.01" style="width: 100%; padding: 12px; border: 1px solid #d9d9d9; border-radius: 8px;">
        </div>
        <div class="input-group" style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #666; margin-bottom: 6px;">止损价格（建议: ¥${signal.stopLoss.toFixed(2)}）</label>
            <input type="number" id="bandStopLoss" value="${signal.stopLoss.toFixed(2)}" step="0.01" style="width: 100%; padding: 12px; border: 1px solid #d9d9d9; border-radius: 8px;">
        </div>
        <div style="background: #fff7e6; padding: 12px; border-radius: 8px; font-size: 12px; color: #d46b08;">
            💡 提示：波段仓位建议不超过总资金30%，到达周线上轨或触发止损时请果断卖出
        </div>
    `;
    
    document.getElementById('buyCallModal').style.display = 'flex';
}

// 关闭买入Call弹窗
function closeBuyCallModal() {
    document.getElementById('buyCallModal').style.display = 'none';
    currentStrategyStock = null;
}

// 打开信号解释弹窗（通用）
function openSignalExplainModal(code) {
    currentLogicStock = code;
    const stock = A_STOCKS.find(s => s.code === code);
    const data = stockDataCache[code] || {};
    const analysis = analyzeStockForDisplay(stock, data);
    
    const currentPrice = analysis.currentPrice.toFixed(2);
    const ma250 = analysis.ma250.toFixed(2);
    const suggestBuyPrice = analysis.suggestBuyPrice.toFixed(2);
    const suggestSellPrice = analysis.suggestSellPrice.toFixed(2);
    const dividendYield = analysis.dividendYield.toFixed(2);
    
    // 根据信号类型设置弹窗样式和内容
    const signalConfig = {
        buy: {
            title: '🟢 建议买入',
            color: '#52c41a',
            bgColor: '#f6ffed',
            borderColor: '#b7eb8f',
            explanation: '股价处于低位，MACD趋势向好，适合买入建仓',
            conditions: [
                { name: 'MACD出坑', check: analysis.isMacdBullish, desc: `股价¥${currentPrice} > MA250 ¥${ma250}` },
                { name: '价格低位', check: analysis.isBuyPos, desc: `股价¥${currentPrice} ≤ MA250×1.05 (¥${(analysis.ma250 * 1.05).toFixed(2)})` },
                { name: '得分达标', check: analysis.score >= 70, desc: `当前得分${analysis.score.toFixed(1)} ≥ 70分` },
                { name: '非月下吸', check: !analysis.isMoonDraw, desc: `股价¥${currentPrice} ≥ MA250×0.9 (¥${(analysis.ma250 * 0.9).toFixed(2)})` }
            ],
            actionBtn: '<button onclick="openBuyCallModalFromLogic()" style="flex: 1; padding: 12px; background: #52c41a; color: white; border: none; border-radius: 8px; cursor: pointer;">立即买入</button>'
        },
        sell: {
            title: '🔴 建议卖出',
            color: '#f5222d',
            bgColor: '#fff2f0',
            borderColor: '#ffa39e',
            explanation: '股价处于高位，达到建议卖出价位，适合获利了结',
            conditions: [
                { name: '价格高位', check: analysis.isSellPos, desc: `股价¥${currentPrice} ≥ MA250×1.3 (¥${(analysis.ma250 * 1.3).toFixed(2)})` },
                { name: '接近卖出价', check: analysis.currentPrice >= analysis.suggestSellPrice * 0.95, desc: `当前价接近建议卖出价¥${suggestSellPrice}` },
                { name: '趋势可能反转', check: true, desc: '股价已大幅上涨，注意回调风险' }
            ],
            actionBtn: ''
        },
        forbidden: {
            title: '⚫ 禁止操作',
            color: '#999',
            bgColor: '#f5f5f5',
            borderColor: '#d9d9d9',
            explanation: '股价处于超跌状态（月下吸），此时买入风险极高，建议观望',
            conditions: [
                { name: '月下吸状态', check: analysis.isMoonDraw, desc: `股价¥${currentPrice} < MA250×0.9 (¥${(analysis.ma250 * 0.9).toFixed(2)})` },
                { name: '超跌风险', check: true, desc: '股价严重低于年线，可能继续下跌' },
                { name: '建议观望', check: true, desc: '等待股价企稳后再考虑操作' }
            ],
            actionBtn: ''
        },
        hold: {
            title: '⚪ 持有观望',
            color: '#faad14',
            bgColor: '#fffbe6',
            borderColor: '#ffe58f',
            explanation: '股价处于中间位置，不满足买入或卖出条件，建议继续持有或观望',
            conditions: [
                { name: '价格中等', check: !analysis.isBuyPos && !analysis.isSellPos, desc: `股价¥${currentPrice} 在买入价和卖出价之间` },
                { name: '趋势不明', check: !analysis.isMacdBullish || analysis.score < 70, desc: analysis.isMacdBullish ? `得分${analysis.score.toFixed(1)} < 70，未达买入标准` : 'MACD未出坑，趋势不明' },
                { name: '建议观望', check: true, desc: '等待更好的买卖点出现' }
            ],
            actionBtn: ''
        }
    };
    
    const config = signalConfig[analysis.signal] || signalConfig.hold;
    
    // 计算得分详情
    const scoreDetails = [];
    scoreDetails.push({ name: '基础分', score: 50, passed: true, desc: '初始得分' });
    scoreDetails.push({ name: 'MACD出坑', score: analysis.isMacdBullish ? 20 : 0, passed: analysis.isMacdBullish, desc: analysis.isMacdBullish ? '趋势向好' : '趋势未出坑' });
    scoreDetails.push({ name: '价格低位', score: analysis.isBuyPos ? 15 : 0, passed: analysis.isBuyPos, desc: analysis.isBuyPos ? '价格处于低位' : '价格偏高' });
    scoreDetails.push({ name: '非月下吸', score: !analysis.isMoonDraw ? 15 : 0, passed: !analysis.isMoonDraw, desc: analysis.isMoonDraw ? '月下吸状态⚠️' : '非超跌状态' });
    scoreDetails.push({ name: '红利票加分', score: analysis.isDividendStock ? 10 : 0, passed: analysis.isDividendStock, desc: analysis.isDividendStock ? `股息率${dividendYield}% ≥ 3%` : '非红利票' });
    
    // 设置标题
    document.getElementById('signalExplainTitle').textContent = config.title;
    document.getElementById('signalExplainTitle').style.color = config.color;
    
    // 设置内容
    const content = document.getElementById('signalExplainContent');
    content.innerHTML = `
        <div style="margin-bottom: 20px;">
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">${stock.name} (${code})</div>
            <div style="font-size: 28px; font-weight: 700; color: ${config.color}; margin-bottom: 4px;">
                ${analysis.signalText}
            </div>
            <div style="font-size: 13px; color: #8c8c8c; margin-top: 8px; padding: 10px; background: ${config.bgColor}; border-radius: 6px; border-left: 3px solid ${config.borderColor};">
                ${config.explanation}
            </div>
        </div>
        
        <div style="background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: 600; color: #389e0d; margin-bottom: 8px;">📊 关键指标</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
                <div>当前价: <strong>¥${currentPrice}</strong></div>
                <div>MA250: <strong>¥${ma250}</strong></div>
                <div>建议买入: <strong style="color: #52c41a;">¥${suggestBuyPrice}</strong></div>
                <div>建议卖出: <strong style="color: #f5222d;">¥${suggestSellPrice}</strong></div>
                <div>综合得分: <strong>${analysis.score.toFixed(1)}分</strong></div>
                <div>股息率: <strong>${dividendYield}%</strong></div>
            </div>
        </div>
        
        <div style="font-size: 13px; font-weight: 600; margin-bottom: 12px;">📝 信号判断条件</div>
        <div style="margin-bottom: 16px;">
            ${config.conditions.map(cond => `
                <div style="display: flex; align-items: flex-start; padding: 10px 12px; background: ${cond.check ? '#f6ffed' : '#f5f5f5'}; border-radius: 8px; margin-bottom: 8px; border-left: 3px solid ${cond.check ? '#52c41a' : '#d9d9d9'};">
                    <div style="flex: 1;">
                        <div style="font-size: 13px; font-weight: 500; color: ${cond.check ? '#262626' : '#8c8c8c'};">
                            ${cond.check ? '✅' : '❌'} ${cond.name}
                        </div>
                        <div style="font-size: 11px; color: #8c8c8c; margin-top: 2px;">${cond.desc}</div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div style="font-size: 13px; font-weight: 600; margin-bottom: 12px;">📈 得分构成</div>
        <div style="margin-bottom: 16px;">
            ${scoreDetails.map(item => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: ${item.passed ? '#f6ffed' : '#f5f5f5'}; border-radius: 6px; margin-bottom: 6px;">
                    <span style="font-size: 12px; color: ${item.passed ? '#262626' : '#8c8c8c'};">${item.passed ? '✅' : '❌'} ${item.name}</span>
                    <span style="font-size: 12px; font-weight: 600; color: ${item.passed ? '#52c41a' : '#999'};">+${item.score}分</span>
                </div>
            `).join('')}
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 12px; background: #e6f7ff; border-radius: 6px; margin-top: 8px;">
                <span style="font-size: 13px; font-weight: 600; color: #096dd9;">综合得分</span>
                <span style="font-size: 16px; font-weight: 700; color: #096dd9;">${analysis.score.toFixed(1)}分</span>
            </div>
        </div>
        
        <div style="padding: 12px; background: #f6ffed; border-radius: 8px; font-size: 12px; color: #389e0d;">
            <strong>💡 操作提示：</strong><br>
            ${analysis.signal === 'buy' ? '当前处于买入区间，可考虑分批建仓' : ''}
            ${analysis.signal === 'sell' ? '当前处于卖出区间，可考虑获利了结' : ''}
            ${analysis.signal === 'forbidden' ? '当前处于超跌状态，建议观望等待' : ''}
            ${analysis.signal === 'hold' ? '当前无明确信号，建议持有或观望' : ''}
        </div>
    `;
    
    // 设置按钮
    const actionsDiv = document.getElementById('signalExplainActions');
    actionsDiv.innerHTML = `
        <button onclick="closeSignalExplainModal()" style="flex: 1; padding: 12px; background: #f5f5f5; border: none; border-radius: 8px; cursor: pointer;">关闭</button>
        ${config.actionBtn}
    `;
    
    document.getElementById('signalExplainModal').style.display = 'flex';
}

// 关闭信号解释弹窗
function closeSignalExplainModal() {
    document.getElementById('signalExplainModal').style.display = 'none';
    currentLogicStock = null;
}

// 从逻辑弹窗打开买入弹窗
function openBuyCallModalFromLogic() {
    if (currentLogicStock) {
        closeSignalExplainModal();
        openBuyCallModal(currentLogicStock);
    }
}

// 打开得分详情弹窗
function openScoreDetailModal(code) {
    const stock = A_STOCKS.find(s => s.code === code);
    const data = stockDataCache[code] || {};
    const analysis = analyzeStockForDisplay(stock, data);
    
    const currentPrice = analysis.currentPrice.toFixed(2);
    const ma250 = analysis.ma250.toFixed(2);
    const dividendYield = analysis.dividendYield.toFixed(2);
    
    // 计算各项得分详情
    const scoreDetails = [];
    let currentScore = 50;
    
    scoreDetails.push({ name: '基础分', score: 50, current: 50, passed: true, desc: '初始得分，所有股票起始50分' });
    
    if (analysis.isMacdBullish) {
        currentScore += 20;
        scoreDetails.push({ 
            name: 'MACD出坑', 
            score: 20, 
            current: currentScore,
            passed: true, 
            desc: `当前价¥${currentPrice} > MA250 ¥${ma250}，趋势向好` 
        });
    } else {
        scoreDetails.push({ 
            name: 'MACD出坑', 
            score: 0, 
            current: currentScore,
            passed: false, 
            desc: `当前价¥${currentPrice} ≤ MA250 ¥${ma250}，趋势未出坑` 
        });
    }
    
    if (analysis.isBuyPos) {
        currentScore += 15;
        scoreDetails.push({ 
            name: '价格低位', 
            score: 15, 
            current: currentScore,
            passed: true, 
            desc: `当前价¥${currentPrice} ≤ MA250×1.05 = ¥${(analysis.ma250 * 1.05).toFixed(2)}，处于低位` 
        });
    } else {
        scoreDetails.push({ 
            name: '价格低位', 
            score: 0, 
            current: currentScore,
            passed: false, 
            desc: `当前价¥${currentPrice} > MA250×1.05 = ¥${(analysis.ma250 * 1.05).toFixed(2)}，价格偏高` 
        });
    }
    
    if (!analysis.isMoonDraw) {
        currentScore += 15;
        scoreDetails.push({ 
            name: '非月下吸', 
            score: 15, 
            current: currentScore,
            passed: true, 
            desc: `当前价¥${currentPrice} ≥ MA250×0.9 = ¥${(analysis.ma250 * 0.9).toFixed(2)}，非超跌状态` 
        });
    } else {
        scoreDetails.push({ 
            name: '非月下吸', 
            score: 0, 
            current: currentScore,
            passed: false, 
            desc: `当前价¥${currentPrice} < MA250×0.9 = ¥${(analysis.ma250 * 0.9).toFixed(2)}，月下吸状态禁止买入` 
        });
    }
    
    if (analysis.isDividendStock) {
        currentScore += 10;
        scoreDetails.push({ 
            name: '红利票加分', 
            score: 10, 
            current: currentScore,
            passed: true, 
            desc: `股息率${dividendYield}% ≥ 3%，属于红利低波票` 
        });
    } else if (analysis.dividend > 0) {
        scoreDetails.push({ 
            name: '红利票加分', 
            score: 0, 
            current: currentScore,
            passed: false, 
            desc: `股息率${dividendYield}% < 3%，不属于红利票` 
        });
    } else {
        scoreDetails.push({ 
            name: '红利票加分', 
            score: 0, 
            current: currentScore,
            passed: false, 
            desc: `无股息数据` 
        });
    }
    
    // 判断信号
    let signalText = '持有观望';
    let signalColor = '#faad14';
    if (analysis.signal === 'buy') {
        signalText = '建议买入';
        signalColor = '#52c41a';
    } else if (analysis.signal === 'sell') {
        signalText = '建议卖出';
        signalColor = '#f5222d';
    } else if (analysis.signal === 'forbidden') {
        signalText = '禁止操作';
        signalColor = '#999';
    }
    
    const content = document.getElementById('scoreDetailContent');
    content.innerHTML = `
        <div style="margin-bottom: 20px;">
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">${stock.name} (${code})</div>
            <div style="display: flex; align-items: baseline; gap: 12px;">
                <div style="font-size: 36px; font-weight: 700; color: ${signalColor};">${currentScore}</div>
                <div style="font-size: 14px; color: #8c8c8c;">综合得分</div>
            </div>
            <div style="font-size: 13px; color: ${signalColor}; font-weight: 500; margin-top: 4px;">
                当前信号: ${signalText}
            </div>
        </div>
        
        <div style="background: #f6ffed; border: 1px solid #b7eb8f; border-radius: 8px; padding: 12px; margin-bottom: 16px;">
            <div style="font-size: 13px; font-weight: 600; color: #389e0d; margin-bottom: 8px;">📊 关键指标</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
                <div>当前价: <strong>¥${currentPrice}</strong></div>
                <div>MA250: <strong>¥${ma250}</strong></div>
                <div>建议买入: <strong style="color: #52c41a;">¥${analysis.suggestBuyPrice.toFixed(2)}</strong></div>
                <div>建议卖出: <strong style="color: #f5222d;">¥${analysis.suggestSellPrice.toFixed(2)}</strong></div>
                <div>股息率: <strong>${dividendYield}%</strong></div>
                <div>股息: <strong>¥${(analysis.dividend || 0).toFixed(3)}/股</strong></div>
            </div>
        </div>
        
        <div style="font-size: 13px; font-weight: 600; margin-bottom: 12px;">📝 得分计算过程</div>
        <div style="space-y: 8px;">
            ${scoreDetails.map((item, index) => `
                <div style="display: flex; align-items: center; padding: 12px; background: ${item.passed ? '#f6ffed' : '#f5f5f5'}; border-radius: 8px; margin-bottom: 8px; border-left: 3px solid ${item.passed ? '#52c41a' : '#d9d9d9'};">
                    <div style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 13px; font-weight: 500; color: ${item.passed ? '#262626' : '#8c8c8c'};">
                                ${index + 1}. ${item.name}
                            </span>
                            <span style="font-size: 14px; font-weight: 600; color: ${item.passed ? '#52c41a' : '#999'};">
                                +${item.score}分
                            </span>
                        </div>
                        <div style="font-size: 11px; color: #8c8c8c; margin-top: 4px;">${item.desc}</div>
                        <div style="font-size: 11px; color: #1890ff; margin-top: 2px;">累计: ${item.current}分</div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div style="margin-top: 16px; padding: 12px; background: #e6f7ff; border-radius: 8px; font-size: 12px; color: #096dd9;">
            <strong>💡 得分计算公式：</strong><br>
            综合得分 = 基础分(50) + MACD出坑(20) + 价格低位(15) + 非月下吸(15) + 红利票(10)<br><br>
            <strong>信号判断：</strong><br>
            • 买入：得分≥70 + MACD出坑 + 价格低位<br>
            • 卖出：股价 ≥ MA250×1.3<br>
            • 禁止：股价 < MA250×0.9（月下吸）<br>
            • 观望：其他情况
        </div>
    `;
    
    document.getElementById('scoreDetailModal').style.display = 'flex';
}

// 关闭得分详情弹窗
function closeScoreDetailModal() {
    document.getElementById('scoreDetailModal').style.display = 'none';
}

// ==================== 股票筛选功能 ====================

// 更新筛选条件显示
function updateScreenerFilter() {
    const dividend = document.getElementById('dividendFilter').value;
    document.getElementById('dividendValue').textContent = dividend + '%';
}

// 设置MA250筛选条件
function setMAFilter(type) {
    screenerMAFilter = type;
    document.querySelectorAll('.ma-filter-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = 'white';
        btn.style.color = '#595959';
        btn.style.borderColor = '#d9d9d9';
    });
    event.target.classList.add('active');
    event.target.style.background = '#1890ff';
    event.target.style.color = 'white';
    event.target.style.borderColor = '#1890ff';
}

// 计算长线投资得分
function calculateLongTermScore(stock, data) {
    let score = 0;
    const currentPrice = data.currentPrice || 0;
    const ma250 = data.ma250 || 0;
    const dividend = stock.dividend || 0;
    const dividendYield = ma250 > 0 ? (dividend / currentPrice) * 100 : 0;
    
    // MA250位置评分 (0-30分)
    if (currentPrice > ma250 * 1.05) {
        score += 30; // 明显上方，牛市趋势
    } else if (currentPrice >= ma250 * 0.95) {
        score += 25; // 附近，稳健
    } else if (currentPrice >= ma250 * 0.9) {
        score += 15; // 略低，可能有反弹机会
    } else {
        score += 5; // 明显下方，风险较高
    }
    
    // 股息率评分 (0-30分)
    if (dividendYield >= 5) {
        score += 30; // 高股息
    } else if (dividendYield >= 3) {
        score += 25; // 不错的股息
    } else if (dividendYield >= 2) {
        score += 15; // 一般
    } else {
        score += dividendYield * 3; // 按比例
    }
    
    // 价格评分 (0-20分) - 低价股更友好
    if (currentPrice <= 10) {
        score += 20; // 低价股
    } else if (currentPrice <= 30) {
        score += 15; // 中低价
    } else if (currentPrice <= 50) {
        score += 10; // 中价
    } else {
        score += 5; // 高价股
    }
    
    // 安全性评分 (0-20分)
    if (currentPrice > ma250 * 0.9) {
        score += 20; // 非超跌
    } else if (currentPrice > ma250 * 0.8) {
        score += 10; // 略超跌
    } else {
        score += 0; // 严重超跌
    }
    
    return {
        total: score,
        maScore: currentPrice > ma250 * 1.05 ? 30 : (currentPrice >= ma250 * 0.95 ? 25 : (currentPrice >= ma250 * 0.9 ? 15 : 5)),
        dividendScore: dividendYield >= 5 ? 30 : (dividendYield >= 3 ? 25 : (dividendYield >= 2 ? 15 : Math.min(dividendYield * 3, 10))),
        priceScore: currentPrice <= 10 ? 20 : (currentPrice <= 30 ? 15 : (currentPrice <= 50 ? 10 : 5)),
        safetyScore: currentPrice > ma250 * 0.9 ? 20 : (currentPrice > ma250 * 0.8 ? 10 : 0),
        dividendYield: dividendYield
    };
}

// 运行股票筛选
async function runStockScreener() {
    const minDividend = parseFloat(document.getElementById('dividendFilter').value);
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || 9999;
    const resultList = document.getElementById('screenerResultList');
    const countDiv = document.getElementById('screenerCount');
    
    // 显示加载中
    resultList.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div class="loading-spinner large" style="margin-bottom: 16px;"></div>
            <div style="font-size: 14px; color: #8c8c8c;">正在分析股票数据...</div>
        </div>
    `;
    
    const results = [];
    const batchSize = 10; // 每批处理10只，避免请求过快
    
    for (let i = 0; i < A_STOCKS.length; i += batchSize) {
        const batch = A_STOCKS.slice(i, i + batchSize);
        
        // 并行获取数据
        const batchResults = await Promise.all(batch.map(async stock => {
            const data = await fetchStockData(stock.code);
            if (!data) return null;
            
            const currentPrice = data.currentPrice;
            const ma250 = data.ma250;
            const dividendYield = stock.dividend ? (stock.dividend / currentPrice) * 100 : 0;
            
            // 检查筛选条件
            if (dividendYield < minDividend) return null;
            if (currentPrice < minPrice || currentPrice > maxPrice) return null;
            
            // MA250位置筛选
            let maMatch = false;
            if (screenerMAFilter === 'above' && currentPrice > ma250) maMatch = true;
            else if (screenerMAFilter === 'near' && currentPrice >= ma250 * 0.9 && currentPrice <= ma250 * 1.1) maMatch = true;
            else if (screenerMAFilter === 'below' && currentPrice < ma250 * 0.95) maMatch = true;
            
            if (!maMatch) return null;
            
            // 计算得分
            const score = calculateLongTermScore(stock, data);
            
            return { stock, data, score, dividendYield };
        }));
        
        results.push(...batchResults.filter(r => r !== null));
        
        // 更新进度
        resultList.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div class="loading-spinner large" style="margin-bottom: 16px;"></div>
                <div style="font-size: 14px; color: #8c8c8c;">正在分析... (${Math.min(i + batchSize, A_STOCKS.length)}/${A_STOCKS.length})</div>
                <div style="font-size: 12px; color: #52c41a; margin-top: 8px;">已找到 ${results.length} 只符合条件的股票</div>
            </div>
        `;
    }
    
    // 按总分排序
    results.sort((a, b) => b.score.total - a.score.total);
    
    // 显示结果
    countDiv.textContent = `共 ${results.length} 只`;
    
    if (results.length === 0) {
        resultList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #8c8c8c;">
                <div style="font-size: 48px; margin-bottom: 16px;">😔</div>
                <div style="font-size: 14px;">没有找到符合条件的股票</div>
                <div style="font-size: 12px; margin-top: 8px;">建议放宽筛选条件再试</div>
            </div>
        `;
        return;
    }
    
    resultList.innerHTML = results.map(({ stock, data, score, dividendYield }) => `
        <div style="padding: 12px; background: #f6ffed; border-radius: 8px; margin-bottom: 8px; border-left: 3px solid #52c41a; cursor: pointer;" onclick="openDetail('${stock.code}')">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <div>
                    <span style="font-size: 14px; font-weight: 600;">${stock.name}</span>
                    <span style="font-size: 12px; color: #8c8c8c; margin-left: 4px;">${stock.code}</span>
                </div>
                <div style="font-size: 18px; font-weight: 700; color: #52c41a;">${score.total}分</div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; font-size: 11px; color: #595959;">
                <div>💰 股息: ${dividendYield.toFixed(2)}%</div>
                <div>💵 股价: ¥${data.currentPrice.toFixed(2)}</div>
                <div>📈 MA250: ¥${data.ma250.toFixed(2)}</div>
            </div>
            <div style="margin-top: 8px; display: flex; gap: 4px; flex-wrap: wrap;">
                <span style="padding: 2px 6px; background: white; border-radius: 4px; font-size: 10px;">趋势${score.maScore >= 25 ? '优' : '良'}</span>
                <span style="padding: 2px 6px; background: white; border-radius: 4px; font-size: 10px;">股息${score.dividendScore >= 25 ? '高' : '中'}</span>
                <span style="padding: 2px 6px; background: white; border-radius: 4px; font-size: 10px;">价格${score.priceScore >= 15 ? '低' : '中'}</span>
                <span style="padding: 2px 6px; background: white; border-radius: 4px; font-size: 10px;">安全${score.safetyScore >= 20 ? '高' : '中'}</span>
            </div>
        </div>
    `).join('');
}

// 快速查询股票（用于筛选页面）
async function searchStockForScreener() {
    const input = document.getElementById('screenerSearchInput').value.trim();
    const resultDiv = document.getElementById('screenerSearchResult');
    
    if (!input) {
        resultDiv.innerHTML = '';
        return;
    }
    
    // 查找股票
    const stock = A_STOCKS.find(s => 
        s.code === input || 
        s.name.includes(input)
    );
    
    if (!stock) {
        resultDiv.innerHTML = '<div style="color: #999; font-size: 13px;">未找到股票</div>';
        return;
    }
    
    // 获取数据
    const data = await fetchStockData(stock.code);
    if (!data) {
        resultDiv.innerHTML = '<div style="color: #999; font-size: 13px;">获取数据失败</div>';
        return;
    }
    
    const dividendYield = stock.dividend ? (stock.dividend / data.currentPrice) * 100 : 0;
    const score = calculateLongTermScore(stock, data);
    
    resultDiv.innerHTML = `
        <div style="padding: 12px; background: #f6ffed; border-radius: 8px; border-left: 3px solid #52c41a;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <div>
                    <span style="font-size: 14px; font-weight: 600;">${stock.name}</span>
                    <span style="font-size: 12px; color: #8c8c8c;">${stock.code}</span>
                </div>
                <div style="font-size: 20px; font-weight: 700; color: #52c41a;">${score.total}分</div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px; margin-bottom: 8px;">
                <div>💰 股息率: ${dividendYield.toFixed(2)}%</div>
                <div>💵 当前价: ¥${data.currentPrice.toFixed(2)}</div>
                <div>📈 MA250: ¥${data.ma250.toFixed(2)}</div>
                <div>📊 位置: ${data.currentPrice > data.ma250 ? '上方📈' : (data.currentPrice > data.ma250 * 0.95 ? '附近↔️' : '下方📉')}</div>
            </div>
            <div style="display: flex; gap: 8px;">
                <button onclick="openDetail('${stock.code}')" style="flex: 1; padding: 8px; background: #1890ff; color: white; border: none; border-radius: 6px; font-size: 12px; cursor: pointer;">查看详情</button>
                <button onclick="Storage.addToWatchlist('${stock.code}'); alert('已添加到自选');" style="padding: 8px 12px; background: #52c41a; color: white; border: none; border-radius: 6px; font-size: 12px; cursor: pointer;">+自选</button>
            </div>
        </div>
    `;
}

// 导出筛选配置
function exportScreenerConfig() {
    const config = {
        minDividend: document.getElementById('dividendFilter').value,
        minPrice: document.getElementById('minPrice').value,
        maxPrice: document.getElementById('maxPrice').value,
        maFilter: screenerMAFilter,
        timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `股票筛选配置_${new Date().toLocaleDateString()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('配置已导出！');
}

// 导入筛选配置
function importScreenerConfig() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const config = JSON.parse(e.target.result);
                
                // 应用配置
                if (config.minDividend !== undefined) {
                    document.getElementById('dividendFilter').value = config.minDividend;
                    document.getElementById('dividendValue').textContent = config.minDividend + '%';
                }
                if (config.minPrice !== undefined) document.getElementById('minPrice').value = config.minPrice;
                if (config.maxPrice !== undefined) document.getElementById('maxPrice').value = config.maxPrice;
                if (config.maFilter) {
                    screenerMAFilter = config.maFilter;
                    // 更新按钮样式
                    document.querySelectorAll('.ma-filter-btn').forEach(btn => {
                        btn.classList.remove('active');
                        btn.style.background = 'white';
                        btn.style.color = '#595959';
                        btn.style.borderColor = '#d9d9d9';
                        if (btn.dataset.ma === config.maFilter) {
                            btn.classList.add('active');
                            btn.style.background = '#1890ff';
                            btn.style.color = 'white';
                            btn.style.borderColor = '#1890ff';
                        }
                    });
                }
                
                alert('配置导入成功！');
            } catch (err) {
                alert('配置文件格式错误！');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

// 确认买入Call
function confirmBuyCall() {
    if (!currentStrategyStock) return;
    
    const shares = parseInt(document.getElementById('bandBuyShares').value) || 0;
    const buyPrice = parseFloat(document.getElementById('bandBuyPrice').value) || 0;
    const stopLoss = parseFloat(document.getElementById('bandStopLoss').value) || 0;
    
    if (shares <= 0 || buyPrice <= 0) {
        alert('请输入有效的买入信息');
        return;
    }
    
    // 先获取股票名称，再清空currentStrategyStock
    const stock = A_STOCKS.find(s => s.code === currentStrategyStock);
    const stockName = stock?.name || currentStrategyStock;
    
    StrategyStorage.addBandHolding(currentStrategyStock, shares, buyPrice, stopLoss);
    
    closeBuyCallModal();
    renderStrategyPage();
    
    alert(`成功买入 ${stockName} ${shares}股`);
}

// 打开卖出Call弹窗
async function openSellCallModal(code) {
    currentStrategyStock = code;
    const stock = A_STOCKS.find(s => s.code === code);
    const data = await fetchStockData(code);
    const holding = StrategyStorage.getBandHoldings().find(h => h.code === code);
    
    if (!holding) {
        alert('没有该股票的波段持仓');
        return;
    }
    
    const content = document.getElementById('sellCallContent');
    content.innerHTML = `
        <div style="margin-bottom: 16px;">
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 4px;">${stock.name} (${code})</div>
            <div style="color: #8c8c8c; font-size: 12px;">当前价: ¥${data.currentPrice.toFixed(2)}</div>
        </div>
        <div style="background: #f6ffed; padding: 12px; border-radius: 8px; margin-bottom: 16px;">
            <div style="font-size: 12px; color: #666;">当前波段持仓</div>
            <div style="font-size: 18px; font-weight: 600; color: #52c41a;">${holding.shares} 股</div>
            <div style="font-size: 12px; color: #8c8c8c;">成本价: ¥${holding.buyPrice.toFixed(2)}</div>
        </div>
        <div class="input-group" style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #666; margin-bottom: 6px;">卖出股数</label>
            <input type="number" id="bandSellShares" value="${holding.shares}" max="${holding.shares}" step="100" style="width: 100%; padding: 12px; border: 1px solid #d9d9d9; border-radius: 8px;">
        </div>
        <div class="input-group" style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #666; margin-bottom: 6px;">卖出价格</label>
            <input type="number" id="bandSellPrice" value="${data.currentPrice.toFixed(2)}" step="0.01" style="width: 100%; padding: 12px; border: 1px solid #d9d9d9; border-radius: 8px;">
        </div>
        <div style="background: #fff1f0; padding: 12px; border-radius: 8px; font-size: 12px; color: #cf1322;">
            ⚠️ 提示：卖出后将减少波段持仓，底仓不受影响
        </div>
    `;
    
    document.getElementById('sellCallModal').style.display = 'flex';
}

// 关闭卖出Call弹窗
function closeSellCallModal() {
    document.getElementById('sellCallModal').style.display = 'none';
    currentStrategyStock = null;
}

// 确认卖出Call
function confirmSellCall() {
    if (!currentStrategyStock) return;
    
    const shares = parseInt(document.getElementById('bandSellShares').value) || 0;
    const sellPrice = parseFloat(document.getElementById('bandSellPrice').value) || 0;
    
    if (shares <= 0 || sellPrice <= 0) {
        alert('请输入有效的卖出信息');
        return;
    }
    
    // 先获取股票名称，再清空currentStrategyStock
    const stock = A_STOCKS.find(s => s.code === currentStrategyStock);
    const stockName = stock?.name || currentStrategyStock;
    
    StrategyStorage.reduceBandHolding(currentStrategyStock, shares);
    
    closeSellCallModal();
    renderStrategyPage();
    
    alert(`成功卖出 ${stockName} ${shares}股`);
}

// 更新止损
async function updateStopLoss(code) {
    const holding = StrategyStorage.getBandHoldings().find(h => h.code === code);
    if (!holding) return;
    
    const stock = A_STOCKS.find(s => s.code === code);
    const data = await fetchStockData(code);
    const newStopLoss = prompt(`更新 ${stock?.name || code} 的止损价：`, holding.stopLoss.toFixed(2));
    
    if (newStopLoss === null) return;
    
    const stopLoss = parseFloat(newStopLoss);
    if (isNaN(stopLoss) || stopLoss <= 0) {
        alert('请输入有效的止损价格');
        return;
    }
    
    const holdings = StrategyStorage.getBandHoldings();
    const idx = holdings.findIndex(h => h.code === code);
    if (idx > -1) {
        holdings[idx].stopLoss = stopLoss;
        StrategyStorage.setBandHoldings(holdings);
        renderStrategyPage();
        alert('止损价已更新');
    }
}
