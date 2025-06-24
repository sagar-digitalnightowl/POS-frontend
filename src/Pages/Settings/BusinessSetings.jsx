import React, { useState } from 'react'
import Header from '../../Components/Header'
import Sidebar from '../../Components/Sidebar'
import Footer from '../../Components/Footer'
import { Link } from 'react-router-dom'
import { FaCalendar, FaClock, FaEdit, FaInfoCircle, FaMoneyBillAlt, FaPlusCircle, FaSearch, } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalculator, faClock, faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const BusinessSetings = () => {
  const [activeTab, setActiveTab] = useState('business');

  const textStyle= {color:'black'}
  
  return (
<div style={textStyle}>
<div className="wrapper thetop">
 <Header/>
 <Sidebar/>
  <div className=" content-wrapper ">
    <input type="hidden" id="view_export_buttons" />
    <section className="content-header">
      <h1>Business Settings</h1>
      <br />
      <div className="row">
        <div className="col-md-8 col-xs-12 col-md-offset-2">
          <div className="input-group">
            <span className="input-group-addon">
              <FaSearch/>
            </span>
            <select id="search_settings"className="form-control"style={{ width: "100%" }}/>
          </div>
        </div>
      </div>
    </section>
    <section className="content">
      <form method="POST" action="https://medipro.affinity-me.com/business/update"
        acceptCharset="UTF-8"id="bussiness_edit_form"encType="multipart/form-data">
        <div className="row">
          <div className="col-xs-12">
            <div className="col-xs-12 pos-tab-container">
              <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 pos-tab-menu">
                <div className="list-group">
                <Link to="#" className={`list-group-item text-center ${activeTab === 'business' ? 'active' : ''}`} onClick={() => setActiveTab('business')}>
                  Business
                </Link>
                <Link to="#" className={`list-group-item text-center ${activeTab === 'tax' ? 'active' : ''}`} onClick={() => setActiveTab('tax')}>
                    Tax
                    <FaInfoCircle aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                      data-content="Registered tax number for your business."data-html="true"data-trigger="hover"
                    />
                  </Link>
                  <Link to="#" className={`list-group-item text-center ${activeTab === 'product' ? 'active' : ''}`} onClick={() => setActiveTab('product')}>Product</Link>
                  <Link to="#" className={`list-group-item text-center ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => setActiveTab('contact')}>Contact</Link>
                  <Link to="#" className={`list-group-item text-center ${activeTab === 'sale' ? 'active' : ''}`} onClick={() => setActiveTab('sale')}>Sale</Link>
                  <Link to="#" className={`list-group-item text-center ${activeTab === 'pos' ? 'active' : ''}`} onClick={() => setActiveTab('pos')}>POS</Link>
                  <Link to="#" className={`list-group-item text-center ${activeTab === 'purchase' ? 'active' : ''}`} onClick={() => setActiveTab('purchase')}>Purchases</Link>
                  <Link to="#" className={`list-group-item text-center ${activeTab === 'payment' ? 'active' : ''}`} onClick={() => setActiveTab('payment')}>Payment</Link>
                  <Link to="#" className={`list-group-item text-center ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Dashboard</Link>
                  <Link to="#" className={`list-group-item text-center ${activeTab === 'system' ? 'active' : ''}`} onClick={() => setActiveTab('system')}>System</Link>
                  <Link to="#" className={`list-group-item text-center ${activeTab === 'prefixes' ? 'active' : ''}`} onClick={() => setActiveTab('prefixes')}>Prefixes</Link>
                  <Link to="#" className={`list-group-item text-center ${activeTab === 'emailSettings' ? 'active' : ''}`} onClick={() => setActiveTab('emailSettings')}>Email Settings</Link>
                  <Link to="#" className={`list-group-item text-center ${activeTab === 'smsSettings' ? 'active' : ''}`} onClick={() => setActiveTab('smsSettings')}>SMS Settings</Link>
                  <Link to="#" className={`list-group-item text-center ${activeTab === 'rewardPointSetting' ? 'active' : ''}`} onClick={() => setActiveTab('rewardPointSetting')}>Reward Point Settings</Link>
                  <Link to="#" className={`list-group-item text-center ${activeTab === 'module' ? 'active' : ''}`} onClick={() => setActiveTab('module')}>Modules</Link>
                  <Link to="#" className={`list-group-item text-center ${activeTab === 'customLables' ? 'active' : ''}`} onClick={() => setActiveTab('customLables')}>Custom Labels</Link>
                </div>
              </div>
              <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10 pos-tab" id="business" style={{ display: activeTab === 'business' ? 'block' : 'none' }}>
              <div>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="name">Business Name:*</label>
                        <input
                          className="form-control"
                          required=""
                          placeholder="Business Name"
                          name="name"
                          type="text"
                          defaultValue="MIDDLE PEARL TRADING COMPANY W.L.L"
                          id="name"
                        />
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="start_date">Start Date:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <FaCalendar/>
                          </span>
                          <input className="form-control start-date-picker"placeholder="Start Date"
                            readOnly=""name="start_date"type="text"defaultValue="29/10/2023"id="start_date"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="default_profit_percent">Default profit percent:*</label>
                        <FaInfoCircle aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                          data-content="Default profit margin of a product. <br><small class='text-muted'>Used to calculate selling price based on purchase price entered.<br/> You can modify this value for indivisual products while adding</small>"
                          data-html="true"data-trigger="hover"
                        />
                        <div className="input-group">
                          <span className="input-group-addon">
                            <FaPlusCircle/>
                          </span>
                          <input className="form-control input_number"name="default_profit_percent"
                            type="text"defaultValue={25.0}id="default_profit_percent"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="currency_id">Currency:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <FaMoneyBillAlt/>
                          </span>
                          <select className="form-control select2"required=""id="currency_id"name="currency_id">
                            <option value="">Currency</option>
                            <option value={3}>Afghanistan - Afghanis(AF)</option>
                            <option value={1}>Albania - Leke(ALL) </option>
                            <option value={135}>Algerie - Algerian dinar(DZD)</option>
                            <option value={2}>America - Dollars(USD) </option>
                            <option value={139}>Angola - Kwanza(AOA) </option>
                            <option value={4}>Argentina - Pesos(ARS) </option>
                            <option value={5}>Aruba - Guilders(AWG) </option>
                            <option value={6}>Australia - Dollars(AUD) </option>
                            <option value={7}>Azerbaijan - New Manats(AZ)</option>
                            <option value={8}>Bahamas - Dollars(BSD) </option>
                            <option value={141}>Bahrain - Bahraini dinar(BHD)</option>
                            <option value={134}>Bangladesh - Taka(BDT) </option>
                            <option value={9}>Barbados - Dollars(BBD) </option>
                            <option value={10}>Belarus - Rubles(BYR) </option>
                            <option value={11}>Belgium - Euro(EUR) </option>
                            <option value={12}>Beliz - Dollars(BZD) </option>
                            <option value={13}>Bermuda - Dollars(BMD) </option>
                            <option value={14}>Bolivia - Bolivianos(BOB)</option>
                            <option value={15}>Bosnia and Herzegovina - Convertible Marka(BAM)</option>
                            <option value={16}>Botswana - Pula's(BWP) </option>
                            <option value={18}>Brazil - Reais(BRL) </option>
                            <option value={19}>Britain [United Kingdom] - Pounds(GBP)</option>
                            <option value={20}>Brunei Darussalam - Dollars(BND)</option>
                            <option value={17}>Bulgaria - Leva(BG) </option>
                            <option value={21}>Cambodia - Riels(KHR) </option>
                            <option value={22}>Canada - Dollars(CAD) </option>
                            <option value={23}>Cayman Islands - Dollars(KYD)</option>
                            <option value={24}>Chile - Pesos(CLP) </option>
                            <option value={25}>China - Yuan Renminbi(CNY)</option>
                            <option value={26}>Colombia - Pesos(COP) </option>
                            <option value={27}>Costa Rica - Colón(CRC) </option>
                            <option value={28}>Croatia - Kuna(HRK) </option>
                            <option value={29}>Cuba - Pesos(CUP) </option>
                            <option value={30}>Cyprus - Euro(EUR) </option>
                            <option value={31}>Czech Republic - Koruny(CZK)</option>
                            <option value={32}>Denmark - Kroner(DKK) </option>
                            <option value={33}>Dominican Republic - Pesos(DOP )</option>
                            <option value={34}>East Caribbean - Dollars(XCD)</option>
                            <option value={35}>Egypt - Pounds(EGP) </option>
                            <option value={36}>El Salvador - Colones(SVC)</option>
                            <option value={37}>England [United Kingdom] - Pounds(GBP)</option>
                            <option value={38}>Euro - Euro(EUR) </option>
                            <option value={39}>
                              Falkland Islands - Pounds(FKP){" "}
                            </option>
                            <option value={40}>Fiji - Dollars(FJD) </option>
                            <option value={41}>France - Euro(EUR) </option>
                            <option value={42}>Ghana - Cedis(GHS) </option>
                            <option value={43}>Gibraltar - Pounds(GIP) </option>
                            <option value={44}>Greece - Euro(EUR) </option>
                            <option value={45}>Guatemala - Quetzales(GTQ)</option>
                            <option value={46}>Guernsey - Pounds(GGP) </option>
                            <option value={47}>Guyana - Dollars(GYD) </option>
                            <option value={48}>Holland [Netherlands] - Euro(EUR)</option>
                            <option value={49}>Honduras - Lempiras(HNL)</option>
                            <option value={50}>Hong Kong - Dollars(HKD)</option>
                            <option value={51}>Hungary - Forint(HUF) </option>
                            <option value={52}>Iceland - Kronur(ISK) </option>
                            <option value={53}>India - Rupees(INR) </option>
                            <option value={54}>Indonesia - Rupiahs(IDR)</option>
                            <option value={55}>Iran - Rials(IRR) </option>
                            <option value={132}>Iraq - Iraqi dinar(IQD)</option>
                            <option value={56}>Ireland - Euro(EUR) </option>
                            <option value={57}>Isle of Man - Pounds(IMP)</option>
                            <option value={58}>Israel - New Shekels(ILS)</option>
                            <option value={59}>Italy - Euro(EUR) </option>
                            <option value={60}>Jamaica - Dollars(JMD) </option>
                            <option value={61}>Japan - Yen(JPY) </option>
                            <option value={62}>Jersey - Pounds(JEP) </option>
                            <option value={63}>Kazakhstan - Tenge(KZT) </option>
                            <option value={133}>Kenya - Kenyan shilling(KES)</option>
                            <option value={64}>Korea [North] - Won(KPW)</option>
                            <option value={65}>Korea [South] - Won(KRW)</option>
                            <option value={140}>Kuwait - Kuwaiti dinar(KWD)</option>
                            <option value={66}>Kyrgyzstan - Soms(KGS) </option>
                            <option value={67}>Laos - Kips(LAK) </option>
                            <option value={68}>Latvia - Lati(LVL) </option>
                            <option value={69}>Lebanon - Pounds(LBP) </option>
                            <option value={70}>Liberia - Dollars(LRD) </option>
                            <option value={71}>Liechtenstein - Switzerland Francs(CHF)</option>
                            <option value={72}>Lithuania - Litai(LTL) </option>
                            <option value={73}>Luxembourg - Euro(EUR) </option>
                            <option value={74}>Macedonia - Denars(MKD) </option>
                            <option value={75}>Malaysia - Ringgits(MYR)</option>
                            <option value={76}>Malta - Euro(EUR) </option>
                            <option value={77}>Mauritius - Rupees(MUR) </option>
                            <option value={78}>Mexico - Pesos(MXN) </option>
                            <option value={79}>Mongolia - Tugriks(MNT) </option>
                            <option value={80}>Mozambique - Meticais(MZ)</option>
                            <option value={81}>Namibia - Dollars(NAD) </option>
                            <option value={82}>Nepal - Rupees(NPR) </option>
                            <option value={84}>Netherlands - Euro(EUR) </option>
                            <option value={83}>Netherlands Antilles - Guilders(ANG)</option>
                            <option value={85}>New Zealand - Dollars(NZD)</option>
                            <option value={86}>Nicaragua - Cordobas(NIO)</option>
                            <option value={87}>Nigeria - Nairas(NGN) </option>
                            <option value={88}>North Korea - Won(KPW) </option>
                            <option value={89}>Norway - Krone(NOK) </option>
                            <option value={90}>Oman - Rials(OMR) </option>
                            <option value={91}>Pakistan - Rupees(PKR) </option>
                            <option value={92}>Panama - Balboa(PAB) </option>
                            <option value={93}>Paraguay - Guarani(PYG) </option>
                            <option value={94}>Peru - Nuevos Soles(PE) </option>
                            <option value={95}>Philippines - Pesos(PHP)</option>
                            <option value={96}>Poland - Zlotych(PL) </option>
                            <option value={97}>Qatar - Rials(QAR) </option>
                            <option value={98}>Romania - New Lei(RO) </option>
                            <option value={99}>Russia - Rubles(RUB) </option>
                            <option value={100}>Saint Helena - Pounds(SHP)</option>
                            <option value={101}>Saudi Arabia - Riyals(SAR)</option>
                            <option value={102}>Serbia - Dinars(RSD) </option>
                            <option value={103}>Seychelles - Rupees(SCR)</option>
                            <option value={104}>Singapore - Dollars(SGD)</option>
                            <option value={105}>Slovenia - Euro(EUR) </option>
                            <option value={106}>Solomon Islands - Dollars(SBD)</option>
                            <option value={107}>Somalia - Shillings(SOS)</option>
                            <option value={108}>South Africa - Rand(ZAR)</option>
                            <option value={109}>South Korea - Won(KRW) </option>
                            <option value={110}>Spain - Euro(EUR) </option>
                            <option value={111}>Sri Lanka - Rupees(LKR)</option>
                            <option value={114}>Suriname - Dollars(SRD)</option>
                            <option value={112}>Sweden - Kronor(SEK) </option>
                            <option value={113}>Switzerland - Francs(CHF)</option>
                            <option value={115}>Syria - Pounds(SYP) </option>
                            <option value={116}>Taiwan - New Dollars(TWD)</option>
                            <option value={138}>Tanzania - Tanzanian shilling(TZS)</option>
                            <option value={117}>Thailand - Baht(THB) </option>
                            <option value={118}>Trinidad and Tobago - Dollars(TTD)</option>
                            <option value={119}>Turkey - Lira(TRY) </option>
                            <option value={120}>Turkey - Liras(TRL) </option>
                            <option value={121}>Tuvalu - Dollars(TVD) </option>
                            <option value={137}>Uganda - Uganda shillings(UGX)</option>
                            <option value={122}>Ukraine - Hryvnia(UAH) </option>
                            <option value={136}>United Arab Emirates - United Arab Emirates dirham(AED)</option>
                            <option value={123}>United Kingdom - Pounds(GBP){" "}</option>
                            <option value={124}>United States of America - Dollars(USD)</option>
                            <option value={125}>Uruguay - Pesos(UYU) </option>
                            <option value={126}>Uzbekistan - Sums(UZS) </option>
                            <option value={127}>Vatican City - Euro(EUR)</option>
                            <option value={128}>Venezuela - Bolivares Fuertes(VEF)</option>
                            <option value={129}>Vietnam - Dong(VND) </option>
                            <option value={130}>Yemen - Rials(YER) </option>
                            <option value={131}>Zimbabwe - Zimbabwe Dollars(ZWD)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="currency_symbol_placement">Currency Symbol Placement:</label>
                        <select className="form-control select2"required=""id="currency_symbol_placement"name="currency_symbol_placement">
                          <option value="before" selected="selected">Before amount</option>
                          <option value="after">After amount</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="time_zone">Time zone:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <FaClock/>
                          </span>
                          <select className="form-control select2"required=""id="time_zone"name="time_zone">
                            <option value="Africa/Abidjan">Africa/Abidjan</option>
                            <option value="Africa/Accra">Africa/Accra</option>
                            <option value="Africa/Addis_Ababa">Africa/Addis_Ababa</option>
                            <option value="Africa/Algiers">Africa/Algiers</option>
                            <option value="Africa/Asmara">Africa/Asmara</option>
                            <option value="Africa/Bamako">Africa/Bamako</option>
                            <option value="Africa/Bangui">Africa/Bangui</option>
                            <option value="Africa/Banjul">Africa/Banjul</option>
                            <option value="Africa/Bissau">Africa/Bissau</option>
                            <option value="Africa/Blantyre">Africa/Blantyre</option>
                            <option value="Africa/Brazzaville">Africa/Brazzaville</option>
                            <option value="Africa/Bujumbura">Africa/Bujumbura</option>
                            <option value="Africa/Cairo">Africa/Cairo</option>
                            <option value="Africa/Casablanca">Africa/Casablanca</option>
                            <option value="Africa/Ceuta">Africa/Ceuta</option>
                            <option value="Africa/Conakry">Africa/Conakry</option>
                            <option value="Africa/Dakar">Africa/Dakar</option>
                            <option value="Africa/Dar_es_Salaam">Africa/Dar_es_Salaam</option>
                            <option value="Africa/Djibouti">Africa/Djibouti</option>
                            <option value="Africa/Douala">Africa/Douala</option>
                            <option value="Africa/El_Aaiun">Africa/El_Aaiun</option>
                            <option value="Africa/Freetown">Africa/Freetown</option>
                            <option value="Africa/Gaborone">Africa/Gaborone</option>
                            <option value="Africa/Harare">Africa/Harare</option>
                            <option value="Africa/Johannesburg">Africa/Johannesburg</option>
                            <option value="Africa/Juba">Africa/Juba</option>
                            <option value="Africa/Kampala">Africa/Kampala</option>
                            <option value="Africa/Khartoum">Africa/Khartoum</option>
                            <option value="Africa/Kigali">Africa/Kigali</option>
                            <option value="Africa/Kinshasa">Africa/Kinshasa</option>
                            <option value="Africa/Lagos">Africa/Lagos</option>
                            <option value="Africa/Libreville">Africa/Libreville</option>
                            <option value="Africa/Lome">Africa/Lome</option>
                            <option value="Africa/Luanda">Africa/Luanda</option>
                            <option value="Africa/Lubumbashi">Africa/Lubumbashi</option>
                            <option value="Africa/Lusaka">Africa/Lusaka</option>
                            <option value="Africa/Malabo">Africa/Malabo</option>
                            <option value="Africa/Maputo">Africa/Maputo</option>
                            <option value="Africa/Maseru">Africa/Maseru</option>
                            <option value="Africa/Mbabane">Africa/Mbabane</option>
                            <option value="Africa/Mogadishu">Africa/Mogadishu</option>
                            <option value="Africa/Monrovia">Africa/Monrovia</option>
                            <option value="Africa/Nairobi">Africa/Nairobi</option>
                            <option value="Africa/Ndjamena">Africa/Ndjamena</option>
                            <option value="Africa/Niamey">Africa/Niamey</option>
                            <option value="Africa/Nouakchott">Africa/Nouakchott</option>
                            <option value="Africa/Ouagadougou">Africa/Ouagadougou</option>
                            <option value="Africa/Porto-Novo">Africa/Porto-Novo</option>
                            <option value="Africa/Sao_Tome">Africa/Sao_Tome</option>
                            <option value="Africa/Tripoli">Africa/Tripoli</option>
                            <option value="Africa/Tunis">Africa/Tunis</option>
                            <option value="Africa/Windhoek">Africa/Windhoek</option>
                            <option value="America/Adak">America/Adak</option>
                            <option value="America/Anchorage">America/Anchorage</option>
                            <option value="America/Anguilla">America/Anguilla</option>
                            <option value="America/Antigua">America/Antigua</option>
                            <option value="America/Araguaina">America/Araguaina</option>
                            <option value="America/Argentina/Buenos_Aires">America/Argentina/Buenos_Aires</option>
                            <option value="America/Argentina/Catamarca">America/Argentina/Catamarca</option>
                            <option value="America/Argentina/Cordoba">America/Argentina/Cordoba</option>
                            <option value="America/Argentina/Jujuy">America/Argentina/Jujuy</option>
                            <option value="America/Argentina/La_Rioja">America/Argentina/La_Rioja</option>
                            <option value="America/Argentina/Mendoza">America/Argentina/Mendoza</option>
                            <option value="America/Argentina/Rio_Gallegos">America/Argentina/Rio_Gallegos</option>
                            <option value="America/Argentina/Salta">America/Argentina/Salta</option>
                            <option value="America/Argentina/San_Juan">America/Argentina/San_Juan</option>
                            <option value="America/Argentina/San_Luis">America/Argentina/San_Luis</option>
                            <option value="America/Argentina/Tucuman">America/Argentina/Tucuman</option>
                            <option value="America/Argentina/Ushuaia">America/Argentina/Ushuaia</option>
                            <option value="America/Aruba">America/Aruba</option>
                            <option value="America/Asuncion">America/Asuncion</option>
                            <option value="America/Atikokan">America/Atikokan</option>
                            <option value="America/Bahia">America/Bahia</option>
                            <option value="America/Bahia_Banderas">America/Bahia_Banderas</option>
                            <option value="America/Barbados">America/Barbados</option>
                            <option value="America/Belem">America/Belem</option>
                            <option value="America/Belize">America/Belize</option>
                            <option value="America/Blanc-Sablon">America/Blanc-Sablon</option>
                            <option value="America/Boa_Vista">America/Boa_Vista</option>
                            <option value="America/Bogota">America/Bogota</option>
                            <option value="America/Boise">America/Boise</option>
                            <option value="America/Cambridge_Bay">America/Cambridge_Bay</option>
                            <option value="America/Campo_Grande">America/Campo_Grande</option>
                            <option value="America/Cancun">America/Cancun</option>
                            <option value="America/Caracas">America/Caracas</option>
                            <option value="America/Cayenne">America/Cayenne</option>
                            <option value="America/Cayman">America/Cayman</option>
                            <option value="America/Chicago">America/Chicago</option>
                            <option value="America/Chihuahua">America/Chihuahua</option>
                            <option value="America/Ciudad_Juarez">America/Ciudad_Juarez</option>
                            <option value="America/Costa_Rica">America/Costa_Rica</option>
                            <option value="America/Creston">America/Creston</option>
                            <option value="America/Cuiaba">America/Cuiaba</option>
                            <option value="America/Curacao">America/Curacao</option>
                            <option value="America/Danmarkshavn">America/Danmarkshavn</option>
                            <option value="America/Dawson">America/Dawson</option>
                            <option value="America/Dawson_Creek">America/Dawson_Creek</option>
                            <option value="America/Denver">America/Denver</option>
                            <option value="America/Detroit">America/Detroit</option>
                            <option value="America/Dominica">America/Dominica</option>
                            <option value="America/Edmonton">America/Edmonton</option>
                            <option value="America/Eirunepe">America/Eirunepe</option>
                            <option value="America/El_Salvador">America/El_Salvador</option>
                            <option value="America/Fort_Nelson">America/Fort_Nelson</option>
                            <option value="America/Fortaleza">America/Fortaleza</option>
                            <option value="America/Glace_Bay">America/Glace_Bay</option>
                            <option value="America/Goose_Bay">America/Goose_Bay</option>
                            <option value="America/Grand_Turk">America/Grand_Turk</option>
                            <option value="America/Grenada">America/Grenada</option>
                            <option value="America/Guadeloupe">America/Guadeloupe</option>
                            <option value="America/Guatemala">America/Guatemala</option>
                            <option value="America/Guayaquil">America/Guayaquil</option>
                            <option value="America/Guyana">America/Guyana</option>
                            <option value="America/Halifax">America/Halifax</option>
                            <option value="America/Havana">America/Havana</option>
                            <option value="America/Hermosillo">America/Hermosillo</option>
                            <option value="America/Indiana/Indianapolis">America/Indiana/Indianapolis</option>
                            <option value="America/Indiana/Knox">America/Indiana/Knox</option>
                            <option value="America/Indiana/Marengo">America/Indiana/Marengo</option>
                            <option value="America/Indiana/Petersburg">America/Indiana/Petersburg</option>
                            <option value="America/Indiana/Tell_City">America/Indiana/Tell_City</option>
                            <option value="America/Indiana/Vevay">America/Indiana/Vevay</option>
                            <option value="America/Indiana/Vincennes">America/Indiana/Vincennes</option>
                            <option value="America/Indiana/Winamac">America/Indiana/Winamac</option>
                            <option value="America/Inuvik">America/Inuvik</option>
                            <option value="America/Iqaluit">America/Iqaluit</option>
                            <option value="America/Jamaica">America/Jamaica</option>
                            <option value="America/Juneau">America/Juneau</option>
                            <option value="America/Kentucky/Louisville">America/Kentucky/Louisville</option>
                            <option value="America/Kentucky/Monticello">America/Kentucky/Monticello</option>
                            <option value="America/Kralendijk">America/Kralendijk</option>
                            <option value="America/La_Paz">America/La_Paz</option>
                            <option value="America/Lima">America/Lima</option>
                            <option value="America/Los_Angeles">America/Los_Angeles</option>
                            <option value="America/Lower_Princes">America/Lower_Princes</option>
                            <option value="America/Maceio">America/Maceio</option>
                            <option value="America/Managua">America/Managua</option>
                            <option value="America/Manaus">America/Manaus</option>
                            <option value="America/Marigot">America/Marigot</option>
                            <option value="America/Martinique">America/Martinique</option>
                            <option value="America/Matamoros">America/Matamoros</option>
                            <option value="America/Mazatlan">America/Mazatlan</option>
                            <option value="America/Menominee">America/Menominee</option>
                            <option value="America/Merida">America/Merida</option>
                            <option value="America/Metlakatla">America/Metlakatla</option>
                            <option value="America/Mexico_City">America/Mexico_City</option>
                            <option value="America/Miquelon">America/Miquelon</option>
                            <option value="America/Moncton">America/Moncton</option>
                            <option value="America/Monterrey">America/Monterrey</option>
                            <option value="America/Montevideo">America/Montevideo</option>
                            <option value="America/Montserrat">America/Montserrat</option>
                            <option value="America/Nassau">America/Nassau</option>
                            <option value="America/New_York">America/New_York</option>
                            <option value="America/Nome">America/Nome</option>
                            <option value="America/Noronha">America/Noronha</option>
                            <option value="America/North_Dakota/Beulah">America/North_Dakota/Beulah</option>
                            <option value="America/North_Dakota/Center">America/North_Dakota/Center</option>
                            <option value="America/North_Dakota/New_Salem">America/North_Dakota/New_Salem</option>
                            <option value="America/Nuuk">America/Nuuk</option>
                            <option value="America/Ojinaga">America/Ojinaga</option>
                            <option value="America/Panama">America/Panama</option>
                            <option value="America/Paramaribo">America/Paramaribo</option>
                            <option value="America/Phoenix">America/Phoenix</option>
                            <option value="America/Port-au-Prince">America/Port-au-Prince</option>
                            <option value="America/Port_of_Spain">America/Port_of_Spain</option>
                            <option value="America/Porto_Velho">America/Porto_Velho</option>
                            <option value="America/Puerto_Rico">America/Puerto_Rico</option>
                            <option value="America/Punta_Arenas">America/Punta_Arenas</option>
                            <option value="America/Rankin_Inlet">America/Rankin_Inlet</option>
                            <option value="America/Recife">America/Recife</option>
                            <option value="America/Regina">America/Regina</option>
                            <option value="America/Resolute">America/Resolute</option>
                            <option value="America/Rio_Branco">America/Rio_Branco</option>
                            <option value="America/Santarem">America/Santarem</option>
                            <option value="America/Santiago">America/Santiago</option>
                            <option value="America/Santo_Domingo">America/Santo_Domingo</option>
                            <option value="America/Sao_Paulo">America/Sao_Paulo</option>
                            <option value="America/Scoresbysund">America/Scoresbysund</option>
                            <option value="America/Sitka">America/Sitka</option>
                            <option value="America/St_Barthelemy">America/St_Barthelemy</option>
                            <option value="America/St_Johns">America/St_Johns</option>
                            <option value="America/St_Kitts">America/St_Kitts</option>
                            <option value="America/St_Lucia">America/St_Lucia</option>
                            <option value="America/St_Thomas">America/St_Thomas</option>
                            <option value="America/St_Vincent">America/St_Vincent</option>
                            <option value="America/Swift_Current">America/Swift_Current</option>
                            <option value="America/Tegucigalpa">America/Tegucigalpa</option>
                            <option value="America/Thule">America/Thule</option>
                            <option value="America/Tijuana">America/Tijuana</option>
                            <option value="America/Toronto">America/Toronto</option>
                            <option value="America/Tortola">America/Tortola</option>
                            <option value="America/Vancouver">America/Vancouver</option>
                            <option value="America/Whitehorse">America/Whitehorse</option>
                            <option value="America/Winnipeg">America/Winnipeg</option>
                            <option value="America/Yakutat">America/Yakutat</option>
                            <option value="Antarctica/Casey">Antarctica/Casey</option>
                            <option value="Antarctica/Davis">Antarctica/Davis</option>
                            <option value="Antarctica/DumontDUrville">Antarctica/DumontDUrville</option>
                            <option value="Antarctica/Macquarie">Antarctica/Macquarie</option>
                            <option value="Antarctica/Mawson">Antarctica/Mawson</option>
                            <option value="Antarctica/McMurdo">Antarctica/McMurdo</option>
                            <option value="Antarctica/Palmer">Antarctica/Palmer</option>
                            <option value="Antarctica/Rothera">Antarctica/Rothera</option>
                            <option value="Antarctica/Syowa">Antarctica/Syowa</option>
                            <option value="Antarctica/Troll">Antarctica/Troll</option>
                            <option value="Antarctica/Vostok">Antarctica/Vostok</option>
                            <option value="Arctic/Longyearbyen">Arctic/Longyearbyen</option>
                            <option value="Asia/Aden">Asia/Aden</option>
                            <option value="Asia/Almaty">Asia/Almaty</option>
                            <option value="Asia/Amman">Asia/Amman</option>
                            <option value="Asia/Anadyr">Asia/Anadyr</option>
                            <option value="Asia/Aqtau">Asia/Aqtau</option>
                            <option value="Asia/Aqtobe">Asia/Aqtobe</option>
                            <option value="Asia/Ashgabat">Asia/Ashgabat</option>
                            <option value="Asia/Atyrau">Asia/Atyrau</option>
                            <option value="Asia/Baghdad">Asia/Baghdad</option>
                            <option value="Asia/Bahrain" selected="selected">Asia/Bahrain</option>
                            <option value="Asia/Baku">Asia/Baku</option>
                            <option value="Asia/Bangkok">Asia/Bangkok</option>
                            <option value="Asia/Barnaul">Asia/Barnaul</option>
                            <option value="Asia/Beirut">Asia/Beirut</option>
                            <option value="Asia/Bishkek">Asia/Bishkek</option>
                            <option value="Asia/Brunei">Asia/Brunei</option>
                            <option value="Asia/Chita">Asia/Chita</option>
                            <option value="Asia/Choibalsan">Asia/Choibalsan</option>
                            <option value="Asia/Colombo">Asia/Colombo</option>
                            <option value="Asia/Damascus">Asia/Damascus</option>
                            <option value="Asia/Dhaka">Asia/Dhaka</option>
                            <option value="Asia/Dili">Asia/Dili</option>
                            <option value="Asia/Dubai">Asia/Dubai</option>
                            <option value="Asia/Dushanbe">Asia/Dushanbe</option>
                            <option value="Asia/Famagusta">Asia/Famagusta</option>
                            <option value="Asia/Gaza">Asia/Gaza</option>
                            <option value="Asia/Hebron">Asia/Hebron</option>
                            <option value="Asia/Ho_Chi_Minh">Asia/Ho_Chi_Minh</option>
                            <option value="Asia/Hong_Kong">Asia/Hong_Kong</option>
                            <option value="Asia/Hovd">Asia/Hovd</option>
                            <option value="Asia/Irkutsk">Asia/Irkutsk</option>
                            <option value="Asia/Jakarta">Asia/Jakarta</option>
                            <option value="Asia/Jayapura">Asia/Jayapura</option>
                            <option value="Asia/Jerusalem">Asia/Jerusalem</option>
                            <option value="Asia/Kabul">Asia/Kabul</option>
                            <option value="Asia/Kamchatka">Asia/Kamchatka</option>
                            <option value="Asia/Karachi">Asia/Karachi</option>
                            <option value="Asia/Kathmandu">Asia/Kathmandu</option>
                            <option value="Asia/Khandyga">Asia/Khandyga</option>
                            <option value="Asia/Kolkata">Asia/Kolkata</option>
                            <option value="Asia/Krasnoyarsk">Asia/Krasnoyarsk</option>
                            <option value="Asia/Kuala_Lumpur">Asia/Kuala_Lumpur</option>
                            <option value="Asia/Kuching">Asia/Kuching</option>
                            <option value="Asia/Kuwait">Asia/Kuwait</option>
                            <option value="Asia/Macau">Asia/Macau</option>
                            <option value="Asia/Magadan">Asia/Magadan</option>
                            <option value="Asia/Makassar">Asia/Makassar</option>
                            <option value="Asia/Manila">Asia/Manila</option>
                            <option value="Asia/Muscat">Asia/Muscat</option>
                            <option value="Asia/Nicosia">Asia/Nicosia</option>
                            <option value="Asia/Novokuznetsk">Asia/Novokuznetsk</option>
                            <option value="Asia/Novosibirsk">Asia/Novosibirsk</option>
                            <option value="Asia/Omsk">Asia/Omsk</option>
                            <option value="Asia/Oral">Asia/Oral</option>
                            <option value="Asia/Phnom_Penh">Asia/Phnom_Penh</option>
                            <option value="Asia/Pontianak">Asia/Pontianak</option>
                            <option value="Asia/Pyongyang">Asia/Pyongyang</option>
                            <option value="Asia/Qatar">Asia/Qatar</option>
                            <option value="Asia/Qostanay">Asia/Qostanay</option>
                            <option value="Asia/Qyzylorda">Asia/Qyzylorda</option>
                            <option value="Asia/Riyadh">Asia/Riyadh</option>
                            <option value="Asia/Sakhalin">Asia/Sakhalin</option>
                            <option value="Asia/Samarkand">Asia/Samarkand</option>
                            <option value="Asia/Seoul">Asia/Seoul</option>
                            <option value="Asia/Shanghai">Asia/Shanghai</option>
                            <option value="Asia/Singapore">Asia/Singapore</option>
                            <option value="Asia/Srednekolymsk">Asia/Srednekolymsk</option>
                            <option value="Asia/Taipei">Asia/Taipei</option>
                            <option value="Asia/Tashkent">Asia/Tashkent</option>
                            <option value="Asia/Tbilisi">Asia/Tbilisi</option>
                            <option value="Asia/Tehran">Asia/Tehran</option>
                            <option value="Asia/Thimphu">Asia/Thimphu</option>
                            <option value="Asia/Tokyo">Asia/Tokyo</option>
                            <option value="Asia/Tomsk">Asia/Tomsk</option>
                            <option value="Asia/Ulaanbaatar">Asia/Ulaanbaatar</option>
                            <option value="Asia/Urumqi">Asia/Urumqi</option>
                            <option value="Asia/Ust-Nera">Asia/Ust-Nera</option>
                            <option value="Asia/Vientiane">Asia/Vientiane</option>
                            <option value="Asia/Vladivostok">Asia/Vladivostok</option>
                            <option value="Asia/Yakutsk">Asia/Yakutsk</option>
                            <option value="Asia/Yangon">Asia/Yangon</option>
                            <option value="Asia/Yekaterinburg">Asia/Yekaterinburg</option>
                            <option value="Asia/Yerevan">Asia/Yerevan</option>
                            <option value="Atlantic/Azores">Atlantic/Azores</option>
                            <option value="Atlantic/Bermuda">Atlantic/Bermuda</option>
                            <option value="Atlantic/Canary">Atlantic/Canary</option>
                            <option value="Atlantic/Cape_Verde">Atlantic/Cape_Verde</option>
                            <option value="Atlantic/Faroe">Atlantic/Faroe</option>
                            <option value="Atlantic/Madeira">Atlantic/Madeira</option>
                            <option value="Atlantic/Reykjavik">Atlantic/Reykjavik</option>
                            <option value="Atlantic/South_Georgia">Atlantic/South_Georgia</option>
                            <option value="Atlantic/St_Helena">Atlantic/St_Helena</option>
                            <option value="Atlantic/Stanley">Atlantic/Stanley</option>
                            <option value="Australia/Adelaide">Australia/Adelaide</option>
                            <option value="Australia/Brisbane">Australia/Brisbane</option>
                            <option value="Australia/Broken_Hill">Australia/Broken_Hill</option>
                            <option value="Australia/Darwin">Australia/Darwin</option>
                            <option value="Australia/Eucla">Australia/Eucla</option>
                            <option value="Australia/Hobart">Australia/Hobart</option>
                            <option value="Australia/Lindeman">Australia/Lindeman</option>
                            <option value="Australia/Lord_Howe">Australia/Lord_Howe</option>
                            <option value="Australia/Melbourne">Australia/Melbourne</option>
                            <option value="Australia/Perth">Australia/Perth</option>
                            <option value="Australia/Sydney">Australia/Sydney</option>
                            <option value="Europe/Amsterdam">Europe/Amsterdam</option>
                            <option value="Europe/Andorra">Europe/Andorra</option>
                            <option value="Europe/Astrakhan">Europe/Astrakhan</option>
                            <option value="Europe/Athens">Europe/Athens</option>
                            <option value="Europe/Belgrade">Europe/Belgrade</option>
                            <option value="Europe/Berlin">Europe/Berlin</option>
                            <option value="Europe/Bratislava">Europe/Bratislava</option>
                            <option value="Europe/Brussels">Europe/Brussels</option>
                            <option value="Europe/Bucharest">Europe/Bucharest</option>
                            <option value="Europe/Budapest">Europe/Budapest</option>
                            <option value="Europe/Busingen">Europe/Busingen</option>
                            <option value="Europe/Chisinau">Europe/Chisinau</option>
                            <option value="Europe/Copenhagen">Europe/Copenhagen</option>
                            <option value="Europe/Dublin">Europe/Dublin</option>
                            <option value="Europe/Gibraltar">Europe/Gibraltar</option>
                            <option value="Europe/Guernsey">Europe/Guernsey</option>
                            <option value="Europe/Helsinki">Europe/Helsinki</option>
                            <option value="Europe/Isle_of_Man">Europe/Isle_of_Man</option>
                            <option value="Europe/Istanbul">Europe/Istanbul</option>
                            <option value="Europe/Jersey">Europe/Jersey</option>
                            <option value="Europe/Kaliningrad">Europe/Kaliningrad</option>
                            <option value="Europe/Kirov">Europe/Kirov</option>
                            <option value="Europe/Kyiv">Europe/Kyiv</option>
                            <option value="Europe/Lisbon">Europe/Lisbon</option>
                            <option value="Europe/Ljubljana">Europe/Ljubljana</option>
                            <option value="Europe/London">Europe/London</option>
                            <option value="Europe/Luxembourg">Europe/Luxembourg</option>
                            <option value="Europe/Madrid">Europe/Madrid</option>
                            <option value="Europe/Malta">Europe/Malta</option>
                            <option value="Europe/Mariehamn">Europe/Mariehamn</option>
                            <option value="Europe/Minsk">Europe/Minsk</option>
                            <option value="Europe/Monaco">Europe/Monaco</option>
                            <option value="Europe/Moscow">Europe/Moscow</option>
                            <option value="Europe/Oslo">Europe/Oslo</option>
                            <option value="Europe/Paris">Europe/Paris</option>
                            <option value="Europe/Podgorica">Europe/Podgorica</option>
                            <option value="Europe/Prague">Europe/Prague</option>
                            <option value="Europe/Riga">Europe/Riga</option>
                            <option value="Europe/Rome">Europe/Rome</option>
                            <option value="Europe/Samara">Europe/Samara</option>
                            <option value="Europe/San_Marino">Europe/San_Marino</option>
                            <option value="Europe/Sarajevo">Europe/Sarajevo</option>
                            <option value="Europe/Saratov">Europe/Saratov</option>
                            <option value="Europe/Simferopol">Europe/Simferopol</option>
                            <option value="Europe/Skopje">Europe/Skopje</option>
                            <option value="Europe/Sofia">Europe/Sofia</option>
                            <option value="Europe/Stockholm">Europe/Stockholm</option>
                            <option value="Europe/Tallinn">Europe/Tallinn</option>
                            <option value="Europe/Tirane">Europe/Tirane</option>
                            <option value="Europe/Ulyanovsk">Europe/Ulyanovsk</option>
                            <option value="Europe/Vaduz">Europe/Vaduz</option>
                            <option value="Europe/Vatican">Europe/Vatican</option>
                            <option value="Europe/Vienna">Europe/Vienna</option>
                            <option value="Europe/Vilnius">Europe/Vilnius</option>
                            <option value="Europe/Volgograd">Europe/Volgograd</option>
                            <option value="Europe/Warsaw">Europe/Warsaw</option>
                            <option value="Europe/Zagreb">Europe/Zagreb</option>
                            <option value="Europe/Zurich">Europe/Zurich</option>
                            <option value="Indian/Antananarivo">Indian/Antananarivo</option>
                            <option value="Indian/Chagos">Indian/Chagos</option>
                            <option value="Indian/Christmas">Indian/Christmas</option>
                            <option value="Indian/Cocos">Indian/Cocos</option>
                            <option value="Indian/Comoro">Indian/Comoro</option>
                            <option value="Indian/Kerguelen">Indian/Kerguelen</option>
                            <option value="Indian/Mahe">Indian/Mahe</option>
                            <option value="Indian/Maldives">Indian/Maldives</option>
                            <option value="Indian/Mauritius">Indian/Mauritius</option>
                            <option value="Indian/Mayotte">Indian/Mayotte</option>
                            <option value="Indian/Reunion">Indian/Reunion</option>
                            <option value="Pacific/Apia">Pacific/Apia</option>
                            <option value="Pacific/Auckland">Pacific/Auckland</option>
                            <option value="Pacific/Bougainville">Pacific/Bougainville</option>
                            <option value="Pacific/Chatham">Pacific/Chatham</option>
                            <option value="Pacific/Chuuk">Pacific/Chuuk</option>
                            <option value="Pacific/Easter">Pacific/Easter</option>
                            <option value="Pacific/Efate">Pacific/Efate</option>
                            <option value="Pacific/Fakaofo">Pacific/Fakaofo</option>
                            <option value="Pacific/Fiji">Pacific/Fiji</option>
                            <option value="Pacific/Funafuti">Pacific/Funafuti</option>
                            <option value="Pacific/Galapagos">Pacific/Galapagos</option>
                            <option value="Pacific/Gambier">Pacific/Gambier</option>
                            <option value="Pacific/Guadalcanal">Pacific/Guadalcanal</option>
                            <option value="Pacific/Guam">Pacific/Guam</option>
                            <option value="Pacific/Honolulu">Pacific/Honolulu</option>
                            <option value="Pacific/Kanton">Pacific/Kanton</option>
                            <option value="Pacific/Kiritimati">Pacific/Kiritimati</option>
                            <option value="Pacific/Kosrae">Pacific/Kosrae</option>
                            <option value="Pacific/Kwajalein">Pacific/Kwajalein</option>
                            <option value="Pacific/Majuro">Pacific/Majuro</option>
                            <option value="Pacific/Marquesas">Pacific/Marquesas</option>
                            <option value="Pacific/Midway">Pacific/Midway</option>
                            <option value="Pacific/Nauru">Pacific/Nauru</option>
                            <option value="Pacific/Niue">Pacific/Niue</option>
                            <option value="Pacific/Norfolk">Pacific/Norfolk</option>
                            <option value="Pacific/Noumea">Pacific/Noumea</option>
                            <option value="Pacific/Pago_Pago">Pacific/Pago_Pago</option>
                            <option value="Pacific/Palau">Pacific/Palau</option>
                            <option value="Pacific/Pitcairn">Pacific/Pitcairn</option>
                            <option value="Pacific/Pohnpei">Pacific/Pohnpei</option>
                            <option value="Pacific/Port_Moresby">Pacific/Port_Moresby</option>
                            <option value="Pacific/Rarotonga">Pacific/Rarotonga</option>
                            <option value="Pacific/Saipan">Pacific/Saipan</option>
                            <option value="Pacific/Tahiti">Pacific/Tahiti</option>
                            <option value="Pacific/Tarawa">Pacific/Tarawa</option>
                            <option value="Pacific/Tongatapu">Pacific/Tongatapu
                            </option>
                            <option value="Pacific/Wake">Pacific/Wake</option>
                            <option value="Pacific/Wallis">Pacific/Wallis</option>
                            <option value="UTC">UTC</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="business_logo">Upload Logo:</label>
                        <input accept="image/*"name="business_logo"type="file"id="business_logo"/>
                        <p className="help-block">
                          <i> Previous logo (if exists) will be replaced</i>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="fy_start_month">Financial year start month:</label>
                        <FaInfoCircle aria-hidden="true"data-container="body"data-toggle="popover"
                          data-placement="auto bottom"data-content="Starting month of The Financial Year for your business"
                          data-html="true"data-trigger="hover"
                        />
                        <div className="input-group">
                          <span className="input-group-addon"><FaCalendar/></span>
                          <select className="form-control select2"required=""id="fy_start_month"name="fy_start_month">
                            <option value={1} selected="selected">January</option>
                            <option value={2}>February</option>
                            <option value={3}>March</option>
                            <option value={4}>April</option>
                            <option value={5}>May</option>
                            <option value={6}>June</option>
                            <option value={7}>July</option>
                            <option value={8}>August</option>
                            <option value={9}>September</option>
                            <option value={10}>October</option>
                            <option value={11}>November</option>
                            <option value={12}>December</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="accounting_method">
                          Stock Accounting Method:*
                        </label>
                        <FaInfoCircle aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                          data-content="Accounting method"data-html="true"data-trigger="hover"
                        />
                        <div className="input-group">
                          <span className="input-group-addon">< faCalculator /></span>
                          <select className="form-control select2"required=""id="accounting_method"name="accounting_method">
                            <option value="fifo" selected="selected">FIFO (First In First Out)</option>
                            <option value="lifo">LIFO (Last In First Out)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="transaction_edit_days">Transaction Edit Days:*</label>
                        <faInfoCircle aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                          data-content="Number of days from Transaction Date till which a transaction can be edited."
                          data-html="true"data-trigger="hover"
                        />
                        <div className="input-group">
                          <span className="input-group-addon"><FaEdit /></span>
                          <input className="form-control"placeholder="Transaction Edit Days"required=""
                            name="transaction_edit_days"type="number"defaultValue={365}id="transaction_edit_days"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="date_format">Date Format:*</label>
                        <div className="input-group">
                          <span className="input-group-addon"><faCalendar /></span>
                          <select className="form-control select2"required=""id="date_format"name="date_format">
                            <option value="d-m-Y">dd-mm-yyyy</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="time_format">Time Format:*</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <faClock />
                          </span>
                          <select className="form-control select2"required=""id="time_format"name="time_format">
                            <option value={12}>12 Hour</option>
                            <option value={24} selected="selected">24 Hour</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="currency_precision">Currency precision:*</label>
                        <faInfoCircle aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                          data-content="Number of digits after decimal point for currency value. Example:0.00 for value 2, 0.000 for value 3, 0.0000 for value 4"
                          data-html="true"data-trigger="hover"
                        />
                        <select className="form-control select2"required=""id="currency_precision"name="currency_precision">
                          <option value={0}>0</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="quantity_precision">Quantity precision:*</label>
                        <faInfoCircle aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                          data-content="Number of digits after decimal point for quantity value. Example:0.00 for value 2, 0.000 for value 3, 0.0000 for value 4"
                          data-html="true"data-trigger="hover"
                        />
                        <select className="form-control select2"required=""id="quantity_precision"name="quantity_precision">
                          <option value={0}>0</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                        </select>
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="stamp">Buisness Stamp:</label>
                        <input accept="image/*"name="stamp"type="file"id="stamp"/>
                        <label htmlFor="is_show_stamp">Is Stamp Show On Invoices:</label>
                        <input type="checkbox"name="is_show_stamp"defaultValue={1}/>
                      </div>
                    </div>
                  </div>
                  <div className="row hide" >
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="code_label_1">Code 1 name:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <faInfo />
                          </span>
                          <input className="form-control"name="code_label_1"type="text"id="code_label_1"/>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="code_1">Code 1:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <faInfo />
                          </span>
                          <input className="form-control"name="code_1"type="text"id="code_1"/>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="code_label_2">Code 2 name:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <faInfo />
                          </span>
                          <input className="form-control"name="code_label_2"type="text"id="code_label_2"/>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="code_2">Code 2:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <faInfo />
                          </span>
                          <input className="form-control"name="code_2"type="text"id="code_2"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row hide">
                    <div className="col-sm-8">
                      <div className="form-group">
                        <label>
                          <input className="input-icheck"name="common_settings[is_enabled_export]"type="checkbox"defaultValue={1}/>
                          Enable export
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-10 col-md-10 col-sm-10 col-xs-10 pos-tab' id="tax" style={{ display: activeTab === 'tax' ? 'block' : 'none' }}>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="tax_label_1">Tax 1 Name:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <FontAwesomeIcon icon={faInfoCircle} />
                          </span>
                          <input className="form-control"placeholder="GST / VAT / Other"name="tax_label_1"type="text"id="tax_label_1"/>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="tax_number_1">Tax 1 No.:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <FontAwesomeIcon icon={faInfoCircle} />
                          </span>
                          <input className="form-control"name="tax_number_1"type="text"id="tax_number_1"/>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="tax_label_2">Tax 2 Name:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <FontAwesomeIcon icon={faInfoCircle} />
                          </span>
                          <input className="form-control"placeholder="GST / VAT / Other"name="tax_label_2"type="text"id="tax_label_2"/>
                        </div>
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="tax_number_2">Tax 2 No.:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <FontAwesomeIcon icon={faInfoCircle} />
                          </span>
                          <input className="form-control"name="tax_number_2"type="text"id="tax_number_2"/>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div className="form-group">
                        <div className="checkbox">
                          <br />
                          <label>
                            <input className="input-icheck"defaultChecked="checked"name="enable_inline_tax"type="checkbox"defaultValue={1}/>
                            Enable inline tax in purchase and sell
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pos-tab-content" id='product'style={{ display: activeTab === 'product' ? 'block' : 'none' }}>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="sku_prefix">SKU prefix:</label>
                        <input className="form-control text-uppercase"name="sku_prefix"type="text"id="sku_prefix"/>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <label htmlFor="enable_product_expiry">Enable Product Expiry:</label>
                      <faInfoCircle aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                        data-content="Enable product expiry. <br/> <br/><b>Add item expiry</b>: To directly add item expiry only. <br/> <b>Add manufacturing date & expiry period</b>: To add manufacturing date & expiry period and calculate expiry date based on that."
                        data-html="true"data-trigger="hover"
                      />
                      <div className="input-group">
                        <span className="input-group-addon">
                          <input name="enable_product_expiry"type="checkbox"defaultValue={1}id="enable_product_expiry"/>
                        </span>
                        <select className="form-control"id="expiry_type"name="expiry_type"disabled="">
                          <option value="add_expiry" selected="">Add item expiry</option>
                          <option value="add_manufacturing">Add manufacturing date &amp; expiry period</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4  hide " id="on_expiry_div">
                      <div className="form-group">
                        <div className="multi-input">
                          <label htmlFor="on_product_expiry">On Product Expiry:</label>
                          <faInfoCircle aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                            data-content="Specify action that needs to be done on product expiry. <br><br> <b>Keep Selling</b>: Products will be kept on selling after expiry also. <br> <b>Stop Selling</b>: Stop selling item n days before expiry."
                            data-html="true"data-trigger="hover"
                          />
                          <br />
                          <select className="form-control pull-left"style={{ width: "60%" }}id="on_product_expiry"name="on_product_expiry">
                            <option value="keep_selling" selected="selected">Keep Selling</option>
                            <option value="stop_selling">Stop Selling n days before</option>
                          </select>
                          <input className="form-control pull-left"placeholder="stop n days before"style={{ width: "40%" }}
                            disabled=""required=""id="stop_selling_before"name="stop_selling_before"type="number"defaultValue={0}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"defaultChecked="checked"name="enable_brand"type="checkbox"defaultValue={1}/>
                            Enable Brands
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"id="enable_category"defaultChecked="checked"name="enable_category"type="checkbox"defaultValue={1}/>
                            Enable Categories
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 enable_sub_category ">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"id="enable_sub_category"defaultChecked="checked"
                              name="enable_sub_category"type="checkbox"defaultValue={1}
                            />
                            Enable Sub-Categories
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"defaultChecked="checked"name="enable_price_tax"
                              type="checkbox"defaultValue={1}
                            />
                            Enable Price &amp; Tax info
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="default_unit">Default Unit:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="fa fa-balance-scale" />
                          </span>
                          <select className="form-control select2"
                            style={{ width: "100%" }}id="default_unit"name="default_unit">
                            <option value="" selected="selected">Please Select</option>
                            <option value={4}>Pieces (Pc(s))</option>
                            <option value={21}>Box (box)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"name="enable_sub_units"type="checkbox"defaultValue={1}/>
                            Enable Sub Units
                          </label>
                          <faInfoCircle aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                            data-content="Based on selected Unit it will show sub units for it. Select the sub-unit applicable. Leave blank if all sub-units are applicable for the product."
                            data-html="true"data-trigger="hover"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"name="enable_racks"type="checkbox"defaultValue={1}/>
                            Enable Racks
                          </label>
                          <faInfoCircle aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                            data-content="Enable this to add rack details of a product for different business locations while adding products"
                            data-html="true"data-trigger="hover"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"name="enable_row"type="checkbox"defaultValue={1}/>
                            Enable Row
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"name="enable_position"type="checkbox"defaultValue={1}/>
                            Enable Position
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"name="common_settings[enable_product_warranty]"type="checkbox"defaultValue={1}/>
                            Enable Warranty
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4  hide ">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"name="common_settings[enable_secondary_unit]"type="checkbox"defaultValue={1}/>
                            Enable secondary unit
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"name="common_settings[is_product_image_required]"type="checkbox"defaultValue={1}/>
                            Is product image required?
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pos-tab-content" id='contact' style={{ display: activeTab === 'contact' ? 'block' : 'none' }}>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="default_credit_limit">Default credit limit:</label>
                        <input className="form-control input_number"placeholder="Default credit limit"
                          id="default_credit_limit"name="common_settings[default_credit_limit]"
                          type="text"defaultValue=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pos-tab-content" id='sale' style={{ display: activeTab === 'sale' ? 'block' : 'none' }}>
                  <div className="row">
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="default_sales_discount">Default Sale Discount:*</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <i className="fa fa-percent" />
                          </span>
                          <input className="form-control input_number"name="default_sales_discount"type="text"defaultValue={0.0}id="default_sales_discount"/>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="default_sales_tax">Default Sale Tax:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <FontAwesomeIcon icon={faInfoCircle} />
                          </span>
                          <select className="form-control select2" style={{ width: "100%" }}id="default_sales_tax"name="default_sales_tax">
                            <option selected="selected" value="">Default Sale Tax</option>
                            <option value="" selected="selected">None</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="item_addition_method">Sales Item Addition Method:</label>
                        <select className="form-control select2"style={{ width: "100%" }}id="item_addition_method"name="item_addition_method">
                          <option value={0}>Add item in new row</option>
                          <option value={1} selected="selected">Increase item quantity if it already exists</option>
                        </select>
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="amount_rounding_method">Amount rounding method:</label>
                        <faInfoCircle aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                          data-content="Example: <br><b>Round to nearest whole number:</b> 2.23 => 2, 2.50 => 3, 2.73 => 3 <br><b>Round to nearest 
                          decimal (multiple of 0.05):</b> 2.11 => 2.10, 2.12 => 2.10, 2.13 => 2.15"data-html="true"data-trigger="hover"
                        />
                        <select className="form-control select2" style={{ width: "100%" }}name="pos_settings[amount_rounding_method]">
                          <option selected="selected" value="">None</option>
                          <option value={1}>Round to nearest whole number</option>
                          <option value="0.05">Round to nearest decimal (multiple of 0.05)</option>
                          <option value="0.1">Round to nearest decimal (multiple of 0.1)</option>
                          <option value="0.5">Round to nearest decimal (multiple of 0.5)</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <br />
                          <label>
                            <input className="input-icheck"name="pos_settings[enable_msp]"type="checkbox"defaultValue={1}/>
                            Sales price is minimum selling price
                          </label>
                          <faInfoCircle aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                            data-content="If this is enabled, on the POS or Sales screen default selling price will be the minimum selling price for the product. You cannot set price below the default selling price."
                            data-html="true"data-trigger="hover"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <br />
                          <label>
                            <input className="input-icheck"defaultChecked="checked"name="pos_settings[allow_overselling]"type="checkbox"defaultValue={1}/>
                            Allow Overselling
                          </label>
                          <faInfoCircle aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                            data-content="Check this field to allow a product to sell more than the available quantity. Oversold quantity will be adjusted automatically from future stock."
                            data-html="true"data-trigger="hover"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="clearfix" />
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck" id="enable_sales_order"name="pos_settings[enable_sales_order]"type="checkbox"defaultValue={1}/>
                            Enable Sales Order
                          </label>
                          <FontAwesomeIcon icon={faInfoCircle} aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                            data-content="The sales order, sometimes abbreviated as SO, is an order issued by a business or sole trader to a customer. A sales order may be for products and/or services."
                            data-html="true"data-trigger="hover"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"id="is_pay_term_required"name="pos_settings[is_pay_term_required]"type="checkbox"defaultValue={1}/>
                            Is pay term required?
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"id="show_batch_number"name="pos_settings[show_batch_number]" type="checkbox"defaultValue={1}/>
                            Enable Batch Number
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"id="total_unit_before_vat"name="pos_settings[total_unit_before_vat]"type="checkbox"defaultValue={1}/>
                            Show Total Unit Price Before VAT/Des
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"id="expense_on_item"name="pos_settings[expense_on_item]"type="checkbox"defaultValue={1}/>
                            Show Expense On Item
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"id="enable_custom_fields_on_ledger"name="pos_settings[enable_custom_fields_on_ledger]"type="checkbox"defaultValue={1}/>
                            Enable Custom Fields on Ledger
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"id="enable_new_sell_return"name="pos_settings[enable_new_sell_return]"type="checkbox"defaultValue={1}/>
                            Enable New Sell Return
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"id="enable_product_sale_mapping"name="pos_settings[enable_product_sale_mapping]"type="checkbox"defaultValue={1}/>
                            Enable Product Sale Mapping
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-12">
                      <h4>Commission Agent:</h4>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="sales_cmsn_agnt">Sales Commission Agent:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <FontAwesomeIcon icon={faInfoCircle} />
                          </span>
                          <select className="form-control select2"
                            style={{ width: "100%" }}id="sales_cmsn_agnt"name="sales_cmsn_agnt">
                            <option value="" selected="selected"> Disable </option>
                            <option value="logged_in_user">Logged in user</option>
                            <option value="user">Select from user's list</option>
                            <option value="cmsn_agnt">Select from commission agent's list</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="cmmsn_calculation_type"> Commission Calculation Type:</label>
                        <div className="input-group">
                          <span className="input-group-addon">
                            <FontAwesomeIcon icon={faInfoCircle} />
                          </span>
                          <select className="form-control select2" style={{ width: "100%" }}id="cmmsn_calculation_type"name="pos_settings[cmmsn_calculation_type]">
                            <option value="invoice_value" selected="selected">Invoice value</option>
                            <option value="payment_received">Payment Received</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"id="is_commission_agent_required"
                              name="pos_settings[is_commission_agent_required]"type="checkbox"defaultValue={1}
                            />
                            Is commission agent required?
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-md-12">
                      <h4> Payment Link
                        < FontAwesomeIcon icon={faInfoCircle} aria-hidden="true"data-container="body"data-toggle="popover"data-placement="auto bottom"
                          data-content="By enabling users can pay invoice using payment link"data-html="true"data-trigger="hover"
                        />
                        :
                      </h4>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <div className="checkbox">
                          <label>
                            <input className="input-icheck"id="enable_payment_link"name="pos_settings[enable_payment_link]"
                              type="checkbox"defaultValue={1}
                            />
                            Enable payment link
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <h4>Razorpay: <small>(For INR India)</small></h4>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="razor_pay_key_id">Key ID:</label>
                        <input className="form-control"id="razor_pay_key_id"
                          name="pos_settings[razor_pay_key_id]"type="text"defaultValue=""
                        />
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="form-group">
                        <label htmlFor="razor_pay_key_secret">Key Secret:</label>
                        <input className="form-control"id="razor_pay_key_secret"
                          name="pos_settings[razor_pay_key_secret]"type="text"defaultValue=""
                        />
                      </div>
                    </div>
                    <div class="col-md-12">
                      <h4>Stripe:</h4>
                    </div>
                    <div class="col-sm-4">
                      <div class="form-group">
                        <label for="stripe_public_key">Stripe public key:</label>
                        <input class="form-control" id="stripe_public_key" 
                        name="pos_settings[stripe_public_key]" type="text" value="" />
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="form-group">
                        <label for="stripe_secret_key">Stripe secret key:</label>
                        <input class="form-control" id="stripe_secret_key" 
                        name="pos_settings[stripe_secret_key]" type="text" value=""/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pos-tab-content" id='pos' style={{ display: activeTab === 'pos' ? 'block' : 'none' }}>
                  <h4>Add keyboard shortcuts:</h4>
                  <p className="help-block">
                    Shortcut should be the names of the keys separated by '+'; Example:
                    <b>ctrl+shift+b</b>, <b>ctrl+h</b>
                  </p>
                  <p className="help-block">
                    <b>Available key names are:</b>
                    <br /> shift, ctrl, alt, backspace, tab, enter, return, capslock, esc,
                    escape, space, pageup, pagedown, end, home, <br />
                    left, up, right, down, ins, del, and plus
                  </p>
                  <div className="row">
                    <div className="col-sm-6">
                      <table className="table table-striped">
                        <tbody>
                          <tr>
                            <th>Operations</th>
                            <th>Keyboard Shortcut</th>
                          </tr>
                          <tr>
                            <td>Express <br />Checkout:</td>
                            <td>
                              <input className="form-control"name="shortcuts[pos][express_checkout]"type="text"defaultValue="shift+e"/>
                            </td>
                          </tr>
                          <tr>
                            <td>Pay &amp; Checkout:</td>
                            <td>
                              <input className="form-control"name="shortcuts[pos][pay_n_ckeckout]"type="text"defaultValue="shift+p"/>
                            </td>
                          </tr>
                          <tr>
                            <td>Draft:</td>
                            <td>
                              <input className="form-control"name="shortcuts[pos][draft]"type="text"defaultValue="shift+d"/>
                            </td>
                          </tr>
                          <tr>
                            <td>Cancel:</td>
                            <td>
                              <input className="form-control"name="shortcuts[pos][cancel]"type="text"defaultValue="shift+c"/>
                            </td>
                          </tr>
                          <tr>
                            <td>Go to product quantity:</td>
                            <td>
                              <input className="form-control"name="shortcuts[pos][recent_product_quantity]"type="text"defaultValue="f2"/>
                            </td>
                          </tr>
                          <tr>
                            <td>Weighing Scale:</td>
                            <td>
                              <input className="form-control"name="shortcuts[pos][weighing_scale]"type="text"/>
                            </td>
                          </tr>
                        </tbody>
        </table>
      </div>
      <div className="col-sm-6">
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>Operations</th>
              <th>Keyboard Shortcut</th>
            </tr>
            <tr>
              <td>Edit Discount:</td>
              <td>
                <input
                  className="form-control"
                  name="shortcuts[pos][edit_discount]"
                  type="text"
                  defaultValue="shift+i"
                />
              </td>
            </tr>
            <tr>
              <td>Edit Order Tax:</td>
              <td>
                <input
                  className="form-control"
                  name="shortcuts[pos][edit_order_tax]"
                  type="text"
                  defaultValue="shift+t"
                />
              </td>
            </tr>
            <tr>
              <td>Add Payment Row:</td>
              <td>
                <input
                  className="form-control"
                  name="shortcuts[pos][add_payment_row]"
                  type="text"
                  defaultValue="shift+r"
                />
              </td>
            </tr>
            <tr>
              <td>Finalize Payment:</td>
              <td>
                <input
                  className="form-control"
                  name="shortcuts[pos][finalize_payment]"
                  type="text"
                  defaultValue="shift+f"
                />
              </td>
            </tr>
            <tr>
              <td>Add new product:</td>
              <td>
                <input
                  className="form-control"
                  name="shortcuts[pos][add_new_product]"
                  type="text"
                  defaultValue="f4"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-12">
        <h4>POS settings:</h4>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <div className="checkbox">
            <br />
            <label>
              <input
                className="input-icheck"
                name="pos_settings[disable_pay_checkout]"
                type="checkbox"
                defaultValue={1}
              />{" "}
              Disable Multiple Pay
            </label>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <div className="checkbox">
            <br />
            <label>
              <input
                className="input-icheck"
                name="pos_settings[disable_draft]"
                type="checkbox"
                defaultValue={1}
              />{" "}
              Disable Draft
            </label>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <div className="checkbox">
            <br />
            <label>
              <input
                className="input-icheck"
                name="pos_settings[disable_express_checkout]"
                type="checkbox"
                defaultValue={1}
              />{" "}
              Disable Express Checkout
            </label>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <div className="checkbox">
            <br />
            <label>
              <input
                className="input-icheck"
                name="pos_settings[hide_product_suggestion]"
                type="checkbox"
                defaultValue={1}
              />{" "}
              Don't show product suggestion
            </label>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <div className="checkbox">
            <br />
            <label>
              <input
                className="input-icheck"
                name="pos_settings[hide_recent_trans]"
                type="checkbox"
                defaultValue={1}
              />{" "}
              Don't show recent transactions
            </label>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <div className="checkbox">
            <br />
            <label>
              <input
                className="input-icheck"
                name="pos_settings[disable_discount]"
                type="checkbox"
                defaultValue={1}
              />{" "}
              Disable Discount
            </label>
          </div>
        </div>
      </div>
      <div className="form-group">
    <div className="checkbox">
      <br />
      <label>
        <input
          className="input-icheck"
          name="pos_settings[disable_order_tax]"
          type="checkbox"
          defaultValue={1}
        />
        Disable order tax
      </label>
    </div>
    </div>
    <div className="col-sm-4">
                  <div className="form-group">
                    <div className="checkbox">
        <br />
        <label>
          <input
            className="input-icheck"
            name="pos_settings[is_pos_subtotal_editable]"
            type="checkbox"
            defaultValue={1}
          />{" "}
          Subtotal Editable
        </label>
        <i
          className="fa fa-info-circle text-info hover-q no-print "
          aria-hidden="true"
          data-container="body"
          data-toggle="popover"
          data-placement="auto bottom"
          data-content="Check this to make Subtotal field editable for each product in POS screen"
          data-html="true"
          data-trigger="hover"
        />
      </div>
    </div>
    </div>
    <div className="col-sm-4">
                  <div className="form-group">
                    <div className="checkbox">
                      <br />
                      <label>
                        <input className="input-icheck"name="pos_settings[disable_suspend]"type="checkbox"defaultValue={1}/>
                        Disable Suspend Sale
                      </label>
                    </div>
                  </div>
    </div>
    <div className="clearfix" />
    <div className="col-sm-6">
                  <div className="form-group">
                    <div className="checkbox">
                      <br />
                      <label>
                        <input className="input-icheck"name="pos_settings[enable_transaction_date]"type="checkbox"defaultValue={1}/>
                        Enable transaction date on POS screen
                      </label>
                    </div>
                  </div>
    </div>
    <div className="col-sm-6">
    <div className="form-group">
      <div className="checkbox">
        <br />
        <label>
          <input
            className="input-icheck"
            name="pos_settings[inline_service_staff]"
            type="checkbox"
            defaultValue={1}
          />{" "}
          Enable service staff in product line
        </label>
        <i
          className="fa fa-info-circle text-info hover-q no-print "
          aria-hidden="true"
          data-container="body"
          data-toggle="popover"
          data-placement="auto bottom"
          data-content="If enabled different service staffs can be assigned for different products for an order/sale"
          data-html="true"
          data-trigger="hover"
        />{" "}
      </div>
    </div>
  </div>
  <div className="clearfix" />
  <div className="col-sm-4">
    <div className="form-group">
      <div className="checkbox">
        <br />
        <label>
          <input
            className="input-icheck"
            name="pos_settings[is_service_staff_required]"
            type="checkbox"
            defaultValue={1}
          />{" "}
          Is service staff required
        </label>
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group">
      <div className="checkbox">
        <br />
        <label>
          <input
            className="input-icheck"
            name="pos_settings[disable_credit_sale_button]"
            type="checkbox"
            defaultValue={1}
          />{" "}
          Disable credit sale button
        </label>
        <i
          className="fa fa-info-circle text-info hover-q no-print "
          aria-hidden="true"
          data-container="body"
          data-toggle="popover"
          data-placement="auto bottom"
          data-content="If enabled credit sale button will be shown in place of Card button on pos screen"
          data-html="true"
          data-trigger="hover"
        />{" "}
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group">
      <div className="checkbox">
        <br />
        <label>
          <input
            className="input-icheck"
            name="pos_settings[enable_weighing_scale]"
            type="checkbox"
            defaultValue={1}
          />{" "}
          Enable Weighing Scale
        </label>
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group">
      <div className="checkbox">
        <br />
        <label>
          <input
            className="input-icheck"
            name="pos_settings[show_invoice_scheme]"
            type="checkbox"
            defaultValue={1}
          />{" "}
          Show invoice scheme
        </label>
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group">
      <div className="checkbox">
        <br />
        <label>
          <input
            className="input-icheck"
            name="pos_settings[show_invoice_layout]"
            type="checkbox"
            defaultValue={1}
          />{" "}
          Show invoice layout dropdown
        </label>
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group">
      <div className="checkbox">
        <br />
        <label>
          <input
            className="input-icheck"
            name="pos_settings[print_on_suspend]"
            type="checkbox"
            defaultValue={1}
          />{" "}
          Print invoice on suspend
        </label>
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group">
      <div className="checkbox">
        <br />
        <label>
          <input
            className="input-icheck"
            name="pos_settings[show_pricing_on_product_sugesstion]"
            type="checkbox"
            defaultValue={1}
          />{" "}
          Show pricing on product suggestion tooltip
        </label>
      </div>
    </div>
  </div>
  <hr />
  <div className="row">
    <div className="col-sm-12">
      <h4>Weighing Scale barcode Setting:</h4>
      <p>Configure barcode as per your weighing scale.</p>
      <br />
    </div>
    {/* 1st part: Prefix (here any prefix can be entered), user can leave it blank also if prefix not supported by scale.
	2nd part: Dropdown list from 1 to 9 for Barcode 0
	3rd part: Dropdown list from 1 to 5 for Quantity 
	4th part: Dropdown list from 1 to 4 for Quantity decimals. */}
    <div className="col-sm-3">
      <div className="form-group">
        <label htmlFor="label_prefix">Prefix:</label>
        <input
          className="form-control"
          id="label_prefix"
          name="weighing_scale_setting[label_prefix]"
          type="text"
        />
      </div>
    </div>
    <div className="col-sm-3">
      <div className="form-group">
        <label htmlFor="product_sku_length">Product sku length:</label>
        <select
          className="form-control select2"
          style={{ width: "100%" }}
          id="product_sku_length"
          name="weighing_scale_setting[product_sku_length]"
        >
          <option value={0}>1</option>
          <option value={1}>2</option>
          <option value={2}>3</option>
          <option value={3}>4</option>
          <option value={4} selected="selected">
            5
          </option>
          <option value={5}>6</option>
          <option value={6}>7</option>
          <option value={7}>8</option>
          <option value={8}>9</option>
        </select>
      </div>
    </div>
    <div className="col-sm-3">
      <div className="form-group">
        <label htmlFor="qty_length">Quantity integer part length:</label>
        <select
          className="form-control select2"
          style={{ width: "100%" }}
          id="qty_length"
          name="weighing_scale_setting[qty_length]"
        >
          <option value={0}>1</option>
          <option value={1}>2</option>
          <option value={2}>3</option>
          <option value={3} selected="selected">4</option>
          <option value={4}>5</option>
        </select>
      </div>
    </div>
    <div className="col-sm-3">
      <div className="form-group">
        <label htmlFor="qty_length_decimal">Quantity fractional part length:</label>
        <select className="form-control select2"style={{ width: "100%" }}id="qty_length_decimal"name="weighing_scale_setting[qty_length_decimal]">
          <option value={0}>1</option>
          <option value={1}>2</option>
          <option value={2} selected="selected">3</option>
          <option value={3}>4</option>
        </select>
      </div>
    </div>
  </div>
  </div>
  </div>
  <div className="pos-tab-content" id='purchase' style={{ display: activeTab === 'purchase' ? 'block' : 'none' }}>
    <div className="row">
      <div className="clearfix" />
      <div className="col-sm-6">
        <div className="form-group">
          <div className="checkbox">
            <label>
              <input className="input-icheck"defaultChecked="checked"
                name="enable_editing_product_from_purchase"type="checkbox"defaultValue={1}
              />
              Enable editing product price from purchase screen
            </label>
            <i
              className="fa fa-info-circle text-info hover-q no-print "
              aria-hidden="true"
              data-container="body"
              data-toggle="popover"
              data-placement="auto bottom"
              data-content="If enabled product purchase price and selling price will be updated after a purchase is added or updated"
              data-html="true"
              data-trigger="hover"
            />
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="form-group">
          <div className="checkbox">
            <label>
              <input
                className="input-icheck"
                id="enable_purchase_status"
                defaultChecked="checked"
                name="enable_purchase_status"
                type="checkbox"
                defaultValue={1}
              />{" "}
              Enable Purchase Status
            </label>
            <i
              className="fa fa-info-circle text-info hover-q no-print "
              aria-hidden="true"
              data-container="body"
              data-toggle="popover"
              data-placement="auto bottom"
              data-content="On disable all purchases will be marked as <i>Item Received</i>"
              data-html="true"
              data-trigger="hover"
            />{" "}
          </div>
        </div>
      </div>
      <div className="clearfix" />
      <div className="col-sm-6">
        <div className="form-group">
          <div className="checkbox">
            <label>
              <input
                className="input-icheck"
                id="enable_lot_number"
                name="enable_lot_number"
                type="checkbox"
                defaultValue={1}
              />{" "}
              Enable Lot number
            </label>
            <i
              className="fa fa-info-circle text-info hover-q no-print "
              aria-hidden="true"
              data-container="body"
              data-toggle="popover"
              data-placement="auto bottom"
              data-content="This will enable you to enter Lot number for each purchase line in purchase screen"
              data-html="true"
              data-trigger="hover"
            />{" "}
          </div>
        </div>
      </div>
      <div className="col-sm-6">
    <div className="form-group">
      <div className="checkbox">
        <label>
          <input
            className="input-icheck"
            id="enable_purchase_order"
            name="common_settings[enable_purchase_order]"
            type="checkbox"
            defaultValue={1}
          />{" "}
          Enable purchase order
        </label>
        <i
          className="fa fa-info-circle text-info hover-q no-print "
          aria-hidden="true"
          data-container="body"
          data-toggle="popover"
          data-placement="auto bottom"
          data-content="A purchase order is a commercial document and first official offer issued by a buyer to a seller indicating types, quantities, and agreed prices for products or services. It is used to control the purchasing of products and services from external suppliers.Purchase orders can be an essential part of enterprise resource planning system orders."
          data-html="true"
          data-trigger="hover"
        />{" "}
      </div>
    </div>
  </div>
  <div className="clearfix" />
  <div className="col-sm-6">
    <div className="form-group">
      <div className="checkbox">
        <label>
          <input
            className="input-icheck"
            id="enable_purchase_requisition"
            name="common_settings[enable_purchase_requisition]"
            type="checkbox"
            defaultValue={1}
          />{" "}
          Enable Purchase Requisition
        </label>
        <i
          className="fa fa-info-circle text-info hover-q no-print "
          aria-hidden="true"
          data-container="body"
          data-toggle="popover"
          data-placement="auto bottom"
          data-content="A purchase requisition is a document that an employee creates to request a purchase of goods or services."
          data-html="true"
          data-trigger="hover"
        />{" "}
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <div className="checkbox">
        <label>
          <input
            className="input-icheck"
            type="checkbox"
            name="enable_purchase_batch_no"
            defaultValue={1}
          />{" "}
          Enable Batch No
        </label>
      </div>
    </div>
  </div>
  </div>
  </div>
                <div className="pos-tab-content" id='payment' style={{ display: activeTab === 'payment' ? 'block' : 'none' }}>
    <div className="row">
      <div className="col-md-12">
        <div className="form-group">
          <label htmlFor="cash_denominations">Cash Denominations:</label>
          <input
            className="form-control"
            id="cash_denominations"
            name="pos_settings[cash_denominations]"
            type="text"
          />
          <p className="help-block">
            Comma separated values Example: 100,200,500,2000
          </p>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="enable_cash_denomination_on">
            Enable cash denomination on:
          </label>
          <select
            className="form-control"
            style={{ width: "100%" }}
            name="pos_settings[enable_cash_denomination_on]"
          >
            <option value="pos_screen" selected="selected">
              POS screen
            </option>
            <option value="all_screens">All screens</option>
          </select>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="enable_cash_denomination_for_payment_methods">
            Enable cash denomination for payment methods:
          </label>
          <select
            className="form-control select2"
            style={{ width: "100%" }}
            multiple=""
            name="pos_settings[enable_cash_denomination_for_payment_methods][]"
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="cheque">Cheque</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="other">Other</option>
            <option value="custom_pay_1">Benefit Pay</option>
            <option value="custom_pay_2">Custom Payment 2</option>
            <option value="custom_pay_3">Custom Payment 3</option>
            <option value="custom_pay_4">Custom Payment 4</option>
            <option value="custom_pay_5">Custom Payment 5</option>
            <option value="custom_pay_6">Custom Payment 6</option>
            <option value="custom_pay_7">Custom Payment 7</option>
          </select>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <div className="checkbox">
            <br />
            <label>
              <input
                className="input-icheck"
                name="pos_settings[cash_denomination_strict_check]"
                type="checkbox"
                defaultValue={1}
              />{" "}
              Strict check
            </label>
            <i
              className="fa fa-info-circle text-info hover-q no-print "
              aria-hidden="true"
              data-container="body"
              data-toggle="popover"
              data-placement="auto bottom"
              data-content="If enabled payment amount must be equal to sum of cash denominations"
              data-html="true"
              data-trigger="hover"
            />{" "}
          </div>
        </div>
      </div>
    </div>
                </div>
                <div className="pos-tab-content" id='dashboard' style={{ display: activeTab === 'dashboard' ? 'block' : 'none' }}>
    <div className="row">
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="stock_expiry_alert_days">
            View Stock Expiry Alert For:*
          </label>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fas fa-calendar-times" />
            </span>
            <input
              className="form-control"
              required=""
              name="stock_expiry_alert_days"
              type="number"
              defaultValue={30}
              id="stock_expiry_alert_days"
            />
            <span className="input-group-addon">Days </span>
          </div>
        </div>
      </div>
    </div>
                </div>
                <div className="pos-tab-content" id='system' style={{ display: activeTab === 'system' ? 'block' : 'none' }}>
    <div className="row">
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="theme_color">Theme Color</label>
          <select
            className="form-control select2"
            style={{ width: "100%" }}
            id="theme_color"
            name="theme_color"
          >
            <option selected="selected" value="">
              Please Select
            </option>
            <option value="blue">Blue</option>
            <option value="black">Black</option>
            <option value="purple">Purple</option>
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
            <option value="blue-light">Blue Light</option>
            <option value="black-light">Black Light</option>
            <option value="purple-light">Purple Light</option>
            <option value="green-light">Green Light</option>
            <option value="red-light">Red Light</option>
          </select>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="default_datatable_page_entries">
            Default datatable page entries
          </label>
          <select
            className="form-control select2"
            style={{ width: "100%" }}
            id="default_datatable_page_entries"
            name="common_settings[default_datatable_page_entries]"
          >
            <option value={25} selected="selected">
              25
            </option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={500}>500</option>
            <option value={1000}>1000</option>
            <option value={-1}>All</option>
          </select>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <div className="checkbox">
            <label>
              <input
                className="input-icheck"
                defaultChecked="checked"
                name="enable_tooltip"
                type="checkbox"
                defaultValue={1}
              />{" "}
              Show help text
            </label>
          </div>
        </div>
      </div>
    </div>
                </div>
                <div className="pos-tab-content" id='prefix' style={{ display: activeTab === 'prefix' ? 'block' : 'none' }}>
    <div className="row">
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="ref_no_prefixes[purchase]">Purchase:</label>
          <input
            className="form-control"
            name="ref_no_prefixes[purchase]"
            type="text"
            defaultValue="PO"
            id="ref_no_prefixes[purchase]"
          />
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="ref_no_prefixes[purchase_return]">
            Purchase Return:
          </label>
          <input
            className="form-control"
            name="ref_no_prefixes[purchase_return]"
            type="text"
            defaultValue=""
            id="ref_no_prefixes[purchase_return]"
          />
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="ref_no_prefixes[purchase_requisition]">
            Purchase Requisition:
          </label>
          <input
            className="form-control"
            name="ref_no_prefixes[purchase_requisition]"
            type="text"
            defaultValue=""
            id="ref_no_prefixes[purchase_requisition]"
          />
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="ref_no_prefixes[purchase_order]">
            Purchase Order:
          </label>
          <input
            className="form-control"
            name="ref_no_prefixes[purchase_order]"
            type="text"
            defaultValue=""
            id="ref_no_prefixes[purchase_order]"
          />
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="ref_no_prefixes[stock_transfer]">
            Stock Transfer:
          </label>
          <input
            className="form-control"
            name="ref_no_prefixes[stock_transfer]"
            type="text"
            defaultValue="ST"
            id="ref_no_prefixes[stock_transfer]"
          />
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="ref_no_prefixes[stock_adjustment]">
            Stock Adjustment:
          </label>
          <input
            className="form-control"
            name="ref_no_prefixes[stock_adjustment]"
            type="text"
            defaultValue="SA"
            id="ref_no_prefixes[stock_adjustment]"
          />
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="ref_no_prefixes[sell_return]">Sell Return:</label>
          <input
            className="form-control"
            name="ref_no_prefixes[sell_return]"
            type="text"
            defaultValue="CN"
            id="ref_no_prefixes[sell_return]"
          />
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="ref_no_prefixes[expense]">Expenses:</label>
          <input
            className="form-control"
            name="ref_no_prefixes[expense]"
            type="text"
            defaultValue="EP"
            id="ref_no_prefixes[expense]"
          />
        </div>
        <div className="col-sm-4">
    <div className="form-group">
      <label htmlFor="ref_no_prefixes[contacts]">Contacts:</label>
      <input
            className="form-control"
            name="ref_no_prefixes[contacts]"
            type="text"
            defaultValue="co"
            id="ref_no_prefixes[contacts]"
          />
    </div>
        </div>
        <div className="col-sm-4">
    <div className="form-group">
      <label htmlFor="ref_no_prefixes[purchase_payment]">
        Purchase Payment:
      </label>
      <input
        className="form-control"
        name="ref_no_prefixes[purchase_payment]"
        type="text"
        defaultValue="PP"
        id="ref_no_prefixes[purchase_payment]"
      />
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group">
      <label htmlFor="ref_no_prefixes[sell_payment]">Sell Payment:</label>
      <input
        className="form-control"
        name="ref_no_prefixes[sell_payment]"
        type="text"
        defaultValue="SP"
        id="ref_no_prefixes[sell_payment]"
      />
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group">
      <label htmlFor="ref_no_prefixes[expense_payment]">Expense Payment:</label>
      <input
        className="form-control"
        name="ref_no_prefixes[expense_payment]"
        type="text"
        defaultValue=""
        id="ref_no_prefixes[expense_payment]"
      />
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group">
      <label htmlFor="ref_no_prefixes[business_location]">
        Business Location:
      </label>
      <input
        className="form-control"
        name="ref_no_prefixes[business_location]"
        type="text"
        defaultValue="BL"
        id="ref_no_prefixes[business_location]"
      />
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group">
      <label htmlFor="ref_no_prefixes[username]">Username:</label>
      <input
        className="form-control"
        name="ref_no_prefixes[username]"
        type="text"
        defaultValue=""
        id="ref_no_prefixes[username]"
      />
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group">
      <label htmlFor="ref_no_prefixes[subscription]">Subscription No.:</label>
      <input
        className="form-control"
        name="ref_no_prefixes[subscription]"
        type="text"
        defaultValue=""
        id="ref_no_prefixes[subscription]"
      />
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group">
      <label htmlFor="ref_no_prefixes[draft]">Draft:</label>
      <input
        className="form-control"
        name="ref_no_prefixes[draft]"
        type="text"
        defaultValue=""
        id="ref_no_prefixes[draft]"
      />
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group">
      <label htmlFor="ref_no_prefixes[sales_order]">Sales Order:</label>
      <input
        className="form-control"
        name="ref_no_prefixes[sales_order]"
        type="text"
        defaultValue=""
        id="ref_no_prefixes[sales_order]"
      />
    </div>
  </div>
      </div>
    </div>
                </div>
                <div className="pos-tab-content" id='emailSettings' style={{ display: activeTab === 'emailSettings' ? 'block' : 'none' }}>
    <div className="row">
      <div className="col-xs-12">
        <div className="form-group">
          <div className="checkbox">
            <br />
            <label>
              <input
                className="input-icheck"
                id="use_superadmin_settings"
                name="email_settings[use_superadmin_settings]"
                type="checkbox"
                defaultValue={1}
              />{" "}
              Use system email configurations
            </label>
          </div>
        </div>
      </div>
      <div id="toggle_visibility">
        <div className="col-xs-4">
          <div className="form-group">
            <label htmlFor="mail_driver">Mail Driver:</label>
            <select
              className="form-control"
              id="mail_driver"
              name="email_settings[mail_driver]"
            >
              <option value="smtp" selected="selected">
                SMTP
              </option>
            </select>
          </div>
        </div>
        <div className="col-xs-4">
          <div className="form-group">
            <label htmlFor="mail_host">Host:</label>
            <input
              className="form-control"
              placeholder="Host"
              id="mail_host"
              name="email_settings[mail_host]"
              type="text"
            />
          </div>
        </div>
        <div className="col-xs-4">
          <div className="form-group">
            <label htmlFor="mail_port">Port:</label>
            <input
              className="form-control"
              placeholder="Port"
              id="mail_port"
              name="email_settings[mail_port]"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="col-xs-4">
  <div className="form-group">
    <label htmlFor="mail_username">Username:</label>
    <input
      className="form-control"
      placeholder="Username"
      id="mail_username"
      name="email_settings[mail_username]"
      type="text"
    />
  </div>
</div>
<div className="col-xs-4">
  <div className="form-group">
    <label htmlFor="mail_username">Password:</label>
    <input type="password" name="email_settings[mail_password]" value="" class="form-control" placeholder="Password" id="mail_password"/>
  </div>
</div>
<div className="col-xs-4">
  <div className="form-group">
    <label htmlFor="mail_encryption">Encryption:</label>
    <input
      className="form-control"
      placeholder="tls / ssl"
      id="mail_encryption"
      name="email_settings[mail_encryption]"
      type="text"
    />
  </div>
</div>
<div className="col-xs-4">
    <div className="form-group">
      <label htmlFor="mail_from_address">From Address:</label>
      <input
        className="form-control"
        placeholder="From Address"
        id="mail_from_address"
        name="email_settings[mail_from_address]"
        type="email"
      />
    </div>
  </div>
  <div className="col-xs-4">
    <div className="form-group">
      <label htmlFor="mail_from_name">From Name:</label>
      <input
        className="form-control"
        placeholder="From Name"
        id="mail_from_name"
        name="email_settings[mail_from_name]"
        type="text"
      />
    </div>
  </div>
  <div className="clearfix" />
  <div className="col-xs-12 test_email_btn ">
    <button
      type="button"
      className="btn btn-success pull-right"
      id="test_email_btn"
    >
      Send test email
    </button>
  </div>
    </div>
                </div>
                <div className="pos-tab-content" id='smsSettings' style={{ display: activeTab === 'smsSettings' ? 'block' : 'none' }}>
    <div className="row">
      <div className="col-xs-3">
        <div className="form-group">
          <label htmlFor="sms_service">SMS Service:</label>
          <select
            className="form-control"
            id="sms_service"
            name="sms_settings[sms_service]"
          >
            <option value="nexmo">Nexmo</option>
            <option value="twilio">Twilio</option>
            <option value="other" selected="selected">
              Other
            </option>
          </select>
        </div>
      </div>
    </div>
    <div className="row sms_service_settings  hide " data-service="nexmo">
      <div className="col-xs-3">
        <div className="form-group">
          <label htmlFor="nexmo_key">Nexmo Key:</label>
          <input
            className="form-control"
            placeholder="Nexmo Key"
            id="nexmo_key"
            name="sms_settings[nexmo_key]"
            type="text"
          />
        </div>
      </div>
      <div className="col-xs-3">
        <div className="form-group">
          <label htmlFor="nexmo_secret">Nexmo Secret:</label>
          <input
            className="form-control"
            placeholder="Nexmo Secret"
            id="nexmo_secret"
            name="sms_settings[nexmo_secret]"
            type="text"
          />
        </div>
      </div>
      <div className="col-xs-3">
        <div className="form-group">
          <label htmlFor="nexmo_from">From:</label>
          <input
            className="form-control"
            placeholder="From"
            id="nexmo_from"
            name="sms_settings[nexmo_from]"
            type="text"
          />
        </div>
      </div>
    </div>
    <div className="row sms_service_settings  hide " data-service="twilio">
      <div className="col-xs-3">
        <div className="form-group">
          <label htmlFor="twilio_sid">Twilio Account SID:</label>
          <input
            className="form-control"
            placeholder="Twilio Account SID"
            id="twilio_sid"
            name="sms_settings[twilio_sid]"
            type="text"
          />
        </div>
      </div>
      <div className="col-xs-3">
        <div className="form-group">
          <label htmlFor="twilio_token">Twilio Access Token:</label>
          <input
            className="form-control"
            placeholder="Twilio Access Token"
            id="twilio_token"
            name="sms_settings[twilio_token]"
            type="text"
          />
        </div>
      </div>
      <div className="col-xs-3">
        <div className="form-group">
          <label htmlFor="twilio_from">From:</label>
          <input
            className="form-control"
            placeholder="From"
            id="twilio_from"
            name="sms_settings[twilio_from]"
            type="text"
          />
        </div>
      </div>
    </div>
    <div className="row sms_service_settings " data-service="other">
      <div className="col-xs-3">
        <div className="form-group">
          <label htmlFor="sms_settings_url">URL:</label>
          <input
            className="form-control"
            placeholder="URL"
            id="sms_settings_url"
            name="sms_settings[url]"
            type="text"
          />
        </div>
      </div>
      <div className="col-xs-3">
        <div className="form-group">
          <label htmlFor="send_to_param_name">Send to parameter name:</label>
          <input
            className="form-control"
            placeholder="Send to parameter name"
            id="send_to_param_name"
            name="sms_settings[send_to_param_name]"
            type="text"
            defaultValue="to"
          />
        </div>
      </div>
      <div className="col-xs-3">
        <div className="form-group">
          <label htmlFor="msg_param_name">Message parameter name:</label>
          <input
            className="form-control"
            placeholder="Message parameter name"
            id="msg_param_name"
            name="sms_settings[msg_param_name]"
            type="text"
            defaultValue="text"
          />
        </div>
      </div>
      <div className="col-xs-3">
        <div className="form-group">
          <label htmlFor="request_method">Request Method:</label>
          <select
            className="form-control"
            id="request_method"
            name="sms_settings[request_method]"
          >
            <option value="get">GET</option>
            <option value="post" selected="selected">
              POST
            </option>
          </select>
        </div>
      </div>
      <div className="clearfix" />
      <hr />
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_header_key1">Header 1 key:</label>
          <input
            className="form-control"
            placeholder="Header 1 key"
            id="sms_settings_header_key1"
            name="sms_settings[header_1]"
            type="text"
          />
        </div>
      </div>
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_header_val1">Header 1 value:</label>
          <input
            className="form-control"
            placeholder="Header 1 value"
            id="sms_settings_header_val1"
            name="sms_settings[header_val_1]"
            type="text"
          />
        </div>
      </div>
      <div className="clearfix" />
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_header_key2">Header 2 key:</label>
          <input
            className="form-control"
            placeholder="Header 2 key"
            id="sms_settings_header_key2"
            name="sms_settings[header_2]"
            type="text"
          />
        </div>
      </div>
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_header_val2">Header 2 value:</label>
          <input
            className="form-control"
            placeholder="Header 2 value"
            id="sms_settings_header_val2"
            name="sms_settings[header_val_2]"
            type="text"
          />
        </div>
      </div>
      <div className="clearfix" />
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_header_key3">Header 3 key:</label>
          <input
            className="form-control"
            placeholder="Header 3 key"
            id="sms_settings_header_key3"
            name="sms_settings[header_3]"
            type="text"
          />
        </div>
      </div>
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_header_val3">Header 3 value:</label>
          <input
            className="form-control"
            placeholder="Header 3 value"
            id="sms_settings_header_val3"
            name="sms_settings[header_val_3]"
            type="text"
          />
        </div>
      </div>
      <div className="clearfix" />
      <hr />
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_key1">Parameter 1 key:</label>
          <input
            className="form-control"
            placeholder="Parameter 1 value"
            id="sms_settings_param_key1"
            name="sms_settings[param_1]"
            type="text"
          />
        </div>
      </div>
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_val1">Parameter 1 value:</label>
          <input
            className="form-control"
            placeholder="Parameter 1 value"
            id="sms_settings_param_val1"
            name="sms_settings[param_val_1]"
            type="text"
          />
        </div>
      </div>
      <div className="clearfix" />
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_key2">Parameter 2 key:</label>
          <input
            className="form-control"
            placeholder="Parameter 2 value"
            id="sms_settings_param_key2"
            name="sms_settings[param_2]"
            type="text"
          />
        </div>
      </div>
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_val2">Parameter 2 value:</label>
          <input
            className="form-control"
            placeholder="Parameter 2 value"
            id="sms_settings_param_val2"
            name="sms_settings[param_val_2]"
            type="text"
          />
        </div>
      </div>
      <div className="clearfix" />
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_key3">Parameter 3 key:</label>
          <input
            className="form-control"
            placeholder="Parameter 3 value"
            id="sms_settings_param_key3"
            name="sms_settings[param_3]"
            type="text"
          />
        </div>
      </div>
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_val3">Parameter 3 value:</label>
          <input
            className="form-control"
            placeholder="Parameter 3 value"
            id="sms_settings_param_val3"
            name="sms_settings[param_val_3]"
            type="text"
          />
        </div>
      </div>
      <div className="clearfix" />
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_key4">Parameter 4 key:</label>
          <input
            className="form-control"
            placeholder="Parameter 4 value"
            id="sms_settings_param_key4"
            name="sms_settings[param_4]"
            type="text"
          />
        </div>
      </div>
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_val4">Parameter 4 value:</label>
          <input
            className="form-control"
            placeholder="Parameter 4 value"
            id="sms_settings_param_val4"
            name="sms_settings[param_val_4]"
            type="text"
          />
        </div>
      </div>
      <div className="clearfix" />
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_key5">Parameter 5 key:</label>
          <input
            className="form-control"
            placeholder="Parameter 5 value"
            id="sms_settings_param_key5"
            name="sms_settings[param_5]"
            type="text"
          />
        </div>
      </div>
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_val5">Parameter 5 value:</label>
          <input
            className="form-control"
            placeholder="Parameter 5 value"
            id="sms_settings_param_val5"
            name="sms_settings[param_val_5]"
            type="text"
          />
        </div>
      </div>
      <div className="clearfix" />
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_key6">Parameter 6 key:</label>
          <input
            className="form-control"
            placeholder="Parameter 6 value"
            id="sms_settings_param_key6"
            name="sms_settings[param_6]"
            type="text"
          />
        </div>
      </div>
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_val6">Parameter 6 value:</label>
          <input
            className="form-control"
            placeholder="Parameter 6 value"
            id="sms_settings_param_val6"
            name="sms_settings[param_val_6]"
            type="text"
          />
        </div>
      </div>
      <div className="clearfix" />
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_key7">Parameter 7 key:</label>
          <input
            className="form-control"
            placeholder="Parameter 7 value"
            id="sms_settings_param_key7"
            name="sms_settings[param_7]"
            type="text"
          />
        </div>
      </div>
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_val7">Parameter 7 value:</label>
          <input
            className="form-control"
            placeholder="Parameter 7 value"
            id="sms_settings_param_val7"
            name="sms_settings[param_val_7]"
            type="text"
          />
        </div>
      </div>
      <div className="clearfix" />
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_key8">Parameter 8 key:</label>
          <input
            className="form-control"
            placeholder="Parameter 8 value"
            id="sms_settings_param_key8"
            name="sms_settings[param_8]"
            type="text"
          />
        </div>
      </div>
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_val8">Parameter 8 value:</label>
          <input
            className="form-control"
            placeholder="Parameter 8 value"
            id="sms_settings_param_val8"
            name="sms_settings[param_val_8]"
            type="text"
          />
        </div>
      </div>
      <div className="clearfix" />
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_key9">Parameter 9 key:</label>
          <input
            className="form-control"
            placeholder="Parameter 9 value"
            id="sms_settings_param_key9"
            name="sms_settings[param_9]"
            type="text"
          />
        </div>
      </div>
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_val9">Parameter 9 value:</label>
          <input
            className="form-control"
            placeholder="Parameter 9 value"
            id="sms_settings_param_val9"
            name="sms_settings[param_val_9]"
            type="text"
          />
        </div>
      </div>
      <div className="clearfix" />
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_key10">Parameter 10 key:</label>
          <input
            className="form-control"
            placeholder="Parameter 10 value"
            id="sms_settings_param_key10"
            name="sms_settings[param_10]"
            type="text"
          />
        </div>
      </div>
      <div className="col-xs-4">
        <div className="form-group">
          <label htmlFor="sms_settings_param_val10">Parameter 10 value:</label>
          <input
            className="form-control"
            placeholder="Parameter 10 value"
            id="sms_settings_param_val10"
            name="sms_settings[param_val_10]"
            type="text"
          />
        </div>
      </div>
      <div className="clearfix" />
      <hr />
      <div className="col-md-8 col-xs-12">
        <div className="form-group">
          <div className="input-group">
            <input
              className="form-control"
              placeholder="Test Number"
              id="test_number"
              name="test_number"
              type="text"
            />
            <span className="input-group-btn">
              <button
                type="button"
                className="btn btn-success pull-right"
                id="test_sms_btn"
              >
                Send test SMS
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
                </div>
                <div className="pos-tab-content" id='rewardPointSettings' style={{ display: activeTab === 'rewardpointsettings' ? 'block' : 'none' }}>
    <div className="row well">
      <div className="col-sm-4">
        <div className="form-group">
          <div className="checkbox">
            <label>
              <input
                className="input-icheck"
                id="enable_rp"
                name="enable_rp"
                type="checkbox"
                defaultValue={1}
              />{" "}
              Enable Reward Point
            </label>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="rp_name">Reward Point Display Name:</label>
          <input
            className="form-control"
            placeholder="Reward Point Display Name"
            name="rp_name"
            type="text"
            id="rp_name"
          />
        </div>
      </div>
      <div className="clearfix" />
      <div className="col-sm-12">
        <h4>Earning Points Settings:</h4>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="amount_for_unit_rp">
            Amount spend for unit point:
          </label>{" "}
          <i
            className="fa fa-info-circle text-info hover-q no-print "
            aria-hidden="true"
            data-container="body"
            data-toggle="popover"
            data-placement="auto bottom"
            data-content="<strong>Meaning how much the customer spent to get one reward points.</strong> <br><br> <strong>Example:</strong> If you set it as 10, then for every $10 spent by customer they will get one reward points. If the customer purchases for $1000 then they will get 100 reward points."
            data-html="true"
            data-trigger="hover"
          />{" "}
          <input
            className="form-control input_number"
            placeholder="Amount spend for unit point"
            name="amount_for_unit_rp"
            type="text"
            defaultValue={1.0}
            id="amount_for_unit_rp"
          />
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="min_order_total_for_rp">
            Minimum order total to earn reward:
          </label>{" "}
          <i
            className="fa fa-info-circle text-info hover-q no-print "
            aria-hidden="true"
            data-container="body"
            data-toggle="popover"
            data-placement="auto bottom"
            data-content="<strong>The minimum amount the customer should spend to get reward points.</strong> <br><br> <strong>Example:</strong> If you set it as 100 then customer will get reward points only if there invoice total is greater or equal to 100. If invoice total is 99 then they won’t get any reward points. <br><br>You can set it as minimum 1."
            data-html="true"
            data-trigger="hover"
          />{" "}
          <input
            className="form-control input_number"
            placeholder="Minimum order total to earn reward"
            name="min_order_total_for_rp"
            type="text"
            defaultValue={1.0}
            id="min_order_total_for_rp"
          />
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="max_rp_per_order">Maximum points per order:</label>{" "}
          <i
            className="fa fa-info-circle text-info hover-q no-print "
            aria-hidden="true"
            data-container="body"
            data-toggle="popover"
            data-placement="auto bottom"
            data-content="Maximum reward points customers can earn in one invoice. Leave it empty if you don’t want any such restrictions."
            data-html="true"
            data-trigger="hover"
          />{" "}
          <input
            className="form-control"
            placeholder="Maximum points per order"
            name="max_rp_per_order"
            type="number"
            id="max_rp_per_order"
          />
        </div>
      </div>
    </div>
    <div className="row well">
      <div className="col-sm-12">
        <h4>Redeem Points Settings:</h4>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="redeem_amount_per_unit_rp">
            Redeem amount per unit point:
          </label>{" "}
          <i
            className="fa fa-info-circle text-info hover-q no-print "
            aria-hidden="true"
            data-container="body"
            data-toggle="popover"
            data-placement="auto bottom"
            data-content="<strong> It indicates the redeem amount per point.</strong> <br><br> <strong>For example:</strong>If 1 point is $1 then enter the value as 1. If 2 points is $1 then enter the value as 0.50"
            data-html="true"
            data-trigger="hover"
          />{" "}
          <input
            className="form-control input_number"
            placeholder="Redeem amount per unit point"
            name="redeem_amount_per_unit_rp"
            type="text"
            defaultValue={1.0}
            id="redeem_amount_per_unit_rp"
          />
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="min_order_total_for_redeem">
            Minimum order total to redeem points:
          </label>{" "}
          <i
            className="fa fa-info-circle text-info hover-q no-print "
            aria-hidden="true"
            data-container="body"
            data-toggle="popover"
            data-placement="auto bottom"
            data-content="Minimum order total for which customers can redeem points. Leave it blank if you don’t need this restriction or you need to give something for free."
            data-html="true"
            data-trigger="hover"
          />{" "}
          <input
            className="form-control input_number"
            placeholder="Minimum order total to redeem points"
            name="min_order_total_for_redeem"
            type="text"
            defaultValue={1.0}
            id="min_order_total_for_redeem"
          />
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="min_redeem_point">Minimum redeem point:</label>{" "}
          <i
            className="fa fa-info-circle text-info hover-q no-print "
            aria-hidden="true"
            data-container="body"
            data-toggle="popover"
            data-placement="auto bottom"
            data-content="Minimum redeem points that can be used per invoice. Leave it blank if you don’t need this restriction."
            data-html="true"
            data-trigger="hover"
          />{" "}
          <input
            className="form-control"
            placeholder="Minimum redeem point"
            name="min_redeem_point"
            type="number"
            id="min_redeem_point"
          />
        </div>
      </div>
      <div className="clearfix" />
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="max_redeem_point">
            Maximum redeem point per order:
          </label>{" "}
          <i
            className="fa fa-info-circle text-info hover-q no-print "
            aria-hidden="true"
            data-container="body"
            data-toggle="popover"
            data-placement="auto bottom"
            data-content="Maximum points that can be used in one order. Leave it blank if you don’t need this restriction."
            data-html="true"
            data-trigger="hover"
          />{" "}
          <input
            className="form-control"
            placeholder="Maximum redeem point per order"
            name="max_redeem_point"
            type="number"
            id="max_redeem_point"
          />
        </div>
      </div>
      <div className="col-sm-6">
        <div className="form-group">
          <label htmlFor="rp_expiry_period">Reward Point expiry period:</label>{" "}
          <i
            className="fa fa-info-circle text-info hover-q no-print "
            aria-hidden="true"
            data-container="body"
            data-toggle="popover"
            data-placement="auto bottom"
            data-content="<strong>Expiry period for points earned by customer.</strong>  <br><br>You can set it in months or year. Expired points will get deducted from customer account automatically after this period."
            data-html="true"
            data-trigger="hover"
          />{" "}
          <div className="input-group">
            <input
              className="form-control"
              placeholder="Reward Point expiry period"
              name="rp_expiry_period"
              type="number"
              id="rp_expiry_period"
            />
            <span className="input-group-addon">-</span>
            <select className="form-control" name="rp_expiry_type">
              <option value="month">Month</option>
              <option value="year" selected="selected">
                Year
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
                </div>
                <div className="pos-tab-content" id='modules' style={{ display: activeTab === 'modules' ? 'block' : 'none' }}>
    <div className="row">
      <h4>Enable/Disable Modules</h4>
      <div className="col-sm-4">
        <div className="form-group">
          <div className="checkbox">
            <br />
            <label>
              <input
                className="input-icheck"
                defaultChecked="checked"
                name="enabled_modules[]"
                type="checkbox"
                defaultValue="purchases"
              />{" "}
              Purchases
            </label>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <div className="checkbox">
            <br />
            <label>
              <input
                className="input-icheck"
                defaultChecked="checked"
                name="enabled_modules[]"
                type="checkbox"
                defaultValue="add_sale"
              />{" "}
              Add Sale
            </label>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <div className="checkbox">
            <br />
            <label>
              <input
                className="input-icheck"
                defaultChecked="checked"
                name="enabled_modules[]"
                type="checkbox"
                defaultValue="pos_sale"
              />{" "}
              POS
            </label>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <div className="checkbox">
            <br />
            <label>
              <input
                className="input-icheck"
                defaultChecked="checked"
                name="enabled_modules[]"
                type="checkbox"
                defaultValue="stock_transfers"
              />{" "}
              Stock Transfers
            </label>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <div className="checkbox">
            <br />
            <label>
              <input
                className="input-icheck"
                defaultChecked="checked"
                name="enabled_modules[]"
                type="checkbox"
                defaultValue="stock_adjustment"
              />{" "}
              Stock Adjustment
            </label>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <div className="checkbox">
            <br />
            <label>
              <input
                className="input-icheck"
                defaultChecked="checked"
                name="enabled_modules[]"
                type="checkbox"
                defaultValue="expenses"
              />{" "}
              Expenses
            </label>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <div className="checkbox">
            <br />
            <label>
              <input
                className="input-icheck"
                name="enabled_modules[]"
                type="checkbox"
                defaultValue="account"
              />{" "}
              Account
            </label>
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <div className="checkbox">
            <br />
            <label>
              <input
                className="input-icheck"
                name="enabled_modules[]"
                type="checkbox"
                defaultValue="tables"
              />{" "}
              Tables
            </label>
            <i
              className="fa fa-info-circle text-info hover-q no-print "
              aria-hidden="true"
              data-container="body"
              data-toggle="popover"
              data-placement="auto bottom"
              data-content="Used mostly in restaurants, bars, salons etc"
              data-html="true"
              data-trigger="hover"
            />{" "}
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <div className="checkbox">
            <br />
            <label>
              <input
                className="input-icheck"
                name="enabled_modules[]"
                type="checkbox"
                defaultValue="modifiers"
              />{" "}
              Modifiers
            </label>
            <i
              className="fa fa-info-circle text-info hover-q no-print "
              aria-hidden="true"
              data-container="body"
              data-toggle="popover"
              data-placement="auto bottom"
              data-content="Extra items added with the main product<br>Example:Toppings, Cheese"
              data-html="true"
              data-trigger="hover"
            />{" "}
          </div>
        </div>
      </div>
      <div className="col-sm-4">
    <div className="form-group">
      <div className="checkbox">
        <br />
        <label>
          <input
            className="input-icheck"
            name="enabled_modules[]"
            type="checkbox"
            defaultValue="service_staff"
          />{" "}
          Service staff
        </label>
        <i
          className="fa fa-info-circle text-info hover-q no-print "
          aria-hidden="true"
          data-container="body"
          data-toggle="popover"
          data-placement="auto bottom"
          data-content="Person who provides the designated service to customers<br> Example: Waiting Staff in restaurants, Hairdressers in salon"
          data-html="true"
          data-trigger="hover"
        />{" "}
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group">
      <div className="checkbox">
        <br />
        <label>
          <input
            className="input-icheck"
            name="enabled_modules[]"
            type="checkbox"
            defaultValue="booking"
          />{" "}
          Enable Bookings
        </label>
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group">
      <div className="checkbox">
        <br />
        <label>
          <input
            className="input-icheck"
            name="enabled_modules[]"
            type="checkbox"
            defaultValue="kitchen"
          />{" "}
          Kitchen (For restaurants)
        </label>
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group">
      <div className="checkbox">
        <br />
        <label>
          <input
            className="input-icheck"
            name="enabled_modules[]"
            type="checkbox"
            defaultValue="subscription"
          />{" "}
          Enable Subscription
        </label>
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group">
      <div className="checkbox">
        <br />
        <label>
          <input
            className="input-icheck"
            name="enabled_modules[]"
            type="checkbox"
            defaultValue="types_of_service"
          />{" "}
          Types of service
        </label>
        <i
          className="fa fa-info-circle text-info hover-q no-print "
          aria-hidden="true"
          data-container="body"
          data-toggle="popover"
          data-placement="auto bottom"
          data-content="Type of service means services like dine-in, parcel, home delivery, third party delivery etc. It can be enabled/disabled from <code>Settings > Modules</code> and can be created from <code>Settings > Types of service</code>. You can also define different price group & packing charge for service types."
          data-html="true"
          data-trigger="hover"
        />{" "}
      </div>
    </div>
  </div>

    </div>
                </div>
                <div className="pos-tab-content" id='customs' style={{ display: activeTab === 'customs' ? 'block' : 'none' }}>
    <div className="row">
      <div className="col-sm-12">
        <h4>Labels for custom payments:</h4>
      </div>
      <div className="clearfix" />
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="custom_payment_1_label">Custom Payment 1</label>
          <input
            className="form-control"
            id="custom_payment_1"
            readOnly=""
            name="custom_labels[payments][custom_pay_1]"
            type="text"
            defaultValue="Benefit Pay"
          />
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="custom_payment_2_label">Custom Payment 2</label>
          <input
            className="form-control"
            id="custom_payment_2"
            name="custom_labels[payments][custom_pay_2]"
            type="text"
          />
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="custom_payment_3_label">Custom Payment 3</label>
          <input
            className="form-control"
            id="custom_payment_3"
            name="custom_labels[payments][custom_pay_3]"
            type="text"
          />
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="custom_payment_4_label">Custom Payment 4</label>
          <input
            className="form-control"
            id="custom_payment_4"
            name="custom_labels[payments][custom_pay_4]"
            type="text"
          />
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="custom_payment_5_label">Custom Payment 5</label>
          <input
            className="form-control"
            id="custom_payment_5"
            name="custom_labels[payments][custom_pay_5]"
            type="text"
          />
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="custom_payment_6_label">Custom Payment 6</label>
          <input
            className="form-control"
            id="custom_payment_6"
            name="custom_labels[payments][custom_pay_6]"
            type="text"
          />
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group">
          <label htmlFor="custom_payment_6_label">Custom Payment 7</label>
          <input
            className="form-control"
            id="custom_payment_7"
            name="custom_labels[payments][custom_pay_7]"
            type="text"
          />
        </div>
      </div>
      <div className="clearfix" />
      <div className="col-sm-12">
        <h4>Labels for contact custom fields:</h4>
      </div>
      <div className="col-sm-3">
        <div className="form-group">
          <label htmlFor="contact_custom_field_1_label">Custom Field 1</label>
          <input
            className="form-control"
            id="contact_custom_field_1_label"
            name="custom_labels[contact][custom_field_1]"
            type="text"
          />
        </div>
      </div>
      <div className="col-sm-3">
        <div className="form-group">
          <label htmlFor="contact_custom_field_2_label">Custom Field 2</label>
          <input
            className="form-control"
            id="contact_custom_field_2_label"
            name="custom_labels[contact][custom_field_2]"
            type="text"
          />
        </div>
      </div>
      <div className="col-sm-3">
        <div className="form-group">
          <label htmlFor="contact_custom_field_3_label">Custom Field 3</label>
          <input
            className="form-control"
            id="contact_custom_field_3_label"
            name="custom_labels[contact][custom_field_3]"
            type="text"
          />
        </div>
      </div>
      <div className="col-sm-3">
        <div className="form-group">
          <label htmlFor="contact_custom_field_4_label">Custom Field 4</label>
          <input
            className="form-control"
            id="contact_custom_field_4_label"
            name="custom_labels[contact][custom_field_4]"
            type="text"
          />
        </div>
      </div>
      <div className="col-sm-3">
        <div className="form-group">
          <label htmlFor="contact_custom_field_5_label">Custom Field 5</label>
          <input
            className="form-control"
            id="contact_custom_field_5_label"
            name="custom_labels[contact][custom_field_5]"
            type="text"
          />
        </div>
      </div>
      <div className="col-sm-3">
        <div className="form-group">
          <label htmlFor="contact_custom_field_6_label">Custom Field 6</label>
          <input
            className="form-control"
            id="contact_custom_field_6_label"
            name="custom_labels[contact][custom_field_6]"
            type="text"
          />
        </div>
      </div>
      <div className="col-sm-3">
        <div className="form-group">
          <label htmlFor="contact_custom_field_7_label">Custom Field 7</label>
          <input
            className="form-control"
            id="contact_custom_field_7_label"
            name="custom_labels[contact][custom_field_7]"
            type="text"
          />
        </div>
      </div>
      <div className="col-sm-3">
        <div className="form-group">
          <label htmlFor="contact_custom_field_8_label">Custom Field 8</label>
          <input
            className="form-control"
            id="contact_custom_field_8_label"
            name="custom_labels[contact][custom_field_8]"
            type="text"
          />
        </div>
      </div>
      <div className="col-sm-3">
        <div className="form-group">
          <label htmlFor="contact_custom_field_9_label">Custom Field 9</label>
          <input
            className="form-control"
            id="contact_custom_field_9_label"
            name="custom_labels[contact][custom_field_9]"
            type="text"
          />
        </div>
      </div>
      <div className="col-sm-3">
        <div className="form-group">
          <label htmlFor="contact_custom_field_10_label">Custom Field 10</label>
          <input
            className="form-control"
            id="contact_custom_field_10_label"
            name="custom_labels[contact][custom_field_10]"
            type="text"
          />
        </div>
      </div>
      <div className="clearfix" />
      <div className="col-sm-12">
        <h4>Labels for product custom fields:</h4>
      </div>
      <div className="col-sm-4">
        <div className="form-group custom_label_product_div">
          <label htmlFor="product_custom_field_label_1">Custom Field 1</label>
          <div className="input-group">
            <input
              className="form-control"
              id="product_custom_field_label_1"
              name="custom_labels[product][custom_field_1]"
              type="text"
            />
            <div className="input-group-addon">
              <select
                className="custom_labels_products"
                name="custom_labels[product_cf_details][1][type]"
              >
                <option value="">Field Type</option>
                <option value="text">Text </option>
                <option value="date">Datepicker </option>
                <option value="dropdown">Dropdown </option>
              </select>
            </div>
          </div>
          <div className="form-group custom_label_product_dropdown  hide ">
            <textarea
              name="custom_labels[product_cf_details][1][dropdown_options]"
              cols={36}
              rows={2}
              placeholder="Enter dropdown options, one option per line"
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group custom_label_product_div">
          <label htmlFor="product_custom_field_label_2">Custom Field 2</label>
          <div className="input-group">
            <input
              className="form-control"
              id="product_custom_field_label_2"
              name="custom_labels[product][custom_field_2]"
              type="text"
            />
            <div className="input-group-addon">
              <select
                className="custom_labels_products"
                name="custom_labels[product_cf_details][2][type]"
              >
                <option value="">Field Type</option>
                <option value="text">Text </option>
                <option value="date">Datepicker </option>
                <option value="dropdown">Dropdown </option>
              </select>
            </div>
          </div>
          <div className="form-group custom_label_product_dropdown  hide ">
            <textarea
              name="custom_labels[product_cf_details][2][dropdown_options]"
              cols={36}
              rows={2}
              placeholder="Enter dropdown options, one option per line"
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group custom_label_product_div">
          <label htmlFor="product_custom_field_label_3">Custom Field 3</label>
          <div className="input-group">
            <input
              className="form-control"
              id="product_custom_field_label_3"
              name="custom_labels[product][custom_field_3]"
              type="text"
            />
            <div className="input-group-addon">
              <select
                className="custom_labels_products"
                name="custom_labels[product_cf_details][3][type]"
              >
                <option value="">Field Type</option>
                <option value="text">Text </option>
                <option value="date">Datepicker </option>
                <option value="dropdown">Dropdown </option>
              </select>
            </div>
          </div>
          <div className="form-group custom_label_product_dropdown  hide ">
            <textarea
              name="custom_labels[product_cf_details][3][dropdown_options]"
              cols={36}
              rows={2}
              placeholder="Enter dropdown options, one option per line"
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group custom_label_product_div">
          <label htmlFor="product_custom_field_label_4">Custom Field 4</label>
          <div className="input-group">
            <input
              className="form-control"
              id="product_custom_field_label_4"
              name="custom_labels[product][custom_field_4]"
              type="text"
            />
            <div className="input-group-addon">
              <select
                className="custom_labels_products"
                name="custom_labels[product_cf_details][4][type]"
              >
                <option value="">Field Type</option>
                <option value="text">Text </option>
                <option value="date">Datepicker </option>
                <option value="dropdown">Dropdown </option>
              </select>
            </div>
          </div>
          <div className="form-group custom_label_product_dropdown  hide ">
            <textarea
              name="custom_labels[product_cf_details][4][dropdown_options]"
              cols={36}
              rows={2}
              placeholder="Enter dropdown options, one option per line"
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group custom_label_product_div">
          <label htmlFor="product_custom_field_label_5">Custom Field 5</label>
          <div className="input-group">
            <input
              className="form-control"
              id="product_custom_field_label_5"
              name="custom_labels[product][custom_field_5]"
              type="text"
            />
            <div className="input-group-addon">
              <select
                className="custom_labels_products"
                name="custom_labels[product_cf_details][5][type]"
              >
                <option value="">Field Type</option>
                <option value="text">Text </option>
                <option value="date">Datepicker </option>
                <option value="dropdown">Dropdown </option>
              </select>
            </div>
          </div>
          <div className="form-group custom_label_product_dropdown  hide ">
            <textarea
              name="custom_labels[product_cf_details][5][dropdown_options]"
              cols={36}
              rows={2}
              placeholder="Enter dropdown options, one option per line"
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group custom_label_product_div">
          <label htmlFor="product_custom_field_label_6">Custom Field 6</label>
          <div className="input-group">
            <input
              className="form-control"
              id="product_custom_field_label_6"
              name="custom_labels[product][custom_field_6]"
              type="text"
            />
            <div className="input-group-addon">
              <select
                className="custom_labels_products"
                name="custom_labels[product_cf_details][6][type]"
              >
                <option value="">Field Type</option>
                <option value="text">Text </option>
                <option value="date">Datepicker </option>
                <option value="dropdown">Dropdown </option>
              </select>
            </div>
          </div>
          <div className="form-group custom_label_product_dropdown  hide ">
            <textarea
              name="custom_labels[product_cf_details][6][dropdown_options]"
              cols={36}
              rows={2}
              placeholder="Enter dropdown options, one option per line"
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group custom_label_product_div">
          <label htmlFor="product_custom_field_label_7">Custom Field 7</label>
          <div className="input-group">
            <input
              className="form-control"
              id="product_custom_field_label_7"
              name="custom_labels[product][custom_field_7]"
              type="text"
            />
            <div className="input-group-addon">
              <select
                className="custom_labels_products"
                name="custom_labels[product_cf_details][7][type]"
              >
                <option value="">Field Type</option>
                <option value="text">Text </option>
                <option value="date">Datepicker </option>
                <option value="dropdown">Dropdown </option>
              </select>
            </div>
          </div>
          <div className="form-group custom_label_product_dropdown  hide ">
            <textarea
              name="custom_labels[product_cf_details][7][dropdown_options]"
              cols={36}
              rows={2}
              placeholder="Enter dropdown options, one option per line"
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group custom_label_product_div">
          <label htmlFor="product_custom_field_label_8">Custom Field 8</label>
          <div className="input-group">
            <input
              className="form-control"
              id="product_custom_field_label_8"
              name="custom_labels[product][custom_field_8]"
              type="text"
            />
            <div className="input-group-addon">
              <select
                className="custom_labels_products"
                name="custom_labels[product_cf_details][8][type]"
              >
                <option value="">Field Type</option>
                <option value="text">Text </option>
                <option value="date">Datepicker </option>
                <option value="dropdown">Dropdown </option>
              </select>
            </div>
          </div>
          <div className="form-group custom_label_product_dropdown  hide ">
            <textarea
              name="custom_labels[product_cf_details][8][dropdown_options]"
              cols={36}
              rows={2}
              placeholder="Enter dropdown options, one option per line"
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group custom_label_product_div">
          <label htmlFor="product_custom_field_label_9">Custom Field 9</label>
          <div className="input-group">
            <input
              className="form-control"
              id="product_custom_field_label_9"
              name="custom_labels[product][custom_field_9]"
              type="text"
            />
            <div className="input-group-addon">
              <select
                className="custom_labels_products"
                name="custom_labels[product_cf_details][9][type]"
              >
                <option value="">Field Type</option>
                <option value="text">Text </option>
                <option value="date">Datepicker </option>
                <option value="dropdown">Dropdown </option>
              </select>
            </div>
          </div>
          <div className="form-group custom_label_product_dropdown  hide ">
            <textarea
              name="custom_labels[product_cf_details][9][dropdown_options]"
              cols={36}
              rows={2}
              placeholder="Enter dropdown options, one option per line"
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group custom_label_product_div">
          <label htmlFor="product_custom_field_label_10">Custom Field 10</label>
          <div className="input-group">
            <input
              className="form-control"
              id="product_custom_field_label_10"
              name="custom_labels[product][custom_field_10]"
              type="text"
            />
            <div className="input-group-addon">
              <select
                className="custom_labels_products"
                name="custom_labels[product_cf_details][10][type]"
              >
                <option value="">Field Type</option>
                <option value="text">Text </option>
                <option value="date">Datepicker </option>
                <option value="dropdown">Dropdown </option>
              </select>
            </div>
          </div>
          <div className="form-group custom_label_product_dropdown  hide ">
            <textarea
              name="custom_labels[product_cf_details][10][dropdown_options]"
              cols={36}
              rows={2}
              placeholder="Enter dropdown options, one option per line"
              defaultValue={""}
            />
          </div>
        </div>
      </div>
      <div className="col-sm-4">
        <div className="form-group custom_label_product_div">
          <label htmlFor="product_custom_field_label_11">Custom Field 11</label>
          <div className="input-group">
            <input
              className="form-control"
              id="product_custom_field_label_11"
              name="custom_labels[product][custom_field_11]"
              type="text"
            />
            <div className="input-group-addon">
              <select
                className="custom_labels_products"
                name="custom_labels[product_cf_details][11][type]"
              >
                <option value="">Field Type</option>
                <option value="text">Text </option>
                <option value="date">Datepicker </option>
                <option value="dropdown">Dropdown </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group custom_label_product_dropdown  hide ">
    <textarea
      name="custom_labels[product_cf_details][11][dropdown_options]"
      cols={36}
      rows={2}
      placeholder="Enter dropdown options, one option per line"
      defaultValue={""}
    />
  </div>
  <div className="col-sm-4">
    <div className="form-group custom_label_product_div">
      <label htmlFor="product_custom_field_label_12">Custom Field 12</label>
      <div className="input-group">
        <input
          className="form-control"
          id="product_custom_field_label_12"
          name="custom_labels[product][custom_field_12]"
          type="text"
        />
        <div className="input-group-addon">
          <select
            className="custom_labels_products"
            name="custom_labels[product_cf_details][12][type]"
          >
            <option value="">Field Type</option>
            <option value="text">Text </option>
            <option value="date">Datepicker </option>
            <option value="dropdown">Dropdown </option>
          </select>
        </div>
      </div>
      <div className="form-group custom_label_product_dropdown  hide ">
        <textarea
          name="custom_labels[product_cf_details][12][dropdown_options]"
          cols={36}
          rows={2}
          placeholder="Enter dropdown options, one option per line"
          defaultValue={""}
        />
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group custom_label_product_div">
      <label htmlFor="product_custom_field_label_13">Custom Field 13</label>
      <div className="input-group">
        <input
          className="form-control"
          id="product_custom_field_label_13"
          name="custom_labels[product][custom_field_13]"
          type="text"
        />
        <div className="input-group-addon">
          <select
            className="custom_labels_products"
            name="custom_labels[product_cf_details][13][type]"
          >
            <option value="">Field Type</option>
            <option value="text">Text </option>
            <option value="date">Datepicker </option>
            <option value="dropdown">Dropdown </option>
          </select>
        </div>
      </div>
      <div className="form-group custom_label_product_dropdown  hide ">
        <textarea
          name="custom_labels[product_cf_details][13][dropdown_options]"
          cols={36}
          rows={2}
          placeholder="Enter dropdown options, one option per line"
          defaultValue={""}
        />
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group custom_label_product_div">
      <label htmlFor="product_custom_field_label_14">Custom Field 14</label>
      <div className="input-group">
        <input
          className="form-control"
          id="product_custom_field_label_14"
          name="custom_labels[product][custom_field_14]"
          type="text"
        />
        <div className="input-group-addon">
          <select
            className="custom_labels_products"
            name="custom_labels[product_cf_details][14][type]"
          >
            <option value="">Field Type</option>
            <option value="text">Text </option>
            <option value="date">Datepicker </option>
            <option value="dropdown">Dropdown </option>
          </select>
        </div>
      </div>
      <div className="form-group custom_label_product_dropdown  hide ">
        <textarea
          name="custom_labels[product_cf_details][14][dropdown_options]"
          cols={36}
          rows={2}
          placeholder="Enter dropdown options, one option per line"
          defaultValue={""}
        />
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group custom_label_product_div">
      <label htmlFor="product_custom_field_label_15">Custom Field 15</label>
      <div className="input-group">
        <input
          className="form-control"
          id="product_custom_field_label_15"
          name="custom_labels[product][custom_field_15]"
          type="text"
        />
        <div className="input-group-addon">
          <select
            className="custom_labels_products"
            name="custom_labels[product_cf_details][15][type]"
          >
            <option value="">Field Type</option>
            <option value="text">Text </option>
            <option value="date">Datepicker </option>
            <option value="dropdown">Dropdown </option>
          </select>
        </div>
      </div>
      <div className="form-group custom_label_product_dropdown  hide ">
        <textarea
          name="custom_labels[product_cf_details][15][dropdown_options]"
          cols={36}
          rows={2}
          placeholder="Enter dropdown options, one option per line"
          defaultValue={""}
        />
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group custom_label_product_div">
      <label htmlFor="product_custom_field_label_16">Custom Field 16</label>
      <div className="input-group">
        <input
          className="form-control"
          id="product_custom_field_label_16"
          name="custom_labels[product][custom_field_16]"
          type="text"
        />
        <div className="input-group-addon">
          <select
            className="custom_labels_products"
            name="custom_labels[product_cf_details][16][type]"
          >
            <option value="">Field Type</option>
            <option value="text">Text </option>
            <option value="date">Datepicker </option>
            <option value="dropdown">Dropdown </option>
          </select>
        </div>
      </div>
      <div className="form-group custom_label_product_dropdown  hide ">
        <textarea
          name="custom_labels[product_cf_details][16][dropdown_options]"
          cols={36}
          rows={2}
          placeholder="Enter dropdown options, one option per line"
          defaultValue={""}
        />
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group custom_label_product_div">
      <label htmlFor="product_custom_field_label_17">Custom Field 17</label>
      <div className="input-group">
        <input
          className="form-control"
          id="product_custom_field_label_17"
          name="custom_labels[product][custom_field_17]"
          type="text"
        />
        <div className="input-group-addon">
          <select
            className="custom_labels_products"
            name="custom_labels[product_cf_details][17][type]"
          >
            <option value="">Field Type</option>
            <option value="text">Text </option>
            <option value="date">Datepicker </option>
            <option value="dropdown">Dropdown </option>
          </select>
        </div>
      </div>
      <div className="form-group custom_label_product_dropdown  hide ">
        <textarea
          name="custom_labels[product_cf_details][17][dropdown_options]"
          cols={36}
          rows={2}
          placeholder="Enter dropdown options, one option per line"
          defaultValue={""}
        />
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group custom_label_product_div">
      <label htmlFor="product_custom_field_label_18">Custom Field 18</label>
      <div className="input-group">
        <input
          className="form-control"
          id="product_custom_field_label_18"
          name="custom_labels[product][custom_field_18]"
          type="text"
        />
        <div className="input-group-addon">
          <select
            className="custom_labels_products"
            name="custom_labels[product_cf_details][18][type]"
          >
            <option value="">Field Type</option>
            <option value="text">Text </option>
            <option value="date">Datepicker </option>
            <option value="dropdown">Dropdown </option>
          </select>
        </div>
      </div>
      <div className="form-group custom_label_product_dropdown  hide ">
        <textarea
          name="custom_labels[product_cf_details][18][dropdown_options]"
          cols={36}
          rows={2}
          placeholder="Enter dropdown options, one option per line"
          defaultValue={""}
        />
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group custom_label_product_div">
      <label htmlFor="product_custom_field_label_19">Custom Field 19</label>
      <div className="input-group">
        <input
          className="form-control"
          id="product_custom_field_label_19"
          name="custom_labels[product][custom_field_19]"
          type="text"
        />
        <div className="input-group-addon">
          <select
            className="custom_labels_products"
            name="custom_labels[product_cf_details][19][type]"
          >
            <option value="">Field Type</option>
            <option value="text">Text </option>
            <option value="date">Datepicker </option>
            <option value="dropdown">Dropdown </option>
          </select>
        </div>
      </div>
      <div className="form-group custom_label_product_dropdown  hide ">
        <textarea
          name="custom_labels[product_cf_details][19][dropdown_options]"
          cols={36}
          rows={2}
          placeholder="Enter dropdown options, one option per line"
          defaultValue={""}
        />
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="form-group custom_label_product_div">
      <label htmlFor="product_custom_field_label_20">Custom Field 20</label>
      <div className="input-group">
        <input
          className="form-control"
          id="product_custom_field_label_20"
          name="custom_labels[product][custom_field_20]"
          type="text"
        />
        <div className="input-group-addon">
          <select
            className="custom_labels_products"
            name="custom_labels[product_cf_details][20][type]"
          >
            <option value="">Field Type</option>
            <option value="text">Text </option>
            <option value="date">Datepicker </option>
            <option value="dropdown">Dropdown </option>
          </select>
        </div>
      </div>
      <div className="form-group custom_label_product_dropdown  hide ">
        <textarea
          name="custom_labels[product_cf_details][20][dropdown_options]"
          cols={36}
          rows={2}
          placeholder="Enter dropdown options, one option per line"
          defaultValue={""}
        />
      </div>
    </div>
  </div>
  <div className="clearfix" />
  <div className="col-sm-12">
    <h4>Labels for location custom fields:</h4>
  </div>
  <div className="col-sm-3">
    <div className="form-group">
      <label htmlFor="location_custom_field_1_label">Custom field 1</label>
      <input
        className="form-control"
        id="location_custom_field_1_label"
        name="custom_labels[location][custom_field_1]"
        type="text"
      />
    </div>
  </div>
  <div className="col-sm-3">
    <div className="form-group">
      <label htmlFor="location_custom_field_2_label">Custom field 2</label>
      <input
        className="form-control"
        id="location_custom_field_2_label"
        name="custom_labels[location][custom_field_2]"
        type="text"
      />
    </div>
  </div>
  <div className="col-sm-3">
    <div className="form-group">
      <label htmlFor="location_custom_field_3_label">Custom field 3</label>
      <input
        className="form-control"
        id="location_custom_field_3_label"
        name="custom_labels[location][custom_field_3]"
        type="text"
      />
    </div>
  </div>
  <div className="col-sm-3">
    <div className="form-group">
      <label htmlFor="location_custom_field_4_label">Custom field 4</label>
      <input
        className="form-control"
        id="location_custom_field_4_label"
        name="custom_labels[location][custom_field_4]"
        type="text"
      />
    </div>
  </div>
  <div className="clearfix" />
  <div className="col-sm-12">
    <h4>Labels for user custom fields:</h4>
  </div>
  <div className="col-sm-3">
    <div className="form-group">
      <label htmlFor="user_custom_field_1_label">Custom field 1</label>
      <input
        className="form-control"
        id="user_custom_field_1_label"
        name="custom_labels[user][custom_field_1]"
        type="text"
      />
    </div>
  </div>
  <div className="col-sm-3">
    <div className="form-group">
      <label htmlFor="user_custom_field_2_label">Custom field 2</label>
      <input
        className="form-control"
        id="user_custom_field_2_label"
        name="custom_labels[user][custom_field_2]"
        type="text"
      />
    </div>
  </div>
  <div className="col-sm-3">
    <div className="form-group">
      <label htmlFor="user_custom_field_3_label">Custom field 3</label>
      <input
        className="form-control"
        id="user_custom_field_3_label"
        name="custom_labels[user][custom_field_3]"
        type="text"
      />
    </div>
  </div>
  <div className="col-sm-3">
    <div className="form-group">
      <label htmlFor="user_custom_field_4_label">Custom field 4</label>
      <input
        className="form-control"
        id="user_custom_field_4_label"
        name="custom_labels[user][custom_field_4]"
        type="text"
      />
    </div>
  </div>
  <div className="clearfix" />
  <div className="col-sm-12">
    <h4>Label for purchase custom fields:</h4>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="purchase_custom_field_1_label">Custom Field1</label>
      <div className="input-group">
        <input className="form-control"id="purchase_custom_field_1_label"name="custom_labels[purchase][custom_field_1]"type="text"/>
        <div className="input-group-addon">
          <label>
            <input type="checkbox"name="custom_labels[purchase][is_custom_field_1_required]"defaultValue={1}/>
            Is required
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="purchase_custom_field_2_label">Custom Field2</label>
      <div className="input-group">
        <input className="form-control"id="purchase_custom_field_2_label"name="custom_labels[purchase][custom_field_2]"type="text"/>
        <div className="input-group-addon">
          <label>
            <input type="checkbox"name="custom_labels[purchase][is_custom_field_2_required]"defaultValue={1}/>
            Is required
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="purchase_custom_field_3_label">Custom Field3</label>
      <div className="input-group">
        <input
          className="form-control"
          id="purchase_custom_field_3_label"
          name="custom_labels[purchase][custom_field_3]"
          type="text"
        />
        <div className="input-group-addon">
          <label>
            <input
              type="checkbox"
              name="custom_labels[purchase][is_custom_field_3_required]"
              defaultValue={1}
            />{" "}
            Is required
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="purchase_custom_field_4_label">Custom Field4</label>
      <div className="input-group">
        <input
          className="form-control"
          id="purchase_custom_field_4_label"
          name="custom_labels[purchase][custom_field_4]"
          type="text"
        />
        <div className="input-group-addon">
          <label>
            <input
              type="checkbox"
              name="custom_labels[purchase][is_custom_field_4_required]"
              defaultValue={1}
            />{" "}
            Is required
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="clearfix" />
  <div className="col-sm-12">
    <h4>Labels for purchase shipping custom fields:</h4>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="purchase_shipping_custom_field_1_label">
        Custom Field 1
      </label>
      <div className="input-group">
        <input
          className="form-control"
          id="purchase_shipping_custom_field_1_label"
          name="custom_labels[purchase_shipping][custom_field_1]"
          type="text"
        />
        <div className="input-group-addon">
          <label>
            <input
              type="checkbox"
              name="custom_labels[purchase_shipping][is_custom_field_1_required]"
              defaultValue={1}
            />{" "}
            Is required
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="purchase_shipping_custom_field_2_label">
        Custom Field 2
      </label>
      <div className="input-group">
        <input
          className="form-control"
          id="purchase_shipping_custom_field_2_label"
          name="custom_labels[purchase_shipping][custom_field_2]"
          type="text"
        />
        <div className="input-group-addon">
          <label>
            <input
              type="checkbox"
              name="custom_labels[purchase_shipping][is_custom_field_2_required]"
              defaultValue={1}
            />{" "}
            Is required
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="purchase_shipping_custom_field_3_label">
        Custom Field 3
      </label>
      <div className="input-group">
        <input
          className="form-control"
          id="purchase_shipping_custom_field_3_label"
          name="custom_labels[purchase_shipping][custom_field_3]"
          type="text"
        />
        <div className="input-group-addon">
          <label>
            <input
              type="checkbox"
              name="custom_labels[purchase_shipping][is_custom_field_3_required]"
              defaultValue={1}
            />{" "}
            Is required
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="purchase_shipping_custom_field_4_label">
        Custom Field 4
      </label>
      <div className="input-group">
        <input
          className="form-control"
          id="purchase_shipping_custom_field_4_label"
          name="custom_labels[purchase_shipping][custom_field_4]"
          type="text"
        />
        <div className="input-group-addon">
          <label>
            <input
              type="checkbox"
              name="custom_labels[purchase_shipping][is_custom_field_4_required]"
              defaultValue={1}
            />{" "}
            Is required
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="purchase_shipping_custom_field_5_label">
        Custom Field 5
      </label>
      <div className="input-group">
        <input
          className="form-control"
          id="purchase_shipping_custom_field_5_label"
          name="custom_labels[purchase_shipping][custom_field_5]"
          type="text"
        />
        <div className="input-group-addon">
          <label>
            <input
              type="checkbox"
              name="custom_labels[purchase_shipping][is_custom_field_5_required]"
              defaultValue={1}
            />{" "}
            Is required
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="clearfix" />
  <div className="col-sm-12">
    <h4>Labels for sell custom fields:</h4>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="sell_custom_field_1_label">Custom Field1</label>
      <div className="input-group">
        <input
          className="form-control"
          id="sell_custom_field_1_label"
          name="custom_labels[sell][custom_field_1]"
          type="text"
        />
        <div className="input-group-addon">
          <label>
            <input
              type="checkbox"
              name="custom_labels[sell][is_custom_field_1_required]"
              defaultValue={1}
            />{" "}
            Is required
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="sell_custom_field_2_label">Custom Field2</label>
      <div className="input-group">
        <input
          className="form-control"
          id="sell_custom_field_2_label"
          name="custom_labels[sell][custom_field_2]"
          type="text"
        />
        <div className="input-group-addon">
          <label>
            <input
              type="checkbox"
              name="custom_labels[sell][is_custom_field_2_required]"
              defaultValue={1}
            />{" "}
            Is required
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="sell_custom_field_3_label">Custom Field3</label>
      <div className="input-group">
        <input
          className="form-control"
          id="sell_custom_field_3_label"
          name="custom_labels[sell][custom_field_3]"
          type="text"
        />
        <div className="input-group-addon">
          <label>
            <input
              type="checkbox"
              name="custom_labels[sell][is_custom_field_3_required]"
              defaultValue={1}
            />{" "}
            Is required
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="sell_custom_field_4_label">Custom Field4</label>
      <div className="input-group">
        <input
          className="form-control"
          id="sell_custom_field_4_label"
          name="custom_labels[sell][custom_field_4]"
          type="text"
        />
        <div className="input-group-addon">
          <label>
            <input
              type="checkbox"
              name="custom_labels[sell][is_custom_field_4_required]"
              defaultValue={1}
            />{" "}
            Is required
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="clearfix" />
  <div className="col-sm-12">
    <h4>Labels for sale shipping custom fields:</h4>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="shipping_custom_field_1_label">Custom Field 1</label>
      <div className="input-group">
        <input
          className="form-control"
          id="shipping_custom_field_1_label"
          name="custom_labels[shipping][custom_field_1]"
          type="text"
        />
        <div className="input-group-addon">
          <label>
            <input
              type="checkbox"
              name="custom_labels[shipping][is_custom_field_1_required]"
              defaultValue={1}
            />{" "}
            Is required
          </label>
          &nbsp;
          <label>
            <input
              type="checkbox"
              name="custom_labels[shipping][is_custom_field_1_contact_default]"
              defaultValue={1}
            />{" "}
            Is default for contact{" "}
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="shipping_custom_field_2_label">Custom Field 2</label>
      <div className="input-group">
        <input
          className="form-control"
          id="shipping_custom_field_2_label"
          name="custom_labels[shipping][custom_field_2]"
          type="text"
        />
        <div className="input-group-addon">
          <label>
            <input
              type="checkbox"
              name="custom_labels[shipping][is_custom_field_2_required]"
              defaultValue={1}
            />{" "}
            Is required
          </label>
          &nbsp;
          <label>
            <input
              type="checkbox"
              name="custom_labels[shipping][is_custom_field_2_contact_default]"
              defaultValue={1}
            />{" "}
            Is default for contact{" "}
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="shipping_custom_field_3_label">Custom Field 3</label>
      <div className="input-group">
        <input
          className="form-control"
          id="shipping_custom_field_3_label"
          name="custom_labels[shipping][custom_field_3]"
          type="text"
        />
        <div className="input-group-addon">
          <label>
            <input
              type="checkbox"
              name="custom_labels[shipping][is_custom_field_3_required]"
              defaultValue={1}
            />{" "}
            Is required
          </label>
          &nbsp;
          <label>
            <input
              type="checkbox"
              name="custom_labels[shipping][is_custom_field_3_contact_default]"
              defaultValue={1}
            />{" "}
            Is default for contact{" "}
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="shipping_custom_field_4_label">Custom Field 4</label>
      <div className="input-group">
        <input
          className="form-control"
          id="shipping_custom_field_4_label"
          name="custom_labels[shipping][custom_field_4]"
          type="text"
        />
        <div className="input-group-addon">
          <label>
            <input
              type="checkbox"
              name="custom_labels[shipping][is_custom_field_4_required]"
              defaultValue={1}
            />{" "}
            Is required
          </label>
          &nbsp;
          <label>
            <input
              type="checkbox"
              name="custom_labels[shipping][is_custom_field_4_contact_default]"
              defaultValue={1}
            />{" "}
            Is default for contact{" "}
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="col-sm-6">
    <div className="form-group">
      <label htmlFor="shipping_custom_field_5_label">Custom Field 5</label>
      <div className="input-group">
        <input
          className="form-control"
          id="shipping_custom_field_5_label"
          name="custom_labels[shipping][custom_field_5]"
          type="text"
        />
        <div className="input-group-addon">
          <label>
            <input type="checkbox"name="custom_labels[shipping][is_custom_field_5_required]"defaultValue={1}/>
            Is required
          </label>
          &nbsp;
          <label>
            <input type="checkbox"name="custom_labels[shipping][is_custom_field_5_contact_default]"defaultValue={1}/>
            Is default for contact
          </label>
        </div>
      </div>
    </div>
  </div>
  <div className="clearfix" />
  <div className="col-sm-12">
    <h4>Labels for types of service custom fields:</h4>
  </div>
  <div className="col-sm-3">
    <div className="form-group">
      <label htmlFor="types_of_service_custom_field_1_label">
        Custom Field 1
      </label>
      <input className="form-control" id="types_of_service_custom_field_1_label"name="custom_labels[types_of_service][custom_field_1]"type="text"/>
    </div>
  </div>
  <div className="col-sm-3">
    <div className="form-group">
      <label htmlFor="types_of_service_custom_field_2_label">Custom Field 2</label>
      <input className="form-control"id="types_of_service_custom_field_2_label"name="custom_labels[types_of_service][custom_field_2]"type="text"/>
    </div>
  </div>
  <div className="col-sm-3">
    <div className="form-group">
      <label htmlFor="types_of_service_custom_field_3_label">Custom Field 3</label>
      <input className="form-control"id="types_of_service_custom_field_3_label"name="custom_labels[types_of_service][custom_field_3]"type="text"/>
    </div>
  </div>
  <div className="col-sm-3">
    <div className="form-group">
      <label htmlFor="types_of_service_custom_field_4_label">Custom Field 4</label>
      <input className="form-control"id="types_of_service_custom_field_4_label"name="custom_labels[types_of_service][custom_field_4]"type="text"/>
    </div>
  </div>
  <div className="col-sm-3">
    <div className="form-group">
      <label htmlFor="types_of_service_custom_field_5_label">Custom Field 5</label>
      <input className="form-control" id="types_of_service_custom_field_5_label"name="custom_labels[types_of_service][custom_field_5]"type="text"/>
    </div>
  </div>
  <div className="col-sm-3">
    <div className="form-group">
      <label htmlFor="types_of_service_custom_field_6_label">Custom Field 6</label>
      <input className="form-control"id="types_of_service_custom_field_6_label"name="custom_labels[types_of_service][custom_field_6]"type="text"/>
    </div>
  </div>
    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
    <div className="row">
                  <div className="col-sm-12 text-center">
                    <button className="btn btn-danger btn-big" type="submit">Update Settings</button>
                  </div>
                </div>
  </div>
</div>
<>
  <Footer/>
</>
</div>
  )
}
export default BusinessSetings