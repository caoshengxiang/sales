<template>
    <div class="step-content">
        <div class="divPosition">
            <p class="com-titles">
                <img src="../../../../assets/icon/spgl_cpms.png" alt="" class="mr10" style="vertical-align: top;">
                产品描述
                <span class="stepOne-contents-spectitle">( 非标准商品基础服务费 )</span>
            </p>
            <div class="com-dialog ml10">
                <el-form :model="stepFour" ref="addForm" label-position="left" label-width="100px">
                    <el-form-item label="产品概述">
                        <template slot-scope="scope">
                            <el-input placeholder="请输入产品概述" v-model="stepFour.outline"></el-input>
                        </template>
                    </el-form-item>
                    <el-form-item label="产品服务内容">
                        <template slot-scope="scope">
                            <el-input type="textarea" placeholder="请输入产品服务内容" rows="5" resize="none" v-model="stepFour.serviceContents"></el-input>
                        </template>
                    </el-form-item>
                    <el-form-item label="产品详情">
                        <template slot-scope="scope">
                            <div id="serviceContent" style="width: 100%;"></div>
                        </template>
                    </el-form-item>
                    <el-form-item label="产品备注">
                        <template slot-scope="scope">
                            <el-input placeholder="请输入产品备注" v-model="stepFour.remarks"></el-input>
                        </template>
                    </el-form-item>
                    <el-form-item label="产品缩略图">
                        <template slot-scope="scope">
                            <p class="upload-text">请上传长宽比为15：8的图片，大小在1M以内（5张以内）</p>
                            <el-upload
                                class="upload-demo"
                                :action="uploadUrl"
                                list-type="picture-card"
                                :on-remove="onRemoveHandles"
                                :before-upload="beforeImgUpload"
                                :headers="{ authKey: userInfo.authKey }"
                                :on-success="onSuccessHandles"
                                accept=".jpg,.jpeg,.png,.pneg"
                                :file-list="fileLists"
                                :limit="5">
                                <i class='el-icon-plus'></i>
                            </el-upload>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="divPosition mt10">
            <p class="com-titles"><img src="../../../../assets/icon/spgl_cptj.png" alt="" class="mr10" style="vertical-align: top;">产品推荐</p>
            <div class="goods-recommend ml10">
                <p class='mb10'>
                    <el-checkbox v-model="stepFour.recommend">app推荐</el-checkbox>
<!--                    <el-select v-model="stepFour.recommendPositionId" placeholder="请选择推荐位" class="fr" style="width: calc(100% - 100px); margin-top: -7px;">
                        <el-option :value="1" label="lallala"></el-option>
                    </el-select> -->
                </p>
                <el-form :model="stepFour" ref="addForm" label-position="left" label-width="100px" v-if="stepFour.recommend">
                    <el-form-item label="推荐位图片">
                        <template slot-scope="scope">
                        <p class="upload-text">请上传长宽比为15：8的图片，大小在1M以内（1张）</p>
                        <el-upload
                            class="upload-demo"
                            :action="uploadUrl"
                            list-type="picture-card"
                            :on-remove="onRemoveHandle"
                            :before-upload="beforeImgUpload"
                            :headers="{ authKey: userInfo.authKey }"
                            :on-success="onSuccessHandle"
                            :file-list="fileList"
                            accept=".jpg,.jpeg,.png,.pneg"
                            :limit="1">
                            <i class='el-icon-plus'></i>
                        </el-upload>
                        </template>
                    </el-form-item>
                    <el-form-item label="推荐描述">
                        <template slot-scope="scope">
                            <el-input placeholder="请输入推荐描述文案" v-model="stepFour.recommendPositionRemark" ></el-input>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <p class="all-btn">
            <span>
                <span class="step-last-button" @click="goBack(3)">上一步</span>
                <span class="step-next-button ml20" @click="goodsSave">保存</span>
            </span>
        </p>
    </div>
</template>

<script>
import API from '../../../../utils/api';
import { uploadUrl } from '../../../../utils/const'
import { mapState, mapMutations  } from 'vuex'
import Editor from 'wangeditor';
import 'wangeditor/release/wangEditor.min.css';
import webStorage from 'webStorage';

export default {
    data() {
        return {
            userInfo: webStorage.getItem('userInfo'),
            fileList: [],                                  //推荐图片list
            fileLists: [],                                 //产品略缩图list
            editor: {},
            stepFour: {
                outline: '',                               //产品概述
                serviceContents: '',                       //产品服务内容
                remarks: '',                               //产品备注
                description: '',                           //产品详情
                pictureCollection: '',                     //产品缩略图
                recommend: 0,                              //是否APP推荐
                // recommendPositionId: '',                //推荐位id
                recommendPositionPath: '',                 //推荐位图片地址
                recommendPositionRemark: '',               //app推荐描述文案
            },
            pictureCollection: [],                         //选择产品缩略图
            deleteImgName: [],                             //要删除的图片名称合集
            imgUrl: '',
        };
    },
    props: {
        detail: {
            type: Object,
            default: {}
        }
    },
    watch: {},
    created() {
        let detail = ~~this.$route.query.detail;
        webStorage.removeItem('DELETEIMG');
        let four = webStorage.getItem('stepFour');
        if(four) {
            this.stepFour = four;
            if(four.pictureCollection) {
                this.pictureCollection = four.pictureCollection.split(',');
                this.pictureCollection.forEach(img => {
                    this.fileLists.push({name: img, url: img})
                })
            }
            if(four.recommendPositionPath) {
                let recoImg = four.recommendPositionPath.split(',');
                recoImg.forEach(imgs => {
                    this.fileList.push({name: imgs, url: imgs})
                })
            }
        }else {
            if(detail) {
                this.stepFour.outline = this.detail.outline;
                this.stepFour.serviceContents = this.detail.serviceContents;
                this.stepFour.description = this.detail.description;
                this.stepFour.remarks = this.detail.remarks;
                this.stepFour.pictureCollection = this.detail.pictureCollection;
                if(this.detail.pictureCollection) {
                  this.pictureCollection = this.detail.pictureCollection.split(',');
                  this.pictureCollection.forEach(img => {
                      this.fileLists.push({name: img, url: img})
                  })
                }
                this.stepFour.recommend = this.detail.recommend;
                if(this.detail.recommendPositionPath) {
                    let recoImg = this.detail.recommendPositionPath.split(',');
                    recoImg.forEach(imgs => {
                        this.fileList.push({name: imgs, url: imgs})
                    })
                }
                this.stepFour.recommendPositionPath = this.detail.recommendPositionPath;
                this.stepFour.recommendPositionRemark = this.detail.recommendPositionRemark;
            }
        }
    },
    mounted() {
        this.createdEditor();
    },
    computed: {
        uploadUrl() {
            return uploadUrl;
        }
    },
    methods: {
        ...mapMutations('constData', [
            'mut_addProductStatus',
        ]),
        // 上一步
        goBack(step) {
            this.mut_addProductStatus(step)
            let detail = this.$route.query.detail;
            this.$router.push({name: 'addGoods', query: {detail: detail, step: step}})
        },
        // 保存
        goodsSave () {
            this.stepFour.pictureCollection = this.pictureCollection.length ? this.pictureCollection.join() : '';
            let message = !this.stepFour.outline && '请输入产品概述' ||
                          !this.stepFour.serviceContents && '请输入产品服务内容' ||
                          !this.stepFour.description && '请输入产品详情' ||
                          !this.stepFour.pictureCollection && '请选择产品缩略图' ||
                          // (this.stepFour.recommend && !this.stepFour.recommendPositionId) && '请选择推荐位' ||
                          (this.stepFour.recommend && !this.stepFour.recommendPositionPath) && '请选择推荐位图片' ||
                          (this.stepFour.recommend && !this.stepFour.recommendPositionRemark) && '请输入推荐描述文案' || null;
            if(message) return this.$message.warning(message);

            // 保存时如果有删除的图片则存入缓存调接口删除OOS上的图片
            if(this.deleteImgName.length > 0) {
              let _name = this.deleteImgName.join();
              webStorage.setItem('DELETEIMG', _name);
            }
            webStorage.setItem('stepFour', this.stepFour);     //设置第四步缓存
            this.$emit('save')
        },
        createdEditor() {
            this.editor = new Editor('#serviceContent');
            this.editor.customConfig.zIndex = 100;
            //把这个html通过catchData的方法传入父组件
            this.editor.customConfig.onchange = html => {
                this.stepFour.description = html;
            };
            this.editor.customConfig.uploadImgShowBase64 = true
            this.editor.customConfig.uploadImgServer = uploadUrl;
            this.editor.customConfig.uploadFileName = 'file'
            this.editor.customConfig.uploadImgHeaders = {
                authKey: this.userInfo.authKey //头部token
            };
            //下面是最重要的的方法
            this.editor.customConfig.uploadImgHooks = {
                before: function(xhr, editor, files) {
                    // 图片上传之前触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
                    // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                    // return {
                    //     prevent: true,
                    //     msg: '放弃上传'
                    // }
                },
                success: function(xhr, editor, result) {
                    // 图片上传并返回结果，图片插入成功之后触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                    this.imgUrl = Object.values(result.data).toString();
                },
                fail: function(xhr, editor, result) {
                    // 图片上传并返回结果，但图片插入错误时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                },
                error: function(xhr, editor) {
                    // 图片上传出错时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                },
                timeout: function(xhr, editor) {
                    // 图片上传超时时触发
                    // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                },

                // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
                // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
                customInsert: function(insertImg, result, editor) {
                    // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                    // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                    // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                    let url = Object.values(result); //result.data就是服务器返回的图片名字和链接
                    JSON.stringify(url); //在这里转成JSON格式
                    insertImg(result.data.url);
                    // result 必须是一个 JSON 格式字符串！！！否则报错
                }
            };
            // 自定义颜色
            this.editor.customConfig.colors = [
                '#000000',
                '#eeece0',
                '#1c487f',
                '#4d80bf',
                '#c24f4a',
                '#8baa4a',
                '#7b5ba1',
                '#46acc8',
                '#f9963b',
                '#ffffff',
                '#483B3B',
                '#FF0000',
                '#FF5400',
                '#FFB700',
                '#FFF800',
                '#ADFF00',
                '#00FF14',
                '#00F8FF',
                '#0090FF',
                '#0005FF',
                '#6800FF',
                '#FF00F3',
                '#FF009E',
                '#FF0059',
                '#aaaaaa',
                '#E1E1E1'
            ]
            this.editor.create();

            // 如果编辑情况下填充已经填写的内容
            if(webStorage.getItem('stepFour')) {
                this.editor.txt.html(this.stepFour.description)
            }else {
              if(~~this.$route.query.detail) {
                this.editor.txt.html(this.detail.description)
              }
            }
        },
        // 推荐位图片成功上传
        onSuccessHandle (response, file, fileList) {
            this.stepFour.recommendPositionPath = response.data.url
        },
        // 删除已上传推荐位图片
        onRemoveHandle (response, file) {
          let name = '';
          if(response.size) {
            name = response.response.data.url.split('/')[response.response.data.url.split('/').length - 1];
          }else {
            name = response.url.split('/')[response.url.split('/').length - 1];
          }
          if(name) this.deleteImgName.push(name);
          // API.zhuxinGoodsManage.deleteFile({fileName: name}, (data) => {
          //   if(data.status && data.data == 1) {
          //     this.$message.success('删除图片成功');
          //   }
          // })
            this.stepFour.recommendPositionPath = '';
        },

        // 产品缩略图成功上传
        onSuccessHandles (response, file, fileLists) {
            this.pictureCollection.push(response.data.url)
        },
        // 删除已上传产品缩略图
        onRemoveHandles (response, file) {
            let _list = this.pictureCollection;
            _list.forEach((img, i) => {
                if(response.response) {
                    if(img === response.response.data.url) {
                        this.pictureCollection.splice(i, 1);
                    }
                }else {
                    if(img === response.name) {
                        this.pictureCollection.splice(i, 1);
                    }
                }
            })
          let name = '';
          if(response.size) {
            name = response.response.data.url.split('/')[response.response.data.url.split('/').length - 1];
          }else {
            name = response.url.split('/')[response.url.split('/').length - 1];
          }
          if(name) this.deleteImgName.push(name);
          // API.zhuxinGoodsManage.deleteFile({fileName: name}, (data) => {
          //   if(data.status && data.data == 1) {
          //     this.$message.success('删除图片成功');
          //   }
          // })
        },
        // 文件上传前的钩子
        beforeImgUpload (file) {
            console.log(file);
            // 限制上传文件兆数大小
            let file1M = (file.size / 1024 /1024) < 1;
            if(!file1M) this.$message.info('只能上传小于1M的图片');

            // 限制宽高比图片15:8
            let isSize = new Promise((resolve, reject) => {
                let width = 15, height = 8, _url = window.URL || window.webkitURL, img = new Image();
                img.onload = () => {
                    let valid = (width / height) == (img.width / img.height);
                    valid ? resolve() : reject();
                }
                img.src = _url.createObjectURL(file);
            }).then(() => {
                return file;
            }, () => {
                this.$message.info('上传图片的长宽比必须是15:8');
                return Promise.reject();
            })
            return file1M && isSize;
        },
    }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '../../../../styles/commons';
@import '../../../../styles/stepCommon';

    .divPosition {
        background: #fff;
        padding: 20px 15px 25px 15px;
    }

    .step-content {
        width: 100%;
        .com-titles {
            font-size: 15px;
            font-weight: bold;
            color: #333e48;
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin: 0 !important;
        }
        .com-titles:after {
            border: 0;
        }
        .com-titles:before {
            border: 0;
            width: 0;
            height: 0;
        }
        .stepOne-contents-spectitle {
            color: #999999;
            font-size: 13px;
            font-weight: normal;
            margin-left: 5px;
        }
        .goods-recommend {
            margin-bottom: 10px;
        }
        .all-btn {
            text-align: center;
            margin-bottom: 50px;
            margin-top: 20px;
            .step-last-button {
                display: inline-block;
                width: 180px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #e0e3e7;
                font-size: 14px;
                color: #fff;
                cursor: pointer;
                margin-top: 50px;
                border-radius: 4px;
            }
            .step-next-button {
                display: inline-block;
                width: 180px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #4bcf99;
                font-size: 14px;
                color: #fff;
                cursor: pointer;
                margin-top: 50px;
                border-radius: 4px;
            }
        }
        .upload-text {
            font-size: 14px;
            color: #C0C4CC;
        }
    }
</style>
<style scoped>
    .step-content >>> .el-upload--picture-card {
        width: 150px !important;
        height: 80px !important;
        line-height: 80px !important;
        border-radius: 0 !important;
    }
    .step-content >>> .el-upload-list--picture-card .el-upload-list__item {
        width: 150px !important;
        height: 80px !important;
        border-radius: 0 !important;
    }
    .step-content >>> .w-e-text-container {
        height: 160px !important;
    }
</style>
