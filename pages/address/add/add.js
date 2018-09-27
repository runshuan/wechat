Page({

  /**
   * 页面的初始数据
   */
  data: {
    realname:'',
    gender: 0,
    mobile:'',
    area:'',
    detail:''
  },
  // 联系人名字input
  bindname:function(e){
    var that = this;
    this.setData({
      realname: e.detail.value
    })
  },
  // 电话input
  bindphone: function (e) {
    var that = this;
    this.setData({
      mobile: e.detail.value
    })
  },
  // 详细地址inpu
  bindaddress: function (e) {
    var that = this;
    this.setData({
      detail: e.detail.value
    })
  },
  // 添加
  addto:function(){
    if (this.data.realname){
      wx.redirectTo({
        url: '../../address/list/list',
      })
      wx.setStorage({
        key: 'addto',
        data: {
          realname: this.data.realname,
          gender: this.data.gender,
          mobile: this.data.mobile,
          detail: this.data.detail,
          addres: this.data.addres
        },
      })
    }else{
      wx.showModal({
        title: '姓名为空',
        content: '请输入姓名',
        success: function(res){
          if(res.confirm){
            console.log('用户点击确定')
          }
        }
      })
    }
  },
  //  跳转地址
  selectAddress: function () {
    console.log('tapped')
    // 跳转选择poi
    wx.navigateTo({
      url: '../search/search'
    });
  },
  // 
  add: function (e) {
    var form = e.detail.value;
    // console.log(form);
    // 表单验证
    if (form.realname == '') {
      wx.showModal({
        title: '请填写收件人姓名',
        showCancel: false
      });
      return;
    }

    if (!(/^1[34578]\d{9}$/.test(form.mobile))) {
      wx.showModal({
        title: '请填写正确手机号码',
        showCancel: false
      });
      return;
    }

    if (form.detail == '') {
      wx.showModal({
        title: '请填写详细地址',
        showCancel: false
      });
      return;
    }

    form.gender = parseInt(form.gender);
    form.user = Bmob.User.current();
    var address = new Bmob.Object('Address');
    // 是否处在编辑状态
    if (that.data.isEdit) {
      address = that.data.address;
    }
    address.save(form).then(function (res) {
      // console.log(res)
      wx.showModal({
        title: '保存成功',
        showCancel: false,
        success: function () {
          wx.navigateBack();
        }
      });
    }, function (res) {
      // console.log(res)
      wx.showModal({
        title: '保存失败',
        showCancel: false
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'addres',
      success: function(res) {
        that.setData({
          addres: res.data
        })

      },
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})