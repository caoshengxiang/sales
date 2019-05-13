<!--
  num-operationCode
-->
<template>
  <div class="com-dialog op-code">
    <div class="operation-code-box">
      <el-form :model="addForm" ref="addForm" label-width="0px" :rules="rules" :disabled="isOnlyShow">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">客户名称</td>
            <td class="td-text">
              <el-form-item prop="name">
                <el-input type="text" v-model="addForm.name"></el-input>
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
                <el-input type="number" v-model.number="addForm.registeredCapital"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">公司状态</td>
            <td class="td-text">
              <el-form-item prop="companyState">
                <!--<el-input type="text" v-model="addForm.companyState"></el-input>-->
                <el-select v-model="addForm.companyState" placeholder="请选择">
                  <el-option  v-for="(li, index) in baseSetingList14" :key="index" :label="li.codeName" :value="li.codeName"></el-option>
                </el-select>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">企业类型</td>
            <td class="td-text">
              <el-form-item prop="typesBusiness">
                <!--<el-input type="text" v-model="addForm.typesBusiness"></el-input>-->
                <el-select v-model="addForm.typesBusiness" placeholder="请选择">
                  <el-option  v-for="(li, index) in baseSetingList13" :key="index" :label="li.codeName" :value="li.codeName"></el-option>
                </el-select>
              </el-form-item>
            <td class="td-title">公司形式</td>
            <td class="td-text">
              <el-form-item prop="mode">
                <!--<el-input type="text" v-model="addForm.mode"></el-input>-->
                <el-select v-model="addForm.mode" placeholder="请选择">
                  <el-option  v-for="(li, index) in baseSetingList12" :key="index" :label="li.codeName" :value="li.codeName"></el-option>
                </el-select>
              </el-form-item>
            </td>
            <td class="td-title">登记机关</td>
            <td class="td-text">
              <el-form-item prop="registryDepartment">
                <el-input type="text" v-model="addForm.registryDepartment"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">营业期限</td>
            <td class="td-text">
              <el-form-item prop="businessTime">
                <el-input type="text" v-model="addForm.businessTime"></el-input>
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
            <td class="td-title">法人代表</td>
            <td class="td-text">
              <el-form-item prop="legalPerson">
                <el-input type="text" v-model="addForm.legalPerson"></el-input>
              </el-form-item>
            </td>
            <td class="td-title">主营业务</td>
            <td class="td-text" :colspan="3">
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
            <el-button type="primary" icon="el-icon-plus" style="margin-left: 50px;"
                       @click="addItem('serviceCustomerBankModels')">添加
            </el-button>
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
                      <!--<el-input type="text" v-model="item.property"></el-input>-->
                      <el-select v-model="item.property" placeholder="请选择">
                        <el-option label="基本账户" value="基本账户"></el-option>
                        <el-option label="一般账户" value="一般账户"></el-option>
                      </el-select>
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
              <el-button v-if="!item.id" type="danger" icon="el-icon-minus" style="margin: -10px 0 10px 10px;"
                         @click="deleteItem('serviceCustomerBankModels', index)">删除列
              </el-button>
            </div>
          </div>
        </div>
        <!--固定资产信息-->
        <div class="item-box">
          <div class="item-t">
            <span class="item-title">固定资产信息</span>
            <el-button type="primary" icon="el-icon-plus" style="margin-left: 50px;"
                       @click="addItem('serviceCustomerFixedAssetsModels')">添加
            </el-button>
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
                      <el-input type="number" v-model.number="item.originalValue"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>
                  <td class="td-title">折旧年限</td>
                  <td class="td-text">
                    <el-form-item prop="year">
                      <el-input type="number" v-model.number="item.year"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title">已折旧年数</td>
                  <td class="td-text">
                    <el-form-item prop="passYear">
                      <el-input type="number" v-model.number="item.passYear"></el-input>
                    </el-form-item>
                  </td>
                  <td class="td-title">残值</td>
                  <td class="td-text">
                    <el-form-item prop="remainValue">
                      <el-input type="number" v-model.number="item.remainValue"></el-input>
                    </el-form-item>
                  </td>
                </tr>
              </table>
              <el-button v-if="!item.id" type="danger" icon="el-icon-minus" style="margin: -10px 0 10px 10px;"
                         @click="deleteItem('serviceCustomerFixedAssetsModels', index)">删除列
              </el-button>
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
            <el-button type="primary" icon="el-icon-plus" style="margin-left: 50px;"
                       @click="addItem('serviceCustomerPersons')">添加
            </el-button>
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
                  <!--<td class="td-title">职务</td>
                  <td class="td-text">
                    <el-form-item prop="job">
                      &lt;!&ndash;<el-input type="text" v-model="item.job"></el-input>&ndash;&gt;
                      <el-select v-model="item.job" placeholder="请选择">
                        <el-option  v-for="(li, index) in baseSetingList11" :key="index" :label="li.codeName" :value="li.codeName"></el-option>
                      </el-select>
                    </el-form-item>
                  </td>
                  <td class="td-title">身份证号</td>
                  <td class="td-text">
                    <el-form-item prop="idCard">
                      <el-input type="text" v-model="item.idCard"></el-input>
                    </el-form-item>
                  </td>
                </tr>
                <tr>-->
                  <td class="td-title">电话</td>
                  <td class="td-text">
                    <el-form-item prop="tel">
                      <el-input type="text" v-model="item.tel"></el-input>
                    </el-form-item>
                  </td><!--
                  <td class="td-title"></td>
                  <td class="td-text">
                  </td>
                  <td class="td-title"></td>
                  <td class="td-text">
                  </td>-->
                </tr>
              </table>
              <el-button v-if="!item.id" type="danger" icon="el-icon-minus" style="margin: -10px 0 10px 10px;"
                         @click="deleteItem('serviceCustomerPersons', index)">删除列
              </el-button>
            </div>
          </div>
        </div>
        <!--分支机构信息-->
        <div class="item-box">
          <div class="item-t">
            <span class="item-title">分支机构信息</span>
            <el-button type="primary" icon="el-icon-plus" style="margin-left: 50px;" @click="addItem('serviceCustomerBranchModels')">添加</el-button>
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
              <el-button v-if="!item.id" type="danger" icon="el-icon-minus" style="margin: -10px 0 10px 10px;"
                         @click="deleteItem('serviceCustomerBranchModels', index)">删除列
              </el-button>
            </div>
          </div>
        </div>
        <!--工商变更信息-->
        <div class="item-box">
          <div class="item-t">
            <span class="item-title">工商变更信息</span>
            <el-button type="primary" icon="el-icon-plus" style="margin-left: 50px;" @click="addItem('serviceCustomerIcUpdateModels')">添加</el-button>
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
              <el-button v-if="!item.id" type="danger" icon="el-icon-minus" style="margin: -10px 0 10px 10px;"
                         @click="deleteItem('serviceCustomerIcUpdateModels', index)">删除列
              </el-button>
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
            <el-button type="primary" icon="el-icon-plus" style="margin-left: 50px;" @click="addItem('serviceCustomerProductModels')">添加</el-button>
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
                      <!--<el-input type="text" v-model="item.type"></el-input>-->
                      <el-select v-model="item.type" placeholder="请选择">
                        <el-option  v-for="(li, index) in baseSetingList10" :key="index" :label="li.codeName" :value="li.codeName"></el-option>
                      </el-select>
                    </el-form-item>
                  </td>
                  <td class="td-title">领域</td>
                  <td class="td-text">
                    <el-form-item prop="field">
                      <!--<el-input type="text" v-model="item.field"></el-input>-->
                      <el-select v-model="item.field" placeholder="请选择">
                        <el-option  v-for="(li, index) in baseSetingList9" :key="index" :label="li.codeName" :value="li.codeName"></el-option>
                      </el-select>
                    </el-form-item>
                  </td>
                </tr>
              </table>
              <el-button v-if="!item.id" type="danger" icon="el-icon-minus" style="margin: -10px 0 10px 10px;"
                         @click="deleteItem('serviceCustomerProductModels', index)">删除列
              </el-button>
            </div>
          </div>
        </div>
        <div class="item-box">
          <div class="item-t">
            <span class="item-title">微信公众号</span>
            <el-button type="primary" icon="el-icon-plus" style="margin-left: 50px;" @click="addItem('serviceCustomerWechatModels')">添加</el-button>
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
              <el-button v-if="!item.id" type="danger" icon="el-icon-minus" style="margin: -10px 0 10px 10px;"
                         @click="deleteItem('serviceCustomerWechatModels', index)">删除列
              </el-button>
            </div>
          </div>
        </div>
      </el-form>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80"  v-if="!isOnlyShow">
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
      <el-button v-if="!isOnlyShow" class="save-button" @click="saveSubmitForm('addForm')">确 定</el-button>
    </div>
  </div>
</template>

<script>
  import API from '../../../../../utils/api'
  // import { chartLengthRule } from '../../../../../utils/const'

  export default {
    name: 'operationCode1_1',
    data () {
      return {
        isOnlyShow: false,
        customersList: [],
        addForm: {
        },
        ruleForm: {
          remark: '',
        },
        rules: {
          // name: [ // 开户银行
          //   {required: true, message: '***', trigger: 'blur'},
          // ],
          // customerId: [
          //   {required: true, message: '客户不存在', trigger: 'blur'},
          // ],
          // contacterName: [
          //   {required: true, message: '请输入联系人姓名', trigger: 'blur'},
          // ],
          name: [
            {required: true, message: '请输入客户名称', trigger: 'blur'},
          ],
          businessLicense: [
            {required: true, message: '请输入营业执照', trigger: 'blur'},
          ],
          registryAddress: [
            {required: true, message: '请输入注册地址', trigger: 'blur'},
          ],
          workAddress: [
            {required: true, message: '请输入办公地址', trigger: 'blur'},
          ],
          produceAddress: [
            {required: true, message: '请输入生产地址', trigger: 'blur'},
          ],
          creditCode: [
            {required: true, message: '请输入统一社会编码', trigger: 'blur'},
          ],
          checkTime: [
            {required: true, message: '请输入核准时间', trigger: 'blur'},
          ],
          registryTime: [
            {required: true, message: '请输入注册时间', trigger: 'blur'},
          ],
          registeredCapital: [
            {required: true, message: '请输入注册资本', trigger: 'blur'},
          ],
          companyState: [
            {required: true, message: '请输入公司状态', trigger: 'blur'},
          ],
          typesBusiness: [
            {required: true, message: '请输入企业类型', trigger: 'blur'},
          ],
          businessTime: [
            {required: true, message: '请输入营业期限', trigger: 'blur'},
          ],
          mode: [
            {required: true, message: '请输入公司形式', trigger: 'blur'},
          ],
          registryDepartment: [
            {required: true, message: '请输入登记机关', trigger: 'blur'},
          ],
          businessScope: [
            {required: true, message: '请输入营业范围', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入电话', trigger: 'blur'},
          ],
          industry: [
            {required: true, message: '请输入行业门类', trigger: 'blur'},
          ],
          legalPerson: [
            {required: true, message: '请输入法人代表', trigger: 'blur'},
          ],
          business: [
            {required: true, message: '请输入主营业务', trigger: 'blur'},
          ],
        },
        baseSetingList9: [],
        baseSetingList10: [],
        baseSetingList11: [],
        baseSetingList12: [],
        baseSetingList13: [],
        baseSetingList14: [],
      }
    },
    props: ['params'],
    methods: {
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.serviceCustomer.checkParmasBeforeSubmit(this.addForm, (data) => {
              if (data.status) {
                API.workOrder.serviceItemOperate(Object.assign({}, this.params.baseParam, {
                  remark: this.ruleForm.remark,
                  result: JSON.stringify(Object.assign({}, this.addForm)),
                }), (res) => {
                  if (res.status) {
                    this.$message.success('操作成功')
                    this.$vDialog.close({type: 'itemSave'})
                  }
                })
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getCustormerDetail (id) {
        API.serviceCustomer.detail(id, (data) => {
          this.addForm = data.data
        })
      },
      addItem (models) {
        let that = this
        switch (models) {
          case 'serviceCustomerBankModels':
            if (!that.addForm.serviceCustomerBankModels) {
              this.$set(this.addForm, 'serviceCustomerBankModels', [])
            }
            that.addForm.serviceCustomerBankModels.unshift({
              accountCheckId: '',
              accountId: '',
              address: '',
              name: '',
              property: '',
            })
            break
          case 'serviceCustomerFixedAssetsModels':
            if (!that.addForm.serviceCustomerFixedAssetsModels) {
              this.$set(this.addForm, 'serviceCustomerFixedAssetsModels', [])
            }
            that.addForm.serviceCustomerFixedAssetsModels.unshift({
              buyingDate: '',
              name: '',
              originalValue: '',
              passYear: '',
              year: '',
              remainValue: '',
            })
            break
          case 'serviceCustomerPersons':
            if (!that.addForm.serviceCustomerPersons) {
              this.$set(this.addForm, 'serviceCustomerPersons', [])
            }
            that.addForm.serviceCustomerPersons.unshift({
              name: '',
              job: '',
              idCard: '',
              tel: '',
            })
            break
          case 'serviceCustomerBranchModels':
            if (!that.addForm.serviceCustomerBranchModels) {
              this.$set(this.addForm, 'serviceCustomerBranchModels', [])
            }
            that.addForm.serviceCustomerBranchModels.unshift({
              name: '',
              legalPerson: '',
              registeredCapital: '',
              businessNumber: '',
              establishDate: '',
              address: '',
            })
            break
          case 'serviceCustomerIcUpdateModels':
            if (!that.addForm.serviceCustomerIcUpdateModels) {
              this.$set(this.addForm, 'serviceCustomerIcUpdateModels', [])
            }
            that.addForm.serviceCustomerIcUpdateModels.unshift({
              updateProject: '',
              updateDate: '',
              beforeMessage: '',
              afterMessage: '',
            })
            break
          case 'serviceCustomerProductModels':
            if (!that.addForm.serviceCustomerProductModels) {
              this.$set(this.addForm, 'serviceCustomerProductModels', [])
            }
            that.addForm.serviceCustomerProductModels.unshift({
              name: '',
              field: '',
              type: '',
            })
            break
          case 'serviceCustomerWechatModels':
            if (!that.addForm.serviceCustomerWechatModels) {
              this.$set(this.addForm, 'serviceCustomerWechatModels', [])
            }
            that.addForm.serviceCustomerWechatModels.unshift({
              wechatName: '',
              wechatAccount: '',
              accoutBody: '',
              authenticationTime: '',
              functionMsg: '',
            })
            break
          default:
        }
      },
      deleteItem (models, index) {
        if (!this.addForm[models]) {
          this.addForm[models] = []
        }
        this.addForm[models].splice(index, 1)
      },
      getCodeConfig () { // 配置接口
        API.baseSetting.getCodeConfig({type: 9}, (res) => { // 6 领域
          if (res.status) {
            this.baseSetingList9 = res.data
          }
        })
        API.baseSetting.getCodeConfig({type: 10}, (res) => { // 6 领域
          if (res.status) {
            this.baseSetingList10 = res.data
          }
        })
        API.baseSetting.getCodeConfig({type: 11}, (res) => { // 6 领域
          if (res.status) {
            this.baseSetingList11 = res.data
          }
        })
        API.baseSetting.getCodeConfig({type: 12}, (res) => { // 6 领域
          if (res.status) {
            this.baseSetingList12 = res.data
          }
        })
        API.baseSetting.getCodeConfig({type: 13}, (res) => { // 6 领域
          if (res.status) {
            this.baseSetingList13 = res.data
          }
        })
        API.baseSetting.getCodeConfig({type: 14}, (res) => { // 6 领域
          if (res.status) {
            this.baseSetingList14 = res.data
          }
        })
      },
    },
    created () {
      if (this.params.type === 'add') {
        if (this.params.customerId) {
          this.getCustormerDetail(this.params.customerId)
        }
      } else if (this.params.type === 'edit') {
        this.addForm = this.params.result ? JSON.parse(this.params.result) : {}
      } else if (this.params.type === 'show') {
        this.addForm = this.params.result ? JSON.parse(this.params.result) : {}
        this.isOnlyShow = true
      }
      // 获取配置
      this.getCodeConfig()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../../styles/common";

  .operation-code-box {
    padding: 10px;
  }
</style>
<style lang="scss" rel="stylesheet/scss">
  .op-code {
    .el-form-item--small.el-form-item {
      margin-bottom: 0;
    }
    .el-form-item {
      margin-bottom: 0;
    }
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
