<template>
  <div class="InstNamepage content-container">
    <div class="sectionone">
      <div class="wrapper">
        <div class="searchContainer">
          <h1>Instagram Username Generator</h1>
          <p class="weitext"></p>
          <p class="des">
            A good username is half done on Instagram. Try this free Instagram
            Username Generator to create random Instagram username that is
            unique and cool. You can check their availability instantly by
            clicking the check button.
          </p>
          <!-- 搜索模块 -->
          <div class="whitesearch">
            <div class="control-search_ins">
              <label>
                <input
                  v-model="searchInsInput"
                  type="text"
                  :placeholder="'Keywords'"
                />
              </label>
              <div class="search_btn" @click="searchName">
                <button-purple
                  id="orangebtn"
                  text="Generate Now"
                  :sharp="true"
                  :loading="searchInsLoading"
                  :sizeweight="sizefont"
                />
              </div>
            </div>
            <!-- 进度条和分类 -->
            <div class="felxbox">
              <div class="steoline">
                <div class="block">
                  <span class="demonstration">Length</span>
                  <el-slider v-model="value2" :min="minnum" :max="30" tooltip-class="ttc"></el-slider>
                </div>
                <div class="numpop">{{ value2 }}</div>
              </div>
              <div class="lenAnd">
                <select v-model="seleced" class="catogory">
                  <!-- <option disabled value="">请选择</option> -->
                  <option :value="'Animal'">Animal</option>
                  <option :value="'Art'">Art</option>
                  <option :value="'Business'">Business</option>
                  <option :value="'Food'">Food</option>
                  <option :value="'Fitness'">Fitness</option>
                  <option :value="'Fashion'">Fashion</option>
                  <option :value="'Photography'">Photography</option>
                  <option :value="'Movie'">Movie</option>
                  <option :value="'Sports'">Sports</option>
                  <option :value="'Travel'">Travel</option>
                </select>
                <div class="tips">Advanced options</div>
              </div>
            </div>
            <!-- checkBox -->
            <div class="classification">
              <span class="introduce">Advanced options</span>
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="number"></el-checkbox>
                <el-checkbox label="period"></el-checkbox>
                <el-checkbox label="underscore"></el-checkbox>
                <el-checkbox label="put word at the end"></el-checkbox>
              </el-checkbox-group>
            </div>
            <!-- 下载 -->
            <div class="downMobile">
              <div class="getFree" @click="dowMobileurl">Get Free Followers</div>
              <p>Get free Instagram followers after registering</p>
            </div>
            <!-- 列表 -->
            <div v-if="nameList.length&&nameList.length % 2 === 0" class="nameListContain">
              <ul>
                <li v-for="item in nameList" :key="item.id">
                  <span class="nametext" @click="checkName(item)">{{
                    item.text
                  }}</span>
                  <div class="popgrey">
                    Check Availability
                  </div>
                  <!-- <div class="popgrey">
                    Check
                  </div> -->
                  <span class="animatede">
                    <span
                      v-if="clicktrue === item.text && showloading"
                      class="loading"
                      :class="{
                        scaleplay: showloading,
                        hiddenload: !showloading
                      }"
                    ></span>
                    <span
                      v-if="clicktrue === item.text && showyes"
                      class="success"
                    ></span>
                    <span
                      v-if="clicktrue === item.text && showfaild"
                      class="failed"
                    ></span>
                    <span v-if="clicktrue === item.text && showfaild" class="failedtext">The Username is taken</span>
                    <button
                      v-if="clicktrue === item.text && showyes"
                      class="copytext"
                      @click="getText(item)"
                    >
                      {{ copyinfo }}
                    </button>
                  </span>
                  <span v-if="clicktrue !== item.text" class="copyicon" @click="checkName(item)">Check</span>
                </li>
              </ul>
            </div>
            <p v-if="nameList.length&&nameList.length % 2 === 0" class="scrollMore">Scroll for More</p>
            <div
              v-else-if="nameList.length&&nameList.length % 2 !== 0"
              class="nameListContain jscontain"
            >
              <ul>
                <li v-for="item in nameList" :key="item.id">
                  <span class="nametext" @click="checkName(item)">{{
                    item.text
                  }}</span>
                  <div class="popgrey">
                    Check Availability
                  </div>
                  <span class="animatede">
                    <span
                      v-if="clicktrue === item.text && showloading"
                      class="loading"
                      :class="{
                        scaleplay: showloading,
                        hiddenload: !showloading
                      }"
                    ></span>
                    <span
                      v-if="clicktrue === item.text && showyes"
                      class="success"
                    ></span>
                    <span
                      v-if="clicktrue === item.text && showfaild"
                      class="failed"
                    ></span>
                    <span v-if="clicktrue === item.text && showfaild" class="failedtext">The Username is taken</span>
                    <button
                      v-if="clicktrue === item.text && showyes"
                      class="copytext"
                      @click="getText(item)"
                    >
                      {{ copyinfo }}
                    </button>
                  </span>
                  <span v-if="clicktrue !== item.text" class="copyicon" @click="checkName(item)">Check</span>
                </li>
              </ul>
            </div>
            <p v-if="nameList.length&&nameList.length % 2 !== 0" class="scrollMore">
              Scroll for More
            </p>
          </div>
          <!-- 下载引导 -->
          <div class="howDoes">
            <div class="Icondow"></div>
            <h1>How Does the Instagram Username Generator Work?</h1>
            <ul>
              <li>
                <div class="doseIcon01"></div>
                <div class="rightIcon rightIcon01"></div>
                <div class="content">
                  <h3>Enter Keywords</h3>
                  <p>Enter a keyword you want to use in the Instagram username.</p>
                </div>
              </li>
              <li>
                <div class="doseIcon02"></div>
                <div class="rightIcon rightIcon02"></div>
                <div class="content">
                  <h3>Generate Username</h3>
                  <p>
                    After choosing other options, click the “Generate” button.
                  </p>
                </div>
              </li>
              <li>
                <div class="doseIcon03"></div>
                <div class="content">
                  <h3>Check Availability</h3>
                  <p>
                    <span v-if="!$store.state.isMobile" class="pctext">Click</span><span v-if="$store.state.isMobile" class="mobiletext">Tap</span> the check button to check the availability of all
                    Instagram usernames fast.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <InstaCenter />
    <InstaDownload :usenum="numone" />
    <InstArticle />
    <InstaFollowers :usenumtwo="numtwo" />
    <Promote />
    <Traditional />
    <InstaDownload :usenum="numthree" />
  </div>
</template>

<script>
import ButtonPurple from "@/components/button/button-purple";
import InstaCenter from "./views/instacenter";
import InstaDownload from "./views/instadownload";
import Promote from "./views/promote";
import Traditional from "./views/traditional";
import InstArticle from "./views/instarticle";
import InstaFollowers from "./views/instafollowers";
import categrey from '@/assets/json/categoryname.json';
export default {
  name: "InstagramName",
  components: {
    ButtonPurple,
    InstaCenter,
    InstaDownload,
    Promote,
    Traditional,
    InstArticle,
    InstaFollowers
  },
  data() {
    return {
      numone:1,
      numtwo:2,
      numthree:3,
      value2: 20,
      searchInsInput: "",
      sizefont: true,
      searchInsLoading: false,
      showloading: false,
      clicktrue: null,
      checkSuccess: false,
      showyes: false,
      showfaild: false,
      // 随机分类词
      sjcategory:'',
      // 随机数字
      sjnum:'',
      minnum:0,
      // 句号
      pointstr:'',
      // 下划线
      underlineStr:'',
      // 关键字放最后
      endStr: false,
      seleced:'Animal',
      checkList: [],
      copyinfo: "copy it",
      categrey,
      nameList: []
    };
  },
  metaInfo(){
    return{
      title: 'Instagram Username Generator - Check Availability Instantly',
      meta: [
        {
          name: 'description',
          content: 'The Instagram username generator could generate various random Instagram usernames. Try it now to create a satisfying username on Instagram.'
        }
      ]
    }
  },
  watch:{
    searchInsInput (newv,oldv){
      this.minnum = newv.length
    },
    checkList: {
      handler(newName, oldName) {
    },
    deep: true,
    immediate: true
    }
  },
  mounted(){
  },
  methods: {
    dowMobileurl(){
       let url = '';
      if (this.COMMON.isiOS()) {
        url = 'https://apps.apple.com/app/apple-store/id1498558125?pt=121014724&ct=en-seo-iug&mt=8';
      }

      if (this.COMMON.isAndroid()) {
        // url = 'https://play.google.com/store/apps/details?id=com.insfollower.getinsta&referrer=utm_source%3Den-seo-iug';
        url = this.$store.state.enAdrLinkWithoutGpReferrer
          + this.$constant.app.campaign.androidReferrerQuery
          + 'en-seo-iug';
      }
      this.$ga.event(
        'insdl',
        'download',
         `${this.$store.state.platform}dl-iug`
      );
      location.href = url;
    },
    checkName(v) {
      this.clicktrue = v.text;
      this.showyes = false;
      this.showfaild = false;
      this.showloading = true;
       this.axios.get(
        `https://www.instagram.com/${v.text}/`
      ).then((response) => {
        // console.log('re',response)
        // const responsePage = response.data;
        // const _sharedDataStr = responsePage.match('window._sharedData = (.*);<\/script')[1];
        // const _sharedData = JSON.parse(_sharedDataStr);
        // console.log("检查结果",_sharedData['entry_data'])
        // if(_sharedData['entry_data'].hasOwnProperty('ProfilePage')){
        //   // 可用
        //     this.showloading = false;
        //     this.showyes = true;

        // }else{
        //   // 不可用
        //   this.showloading = false;
        //   this.showyes = false;
        //   this.showfaild = true;
        // }
        if(response.status === 200){//不可用
          this.showloading = false;
          this.showyes = false;
          this.showfaild = true;
        }else{//可用
          this.showloading = false;
          this.showyes = true;
        }
      }).catch((error) => {
        // this.closeDialog();
        this.showloading = false;
        this.showyes = true;
        // setTimeout(() => {
        //   this.showloading = false;
        // }, 300);
        console.error('Catch Error: searchIns: ', error);
      });
      // setTimeout(() => {
      //   this.showloading = false;
      //   this.showyes = true;
      // }, 2000);
    },
    getText(v) {
      let oInput = document.createElement("input");
      oInput.value = v.text;
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand("Copy");
      this.$alert("", "success", "opps", "copied.", "normal", "Close");
      oInput.remove();
    },
     isChineseChar(str){
      let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
      return reg.test(str);
    },
    searchName() {
      this.$ga.event('buttonclick', 'click', 'iug-generate');
      if(this.searchInsInput===''|| this.isChineseChar(this.searchInsInput)){
        this.$alert('', 'error', 'Oops',
            'Please enter the Keywords, Cannot be Chinese',
            '', 'Close');
        return;
    }else{
      this.searchInsInput=this.searchInsInput.replace(/\s/g,"");
    }
      // 选中的分类随机
      let choiceFlarr ;
      if(Object.keys(this.categrey.category).includes(this.seleced)){
         choiceFlarr = this.categrey.category[this.seleced]
      }
      choiceFlarr.sort(function() {
            return (0.5-Math.random());
        });
      this.sjcategory = this.sjfn(choiceFlarr);
      // 随机数字
      if(this.checkList.includes('number')){
        this.sjnum = this.sjfn(this.RndNum(10));
      }else{
        this.sjnum = ''
      }
      // 句号
      if(this.checkList.includes('period')){
        this.pointstr = '.';
      }else{
        this.pointstr = '';
      }
      // console.log("this.checkList",this.checkList)
      // 下划线
      if(this.checkList.includes('underscore')){
        this.underlineStr = '_';
      }else{
        this.underlineStr = '';
      }
      // 关键字是否放最后
      if(this.checkList.includes('put word at the end')){
        this.endStr = true;
      }else{
        this.endStr = false;
      }
      // 拼接数组
      let resultarr = [];
      for(let j =0;j<30;j++){
        let finaArr;
        if(this.checkList.includes('number')){
           finaArr = [this.searchInsInput,this.sjfn(choiceFlarr),this.pointstr,this.sjfn(this.RndNum(10)),this.underlineStr];
        }else{
          finaArr = [this.searchInsInput,this.sjfn(choiceFlarr),this.pointstr,this.underlineStr];
        }
        resultarr.push(this.getstr(finaArr));
      }
      for(let v=0;v<resultarr.length;v++){
        if(this.endStr){
          if(!this.validationEnd(resultarr[v],this.searchInsInput)){
             resultarr[v] = resultarr[v].replace(this.searchInsInput,"").trim()+this.searchInsInput
          }
        }
        if(resultarr[v].length>this.value2){
          // 如果关键字放最后，倒着截取
          if(this.endStr){
             resultarr[v] = resultarr[v].slice(resultarr[v].length-this.value2);
          }else{
            // console.log("没有关键字放最后")
             resultarr[v] = resultarr[v].substring(0,this.value2)
          }
        }
        // 如果句号开头，去掉句号
        if(resultarr[v].indexOf(".") === 0){
          resultarr[v] = resultarr[v].replace(".","").trim();
        }
      }
      // resultarr = new Set(resultarr);
      //  console.log("没有关键字放最后arr",new Set(resultarr))
      let funarr = Array.from(new Set(resultarr));
      let nameArr = [];
      for(let r =0;r<funarr.length;r++){
        let postObj = {};
         postObj.id = r+'/';
         postObj.text = funarr[r];
         nameArr.push(postObj)
      }
         this.nameList = nameArr;
    },
    //str：字符串    appoint：指定字符
    validationEnd (str, appoint) {
      str=str.toLowerCase();  //不区分大小写：全部转为小写后进行判断
      var start = str.length-appoint.length;  //相差长度=字符串长度-特定字符长度
      var char= str.substr(start,appoint.length);//将相差长度作为开始下标，特定字符长度为截取长度
      if(char== appoint){ //两者相同，则代表验证通过
          return true;
      }
      return false;
    },
    sjfn(items){
      return items[Math.random() * items.length | 0];
    },
    RndNum(n){ // 生成0-9的随机数字组成的数组
        let rnd=[];
        for(let i=0;i<n;i++)
            rnd[i] = Math.floor(Math.random()*10);
        return rnd;
    },
    // 随机取出拼接的数组
    getstr(v){
        let newstr = '';
        v.sort(function() {
            return (0.5-Math.random());
        });
        for(let i =0;i<v.length;i++){
            newstr+=v[i];
        }
        return newstr
    }
  }
};
</script>
<style lang="scss">
.el-slider__button-wrapper{
  z-index:9;
}
.el-tooltip__popper.is-dark {
  display: block;
  background: #7c56ff;
  span {
    font-size: 14px;
    font-weight: 500;
  }
}
.el-tooltip__popper[x-placement^="top"] .popper__arrow:after {
  border-top-color: #7c56ff;
}
@media (max-width: 768px) {
  .el-tooltip__popper.is-dark {
    display: none;
    background: #7c56ff;
    top: 312px !important;
    span {
      font-size: 12px;
      font-weight: 500;
    }
  }
}
</style>
<style lang="scss" src="./insname.scss" scoped></style>
