//index.js

const db = wx.cloud.database()
const app = getApp()


Page({
  data: {
    indexswiper: [
      'cloud://mooniessky-roneg.6d6f-mooniessky-roneg-1301466912/indexswiper/180926_45fkj8ifdj4l824l42dgf9hd0h495_750x390.jpg',
      'cloud://mooniessky-roneg.6d6f-mooniessky-roneg-1301466912/indexswiper/180926_31eb9h75jc217k7iej24i2dd0jba3_750x390.jpg',
      'cloud://mooniessky-roneg.6d6f-mooniessky-roneg-1301466912/indexswiper/180919_3f62ijgkj656k2lj03dh0di4iflea_750x390.jpg',
      'cloud://mooniessky-roneg.6d6f-mooniessky-roneg-1301466912/indexswiper/180917_18l981g6clk33fbl3833ja357aaa0_750x390.jpg'
    ],
    gametext: [{
      a: '真',
      b: 'heart'

    }, {
      a: '冒',
      b: 'risk'
    }, {
      a: '猜',
      b: 'guess'
    }, {
      a: '趣',
      b: 'interest'
    }],
    textcolor: ['#FFFF00', '#FFD39B', '	#FFAEB9', '#FF8247', '#FF69B4', '#E066FF', '#C0FF3E', '#7D26CD', '#00FF7F', '#00F5FF', '#454545', '#7B68EE', '#98F5FF', '#EEE685', '#FFA500', '#FF7F50'],
    activecolor: 'FF7256',
    z: ['打算什么时候结婚?',
      '现在心里最在意的异性叫什么名字',
      '第一次爱的人对你有什么影响?',
      '和男/女朋友进行到哪一步了,',
      '最喜欢在座哪位异性,',
      '内衣/裤颜色(这个，如果不太熟要慎用~)',
      '初吻年龄,',
      '自己最丢人的事。',
      '最后一次发自内心的笑是什么时候 ',
      '愿意为爱情牺牲到什么程度',
      '身上哪个部位最敏感',
      '如果有来生，你选择当 ',
      '你会选择Having sex before marriage吗 ',
      '如果让你选择做一个电影中的角色，你会选谁呢 ',
      '如果有一天我和你吵架，你会怎么办 ',
      '哭得最伤心的是哪一次,为什么 ',
      '如果跟你喜欢的人约会，碰到前任的男(女)朋友，会有什么表现',
      '如果有一天我对你说我爱上你了，你怎么办 '
],
    x: [
      '男的用胳膊从正面量女的胸围or女的量男的腰围(臀围...)',
      '侧抱互相喂 酒、喂吃的 ',
      '正面相隔做接吻陶醉状10秒 ',
      '原地转10圈(就近靠下); 跳肚皮舞; 跳钢管舞 ',
      '对外大喊我是猪 ',
      '走猫步; 摆3个芙蓉姐姐S形;',
      '和左数第一个异性亲一下 ',
      '脱一件衣服持续到结束 ',
      '背起右边第一个女生 ',
      '做好莱坞kiss ',
      '跪地求婚状:如果我不向你求婚，我会后悔一辈子，因为你是我的惟一。(理察?基尔致朱丽叶?罗伯茨(在电影《逃跑的新娘》中)) ',
      '大喊:燃烧吧，小宇宙 ',
      '选一个女生说 :我将把你紧紧 地搂在怀中，吻你亿万次，像在赤道上面那样炽烈的吻。(拿破仑致约瑟芬) ',
      '选一个男生，一边捶他的胸一边说:你好讨厌哦 ',
      '躺在床上摆pose说:饭在锅里，我在床上 ',
      '一人先用嘴吸住一纸牌，另一人用嘴从另一面将纸牌吸住移走 ',
      '女生仰躺地上，男生撑在上面，做五下俯卧撑 ',
      '男生仰躺地上，女生撑在上面，坚持5秒钟 ',
      '男生坐床上，女生躺床上，将头枕男生腿上，对视10秒 ',
      '男生将女生逼角落，用“调情式”一手撑墙，两人深情对视10秒;',
      '男生单腿下跪，女生伸手，男生亲女生手背 ',
      '男生单腿下跪，女生亲男生额头 ',
      '男生抱起女生，保持5秒钟 ',
      '男生把女生面 对面抱起来，女生用双腿夹住男生 ',
      '对喝交杯酒 ',
      '对喂花生米 ',
      '跳舞转圈 ',
      '女生踩男生脚上跳舞 ',
      '女生坐男生小腿上，男生做仰卧起坐 ',
      '拥抱 ',
      '亲脸',
      '对亲脖子 ',
      '十指交扣握住保持一轮 ',
      '正面对着十指交扣，深情对视，深情朗诵骆宾王的《鹅》 ',
      '情景剧:一男一女相遇，男生说:"你好，我姓锄名禾，你呢,"女生说:"我名。"男生女生同时说:"哦～原来是锄禾日当午啊～" ',
      '站起來,大喊"我是超人,我要回家了～” ',
      '让一个女的想办法让某男兴奋起来 ',
      '头顶簸箕，手拿笤帚，边跳边唱道:我爱劳动，我爱卫生; ',
      '两人面对面作搓澡状，屁股还要一扭一扭的，还要唱"洗刷刷，洗刷刷"; ',
      '学水兵月做动作，然后对一个人說: 我要代替月亮惩罚你～ ',
      '男生摸自己胸说“唉，太小了” ',
      '找一男生把腿架他肩膀上让他捶腿 ',
      '亲左数第二个异性的额头 ',
      '和左边第一个异性换穿上衣 ',
      '在厕所里唱歌，让大家都能听到唱的是什么; ',
      '说出京杭大运河的经过的中国五大水系 ',
      '左手拉右耳，右手拉左耳，从桌子底下过 ',
      '和右边第二个异性，一个演水兵月，一个演超兽，然后水兵月要把超兽打倒 ',
      '穿自己的外套表演张倾城之“我脱、我穿、我再脱、我再穿”; ',
      '露出肚皮，扭腰扭屁股，各扭3圈 ',
      '和右边第一个异性关在厕所里等一轮游戏 ',
      '用手纸当围巾，围脖子上持续一轮游戏 ',
      '为右边第一个男生脱衣服，由下一轮抽中的人再为他船上 ',
      '任选两个男生一起摆芙蓉姐姐的S形;',
      '把右边第一个异性横抱起来 ',
      '慢慢地性感地把上衣撩起到不能再撩起的位置; ',
      '对窗外大喊“我好寂寞啊” ',
      '背一位异性绕场一周; 唱青藏高原最后一句',
      '做一个大家都满意的鬼脸 ',
      '抱一位异性直到下一轮真心话大冒险结束 ',
      '像一位异性表白3分钟 ',
      '与一位异性十指相扣，对视10秒',
      '邀请一位异性为你唱情歌，或邀请一位异性与你情歌对唱 ',
      '做自己最性感、最妩媚的表情或动作 ',
      '吃下每个人为你夹得菜(如果是辣椒...)',
      '跳草裙舞、脱衣舞(反正是冬天) 蹲在凳子上作便秘状',
      '亲脸蛋(这个人可以事先指定)，或者亲一位异性，部位不限 ',
      '神情的吻墙10秒; 模仿古代特殊职业女子拉客 ',
      '模仿脑白金广告，边唱边跳',
      '让他到街上大喊“卖拖鞋啦,2块一双，买一送3”',
      '抓着铁门喊“放我出去～” 对陌生人美眉挤眉弄眼。 ',
      '在操场上举着钱包大喊:我这里有钱,谁来抢啊!!!谁来抢钱啊!!! ',
      '在操场上找个路人,对她说我是猪 ',
      '与在场的一位异性拥抱十秒钟',
      '和在场一位异性十指相扣20秒,并看着对方说眼睛含情脉脉地说:我爱你。',
      '邀请在场的一位异性说一分钟情话。 ',
      '做自己最性感、最妩媚的表情或动作。 ',
      '模仿古代特殊职业女子拉客。 ',
      '模仿脑白金广告,边唱边跳。 ',
      '把鞋子脱下来拿在手上,站在操场上,边摇边喊:“卖鞋啦,2块钱一双,买一送二。” ',
      '大象模鼻原地转5圈。 ',
      '摆3个芙蓉姐姐S形。 ',
      '在操场上大喊: 燃烧吧,小宇宙~ ',
      '选一个男生一边捶他的胸一边说:你好讨厌哦~ 大冒险:躺在草地上摆pose说饭在锅里,我在床上。 ',
      '站起來,大喊"我是超人,我要回家了!”。 ',
      '男生摸自己胸说“唉~太小了” ',
      '慢慢地性感地把上衣撩起到不能再撩起的位置(看到皮肤)说一句:“我性感吗~嗯~”。 ',
      '背一位异性绕场一周 ',
      '唱青藏高原最后一句 ',
      '做一个大家都满意的鬼脸 ',
      '抱一位异性直到下一轮真心话大冒险结束 ',
      '像一位异性表白3分钟 ',
      '与一位异性十指相扣,对视10秒 ',
      '邀请一位异性为你唱情歌,或邀请一位异性与你情歌对唱 ',
      '做自己最性感、最妩媚的表情或动作。 ',
      '跳草裙舞、脱衣舞。 ',
      '蹲在凳子上作便秘状。 ',
      '深情情的吻墙10秒。 ',
      '模仿脑白金广告,边唱边跳 ',
      '让他到街上大喊“卖拖鞋啦~2块一双,买一送3”大冒险:抓着铁门喊“放我出去!” ',
      '对陌生美眉挤眉弄眼。 ',
      '对在场的某一位异性做一个公主抱的pose。 ',
      '对在场的某一位异性大声的喊三声:我爱你! ',
      '踩气球 ',
      '表演希瑞:“我叫阿多拉，希曼的亲妹妹。这是顺风马，我的坐骑。我有一个不为人知的秘密，当我抽出剑叫道:“赐予我力量吧，我是希瑞～” 只有三个人知道这个秘密，他们是:希望之光，拉兹 夫人，和考尔。我和其他的朋友们一道，为解救以希利亚，与罪恶的霍达克进行着战斗～'


]
  },

  onLoad: function() {
    this.changcolor()
    // this.adddata()
  },


  // 存入数据
  adddata(){
    var sum = this.data.x.length
    console.log(sum) 
    for(let i = 0;i<sum;i++){
      db.collection("mooniesrisk").add({
        data: {
          riskmsg: this.data.x[i],
          riskauthor:'me'
        },
        success: res => {
          console.log("操作成功")
        },
      })
    }
  },

  // 游戏名称
  heart() {
    console.log('heart')
    wx.navigateTo({
      url: '../heart/heart',
    })
  },
  risk() {
    console.log('risk')
    wx.navigateTo({
      url: '../risk/risk',
    })
  },
  guess() {
    console.log('guess')
    wx.navigateTo({
      url: '../guess/guess',
    })
  },
  interest() {
    console.log('interest')
    wx.navigateTo({
      url: '../instert/instert',
    })
  },
  // 随机颜色
  changcolor() {
    let colorindex = 0
    var colorInterval = setInterval(() => {
      colorindex++
      this.setData({
        activecolor: this.data.textcolor[colorindex]
      })
      if (colorindex > 14) {
        colorindex = 0
        clearInterval(colorInterval)
      }
    }, 100)
  },
})