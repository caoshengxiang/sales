
<template>
  <div class="com-dialog">
    <div class="operation-code-box">
      <el-form :model="addForm" ref="addForm" label-width="0px" :rules="rules" :disabled="true">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">客户名称</td>
            <td class="td-text">
              <el-form-item prop="name">
                <el-input type="text" v-model="addForm.name" disabled></el-input>
              </el-form-item>
            </td>
            <td class="td-title">营业执照</td>
            <td class="td-text">
              <el-form-item prop="businessLicense">
                <el-input type="text" v-model="addForm.businessLicense"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">注册地址</td>
            <td class="td-text">
              <el-form-item prop="registryAddress">
                <el-input type="text" v-model="addForm.registryAddress"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">办公地址</td>
            <td class="td-text">
              <el-form-item prop="workAddress">
                <el-input type="text" v-model="addForm.workAddress"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">生产地址</td>
            <td class="td-text">
              <el-form-item prop="produceAddress">
                <el-input type="text" v-model="addForm.produceAddress"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">统一社会编码</td>
            <td class="td-text">
              <el-form-item prop="creditCode">
                <el-input type="text" v-model="addForm.creditCode"></el-input>
              </el-form-item>
            <td class="td-title">核准时间</td>
            <td class="td-text">
              <el-form-item prop="checkTime">
                <el-date-picker
                  style="width: 100%"
                  v-model="addForm.checkTime"
                  type="datetime"
                  value-format="timestamp"
                  placeholder="请选择时间">
                </el-date-picker>
              </el-form-item>
            </td>
            <td class="td-title">注册时间</td>
            <td class="td-text">
              <el-form-item prop="registryTime">
                <el-date-picker
                  style="width: 100%"
                  v-model="addForm.registryTime"
                  type="datetime"
                  value-format="timestamp"
                  placeholder="请选择时间">
                </el-date-picker>
              </el-form-item>
            </td>
            <td class="td-title">注册资本</td>
            <td class="td-text">
              <el-form-item prop="registeredCapital">
                <el-input type="text" v-model="addForm.registeredCapital"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">公司状态</td>
            <td class="td-text">
              <el-form-item prop="companyState">
                <el-input type="text" v-model="addForm.companyState"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">企业类型</td>
            <td class="td-text">
              <el-form-item prop="typesBusiness">
                <el-input type="text" v-model="addForm.typesBusiness"></el-input>
              </el-form-item>
            <td class="td-title">营业期限</td>
            <td class="td-text">
              <el-form-item prop="businessTerm">
                <el-input type="text" v-model="addForm.businessTime"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">公司形式</td>
            <td class="td-text">
              <el-form-item prop="mode">
                <el-input type="text" v-model="addForm.mode"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">登记机关</td>
            <td class="td-text">
              <el-form-item prop="registryDepartment">
                <el-input type="text" v-model="addForm.registryDepartment"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">营业范围</td>
            <td class="td-text">
              <el-form-item prop="businessScope">
                <el-input type="text" v-model="addForm.businessScope"></el-input>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">电话</td>
            <td class="td-text">
              <el-form-item prop="phone">
                <el-input type="text" v-model="addForm.phone"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">行业门类</td>
            <td class="td-text">
              <el-form-item prop="industry">
                <el-input type="text" v-model="addForm.industry"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">主营业务</td>
            <td class="td-text" :colspan="5">
              <el-form-item prop="business">
                <el-input type="text" v-model="addForm.business"></el-input>
              </el-form-item>
            </td>
          </tr>
        </table>
        <!--银行信息-->
        <div class="item-box">
          <div class="item-t">
            <span class="item-title">银行信息</span>
            <!--<el-button type="primary" icon="el-icon-plus" style="margin-left: 50px;"-->
                       <!--@click="addItem('serviceCustomerBankModels')">添加-->
            <!--</el-button>-->
          </div>
          <div class="item-d">
            <div v-for="(item, index) in addForm.serviceCustomerBankModels"
                 :key="index">
              <table class="com-dialog-table">
                <tr>
                  <td class="td-title">开户银行</td>
                  <td class="td-text">
                    <el-form-item prop="name">
                      <el-input type="text" v-model="item.name"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title">开户许可证核准号</td>
                  <td class="td-text">
                    <el-form-item prop="accountCheckId">
                      <el-input type="text" v-model="item.accountCheckId"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title">银行地址</td>
                  <td class="td-text">
                    <el-form-item prop="address">
                      <el-input type="text" v-model="item.address"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td class="td-title">账号属性</td>
                  <td class="td-text">
                    <el-form-item prop="property">
                      <el-input type="text" v-model="item.property"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title">账号</td>
                  <td class="td-text">
                    <el-form-item prop="accountId">
                      <el-input type="text" v-model="item.accountId"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title"></td>
                  <td class="td-text">
                  </td>
                </tr>
              </table>
              <!--<el-button v-if="!item.id" type="danger" icon="el-icon-minus" style="margin: -10px 0 10px 10px;"-->
                         <!--@click="deleteItem('serviceCustomerBankModels', index)">删除列-->
              <!--</el-button>-->
            </div>
          </div>
        </div>
        <!--固定资产信息-->
        <div class="item-box">
          <div class="item-t">
            <span class="item-title">固定资产信息</span>
            <!--<el-button type="primary" icon="el-icon-plus" style="margin-left: 50px;"-->
                       <!--@click="addItem('serviceCustomerFixedAssetsModels')">添加-->
            <!--</el-button>-->
          </div>
          <div class="item-d">
            <div v-for="(item, index) in addForm.serviceCustomerFixedAssetsModels"
                 :key="index">
              <table class="com-dialog-table">
                <tr>
                  <td class="td-title">固定资产名称</td>
                  <td class="td-text">
                    <el-form-item prop="name">
                      <el-input type="text" v-model="item.name"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title">购买时间</td>
                  <td class="td-text">
                    <el-form-item prop="buyingDate">
                      <!--<el-input type="text" v-model="item.buyingDate"></el-input>-->
                      <el-date-picker
                        style="width: 100%"
                        v-model="item.buyingDate"
                        type="datetime"
                        value-format="timestamp"
                        placeholder="购买时间">
                      </el-date-picker>
                    </el-form-item>
                  </td>
                  <td class="td-title">原值</td>
                  <td class="td-text">
                    <el-form-item prop="originalValue">
                      <el-input type="text" v-model="item.originalValue"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td class="td-title">折旧年限</td>
                  <td class="td-text">
                    <el-form-item prop="year">
                      <el-input type="text" v-model="item.year"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title">已折旧年数</td>
                  <td class="td-text">
                    <el-form-item prop="passYear">
                      <el-input type="text" v-model="item.passYear"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title">残值</td>
                  <td class="td-text">
                    <el-form-item prop="remainValue">
                      <el-input type="text" v-model="item.remainValue"></el-input>
                    </el-form-item>
                  </td>
                </tr>
              </table>
              <!--<el-button v-if="!item.id" type="danger" icon="el-icon-minus" style="margin: -10px 0 10px 10px;"-->
                         <!--@click="deleteItem('serviceCustomerFixedAssetsModels', index)">删除列-->
              <!--</el-button>-->
            </div>
          </div>
        </div>
        <!--税务信息-->
        <div class="item-box">
          <div class="item-t">
            <span class="item-title">税务信息</span>
          </div>
          <div class="item-d">
            <table class="com-dialog-table">
              <tr>
                <td class="td-title">税务主管机关</td>
                <td class="td-text">
                  <el-form-item prop="name">
                    <el-input type="text" v-model="addForm.nationalTaxBureau"></el-input>
                  </el-form-item>
                </td>
                <td class="td-title">税务主管机关地址</td>
                <td class="td-text">
                  <el-form-item prop="accountCheckId">
                    <el-input type="text" v-model="addForm.nationalTaxBureauAddr"></el-input>
                  </el-form-item>
                </td>
                <td class="td-title">税务主管机关电话</td>
                <td class="td-text">
                  <el-form-item prop="address">
                    <el-input type="text" v-model="addForm.nationalTaxBureauTel"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <!--主要人员信息-->
        <div class="item-box">
          <div class="item-t">
            <span class="item-title">主要人员信息</span>
            <!--<el-button type="primary" icon="el-icon-plus" style="margin-left: 50px;"-->
                       <!--@click="addItem('serviceCustomerPersons')">添加-->
            <!--</el-button>-->
          </div>
          <div class="item-d">
            <div v-for="(item, index) in addForm.serviceCustomerPersons"
                 :key="index">
              <table class="com-dialog-table">
                <tr>
                  <td class="td-title">姓名</td>
                  <td class="td-text">
                    <el-form-item prop="name">
                      <el-input type="text" v-model="item.name"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title">职务</td>
                  <td class="td-text">
                    <el-form-item prop="job">
                      <el-input type="text" v-model="item.job"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title">身份证号</td>
                  <td class="td-text">
                    <el-form-item prop="idCard">
                      <el-input type="text" v-model="item.idCard"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td class="td-title">电话</td>
                  <td class="td-text">
                    <el-form-item prop="tel">
                      <el-input type="text" v-model="item.tel"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title"></td>
                  <td class="td-text">
                  </td>
                  <td class="td-title"></td>
                  <td class="td-text">
                  </td>
                </tr>
              </table>
              <!--<el-button v-if="!item.id" type="danger" icon="el-icon-minus" style="margin: -10px 0 10px 10px;"-->
                         <!--@click="deleteItem('serviceCustomerPersons', index)">删除列-->
              <!--</el-button>-->
            </div>
          </div>
        </div>
        <!--分支机构信息-->
        <div class="item-box">
          <div class="item-t">
            <span class="item-title">分支机构信息</span>
            <!--<el-button type="primary" icon="el-icon-plus" style="margin-left: 50px;" @click="addItem('serviceCustomerBranchModels')">添加</el-button>-->
          </div>
          <div class="item-d">
            <div v-for="(item, index) in addForm.serviceCustomerBranchModels"
                 :key="index">
              <table class="com-dialog-table">
                <tr>
                  <td class="td-title">名称</td>
                  <td class="td-text">
                    <el-form-item prop="name">
                      <el-input type="text" v-model="item.name"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title">法定代表人</td>
                  <td class="td-text">
                    <el-form-item prop="legalPerson">
                      <el-input type="text" v-model="item.legalPerson"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title">注册资金</td>
                  <td class="td-text">
                    <el-form-item prop="registeredCapital">
                      <el-input type="text" v-model="item.registeredCapital"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td class="td-title">工商注册号</td>
                  <td class="td-text">
                    <el-form-item prop="businessNumber">
                      <el-input type="text" v-model="item.businessNumber"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title">注册日期</td>
                  <td class="td-text">
                    <el-form-item prop="establishDate">
                      <!--<el-input type="text" v-model="item.establishDate"></el-input>-->
                      <el-date-picker
                        style="width: 100%"
                        v-model="item.establishDate"
                        type="datetime"
                        value-format="timestamp"
                        placeholder="请选择时间">
                      </el-date-picker>
                    </el-form-item>
                  </td>
                  <td class="td-title">地址</td>
                  <td class="td-text">
                    <el-form-item prop="address">
                      <el-input type="text" v-model="item.address"></el-input>
                    </el-form-item>
                  </td>
                </tr>
              </table>
              <!--<el-button v-if="!item.id" type="danger" icon="el-icon-minus" style="margin: -10px 0 10px 10px;"-->
                         <!--@click="deleteItem('serviceCustomerBranchModels', index)">删除列-->
              <!--</el-button>-->
            </div>
          </div>
        </div>
        <!--工商变更信息-->
        <div class="item-box">
          <div class="item-t">
            <span class="item-title">工商变更信息</span>
            <!--<el-button type="primary" icon="el-icon-plus" style="margin-left: 50px;" @click="addItem('serviceCustomerIcUpdateModels')">添加</el-button>-->
          </div>
          <div class="item-d">
            <div v-for="(item, index) in addForm.serviceCustomerIcUpdateModels"
                 :key="index">
              <table class="com-dialog-table">
                <tr>
                  <td class="td-title">变更项目</td>
                  <td class="td-text">
                    <el-form-item prop="name">
                      <el-input type="text" v-model="item.updateProject"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title">变更时间</td>
                  <td class="td-text">
                    <el-form-item prop="updateDate">
                      <el-date-picker
                        style="width: 100%"
                        v-model="item.updateDate"
                        type="datetime"
                        value-format="timestamp"
                        placeholder="请选择时间">
                      </el-date-picker>
                    </el-form-item>
                  </td>
                  <td class="td-title">变更前信息</td>
                  <td class="td-text">
                    <el-form-item prop="beforeMessage">
                      <el-input type="text" v-model="item.beforeMessage"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td class="td-title">变更后信息</td>
                  <td class="td-text">
                    <el-form-item prop="afterMessage">
                      <el-input type="text" v-model="item.afterMessage"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title"></td>
                  <td class="td-text">
                  </td>
                  <td class="td-title"></td>
                  <td class="td-text">
                  </td>
                </tr>
              </table>
              <!--<el-button v-if="!item.id" type="danger" icon="el-icon-minus" style="margin: -10px 0 10px 10px;"-->
                         <!--@click="deleteItem('serviceCustomerIcUpdateModels', index)">删除列-->
              <!--</el-button>-->
            </div>
          </div>
        </div>
        <!--进出口信息-->
        <div class="item-box">
          <div class="item-t">
            <span class="item-title">进出口信息</span>
          </div>
          <div class="item-d">
            <table class="com-dialog-table">
              <tr>
                <td class="td-title">注册日期</td>
                <td class="td-text">
                  <el-form-item prop="ioRegistryDate">
                    <!--<el-input type="text" v-model="addForm.ioRegistryDate"></el-input>-->
                    <el-date-picker
                      style="width: 100%"
                      v-model="addForm.ioRegistryDate"
                      type="datetime"
                      value-format="timestamp"
                      placeholder="请选择时间">
                    </el-date-picker>
                  </el-form-item>
                </td>
                <td class="td-title">海关注册号</td>
                <td class="td-text">
                  <el-form-item prop="ioRegistryAcount">
                    <el-input type="text" v-model="addForm.ioRegistryAcount"></el-input>
                  </el-form-item>
                </td>
                <td class="td-title">注册海关</td>
                <td class="td-text">
                  <el-form-item prop="ioRegistryCustoms">
                    <el-input type="text" v-model="addForm.ioRegistryCustoms"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td class="td-title">行政区划</td>
                <td class="td-text">
                  <el-form-item prop="ioCanton">
                    <el-input type="text" v-model="addForm.ioCanton"></el-input>
                  </el-form-item>
                </td>
                <td class="td-title">经济区划</td>
                <td class="td-text">
                  <el-form-item prop="ioEconomy">
                    <el-input type="text" v-model="addForm.ioEconomy"></el-input>
                  </el-form-item>
                </td>
                <td class="td-title">经营类别</td>
                <td class="td-text">
                  <el-form-item prop="ioBusiness">
                    <el-input type="text" v-model="addForm.ioBusiness"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td class="td-title">特殊贸易区域</td>
                <td class="td-text">
                  <el-form-item prop="ioTrade">
                    <el-input type="text" v-model="addForm.ioTrade"></el-input>
                  </el-form-item>
                </td>
                <td class="td-title">行业种类</td>
                <td class="td-text">
                  <el-form-item prop="ioCategory">
                    <el-input type="text" v-model="addForm.ioCategory"></el-input>
                  </el-form-item>
                </td>
                <td class="td-title">报关有限期</td>
                <td class="td-text">
                  <el-form-item prop="ioExpiry">
                    <el-input type="text" v-model="addForm.ioExpiry"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td class="td-title">海关注销标识</td>
                <td class="td-text">
                  <el-form-item prop="ioCancelMark">
                    <el-input type="text" v-model="addForm.ioCancelMark"></el-input>
                  </el-form-item>
                </td>
                <td class="td-title">年报情况</td>
                <td class="td-text">
                  <el-form-item prop="ioYearSituation">
                    <el-input type="text" v-model="addForm.ioYearSituation"></el-input>
                  </el-form-item>
                </td>
                <td class="td-title">跨境贸易电子商务类型</td>
                <td class="td-text">
                  <el-form-item prop="ioEcommerceType">
                    <el-input type="text" v-model="addForm.ioEcommerceType"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <!--产品信息-->
        <div class="item-box">
          <div class="item-t">
            <span class="item-title">产品信息</span>
            <!--<el-button type="primary" icon="el-icon-plus" style="margin-left: 50px;" @click="addItem('serviceCustomerProductModels')">添加</el-button>-->
          </div>
          <div class="item-d">
            <div v-for="(item, index) in addForm.serviceCustomerProductModels"
                 :key="index">
              <table class="com-dialog-table">
                <tr>
                  <td class="td-title">产品名称</td>
                  <td class="td-text">
                    <el-form-item prop="name">
                      <el-input type="text" v-model="item.name"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title">产品类别</td>
                  <td class="td-text">
                    <el-form-item prop="type">
                      <el-input type="text" v-model="item.type"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title">领域</td>
                  <td class="td-text">
                    <el-form-item prop="field">
                      <el-input type="text" v-model="item.field"></el-input>
                    </el-form-item>
                  </td>
                </tr>
              </table>
              <!--<el-button v-if="!item.id" type="danger" icon="el-icon-minus" style="margin: -10px 0 10px 10px;"-->
                         <!--@click="deleteItem('serviceCustomerProductModels', index)">删除列-->
              <!--</el-button>-->
            </div>
          </div>
        </div>
        <div class="item-box">
          <div class="item-t">
            <span class="item-title">微信公众号</span>
            <!--<el-button type="primary" icon="el-icon-plus" style="margin-left: 50px;" @click="addItem('serviceCustomerWechatModels')">添加</el-button>-->
          </div>
          <div class="item-d">
            <div v-for="(item, index) in addForm.serviceCustomerWechatModels"
                 :key="index">
              <table class="com-dialog-table">
                <tr>
                  <td class="td-title">微信号名称</td>
                  <td class="td-text">
                    <el-form-item prop="wechatName">
                      <el-input type="text" v-model="item.wechatName"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title">微信号</td>
                  <td class="td-text">
                    <el-form-item prop="wechatAccount">
                      <el-input type="text" v-model="item.wechatAccount"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title">帐号主体</td>
                  <td class="td-text">
                    <el-form-item prop="accoutBody">
                      <el-input type="text" v-model="item.accoutBody"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td class="td-title">认证时间</td>
                  <td class="td-text">
                    <el-form-item prop="authenticationTime">
                      <!--<el-input type="text" v-model="item.authenticationTime"></el-input>-->
                      <el-date-picker
                        style="width: 100%"
                        v-model="item.authenticationTime"
                        type="datetime"
                        value-format="timestamp"
                        placeholder="请选择时间">
                      </el-date-picker>
                    </el-form-item>
                  </td>
                  <td class="td-title">功能介绍</td>
                  <td class="td-text">
                    <el-form-item prop="functionMsg">
                      <el-input type="text" v-model="item.functionMsg"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title"></td>
                  <td class="td-text">
                  </td>
                </tr>
              </table>
              <!--<el-button v-if="!item.id" type="danger" icon="el-icon-minus" style="margin: -10px 0 10px 10px;"-->
                         <!--@click="deleteItem('serviceCustomerWechatModels', index)">删除列-->
              <!--</el-button>-->
            </div>
          </div>
        </div>
      </el-form>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px">
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            placeholder="请输入备注"
            :rows="3"
            v-model="ruleForm.remark">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="dialog-footer">
      <el-button type="success" @click="saveSubmitForm('ruleForm', 9)">审核通过</el-button>
      <el-button type="danger" @click="saveSubmitForm('ruleForm', 4)">审核拒绝</el-button>
    </div>
  </div>
</template>

<script>
  import API from '../../../../../utils/api'

  export default {
    name: 'operationCode10_1',
    data () {
      return {
        ruleForm: {
          remark: '',
        },
        rules: {},
      }
    },
    props: ['params'],
    methods: {
      saveSubmitForm (formName, state) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.workOrder.serviceItemOperate(Object.assign({}, this.params.baseParam, {
              remark: this.ruleForm.remark,
              state: state,
              result: this.addForm,
            }), (res) => {
              if (res.status) {
                this.$message.success('操作成功')
                this.$vDialog.close({type: 'itemSave'})
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
    },
    created () {
      this.addForm = this.params.operateItem.result ? JSON.parse(this.params.operateItem.result) : {}
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../../styles/common";

  .operation-code-box {
    padding: 10px;
  }

  .com-dialog-table {
    margin-bottom: 10px;
  }

  .item-title {
    width: 120px;
    box-sizing: border-box;
    padding: 10px 0;
    background-color: #5e5e5e;
    color: #fff;
    text-align: center;
    font-size: 13px;
    display: inline-block;
  }

  .item-box {
    margin-bottom: 20px;
    .item-t {

    }
    .item-d {
      margin-top: 10px;
    }
  }
</style>
