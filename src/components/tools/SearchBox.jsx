import React, { useState } from "react";
import { Autocomplete, TextField, Button, Box }from "@mui/material";




export default function SearchBox({
  selectedCompany,
  onSelect,
  onSearchClick,
}) {
  
  
  
  const companies = [
    {
      "Code": "03046.KL",
      "Long Name": "DynaFront Holdings Berhad",
      "Name": "DYNAFNT"
    },
    {
      "Code": "03040.KL",
      "Long Name": "Jishan Berhad",
      "Name": "JISHAN"
    },
    {
      "Code": "7251.KL",
      "Long Name": "Barakah Offshore Petroleum Berhad",
      "Name": "BARAKAH"
    },
    {
      "Code": "2836.KL",
      "Long Name": "Carlsberg Brewery Malaysia Berhad",
      "Name": "CARLSBG"
    },
    {
      "Code": "3255.KL",
      "Long Name": "Heineken Malaysia Berhad",
      "Name": "HEIM"
    },
    {
      "Code": "4707.KL",
      "Long Name": "Nestle (Malaysia) Berhad",
      "Name": "NESTLE"
    },
    {
      "Code": "5238.KL",
      "Long Name": "AirAsia X Berhad",
      "Name": "AAX"
    },
    {
      "Code": "7100.KL",
      "Long Name": "Uchi Technologies Berhad",
      "Name": "UCHITEC"
    },
    {
      "Code": "03030.KL",
      "Long Name": "IDB Technologies Berhad",
      "Name": "IDBTECH"
    },
    {
      "Code": "5259.KL",
      "Long Name": "Avangaad Berhad",
      "Name": "AVANGAAD"
    },
    {
      "Code": "03036.KL",
      "Long Name": "RedPlanet Berhad",
      "Name": "RPLANET"
    },
    {
      "Code": "03008.KL",
      "Long Name": NaN,
      "Name": "SLIC"
    },
    {
      "Code": "2658.KL",
      "Long Name": "Ajinomoto (Malaysia) Berhad",
      "Name": "AJI"
    },
    {
      "Code": "03006.KL",
      "Long Name": "Nova Pharma Solutions Berhad",
      "Name": "NPS"
    },
    {
      "Code": "8648.KL",
      "Long Name": "Jasa Kita Berhad",
      "Name": "JASKITA"
    },
    {
      "Code": "4162.KL",
      "Long Name": "British American Tobacco (Malaysia) Berhad",
      "Name": "BAT"
    },
    {
      "Code": "0219.KL",
      "Long Name": "Reservoir Link Energy Bhd",
      "Name": "RL"
    },
    {
      "Code": "7094.KL",
      "Long Name": "Eurospan Holdings Berhad",
      "Name": "EUROSP"
    },
    {
      "Code": "6718.KL",
      "Long Name": "Crescendo Corporation Berhad",
      "Name": "CRESNDO"
    },
    {
      "Code": "03015.KL",
      "Long Name": "MANFORCE GROUP BERHAD",
      "Name": "MFGROUP"
    },
    {
      "Code": "03025.KL",
      "Long Name": "Enest Group Berhad",
      "Name": "ENEST"
    },
    {
      "Code": "5078.KL",
      "Long Name": "Marine & General Berhad",
      "Name": "M&G"
    },
    {
      "Code": "5248.KL",
      "Long Name": "Bermaz Auto Berhad",
      "Name": "BAUTO"
    },
    {
      "Code": "5024.KL",
      "Long Name": "Hup Seng Industries Berhad",
      "Name": "HUPSENG"
    },
    {
      "Code": "1818.KL",
      "Long Name": "Bursa Malaysia Berhad",
      "Name": "BURSA"
    },
    {
      "Code": "03026.KL",
      "Long Name": "Fibromat (M) Berhad",
      "Name": "FBBHD"
    },
    {
      "Code": "5000.KL",
      "Long Name": "Hume Cement Industries Berhad",
      "Name": "HUMEIND"
    },
    {
      "Code": "0037.KL",
      "Long Name": "RGB International Bhd.",
      "Name": "RGB"
    },
    {
      "Code": "0117.KL",
      "Long Name": "SMRT Holdings Berhad",
      "Name": "SMRT"
    },
    {
      "Code": "0276.KL",
      "Long Name": "Autocount Dotcom Berhad",
      "Name": "ADB"
    },
    {
      "Code": "7231.KL",
      "Long Name": "Wellcall Holdings Berhad",
      "Name": "WELLCAL"
    },
    {
      "Code": "5321.KL",
      "Long Name": "Keyfield International Berhad",
      "Name": "KEYFIELD"
    },
    {
      "Code": "6351.KL",
      "Long Name": "Amway (Malaysia) Holdings Berhad",
      "Name": "AMWAY"
    },
    {
      "Code": "7195.KL",
      "Long Name": "Binastra Corporation Berhad",
      "Name": "BNASTRA"
    },
    {
      "Code": "7252.KL",
      "Long Name": "Teo Seng Capital Berhad",
      "Name": "TEOSENG"
    },
    {
      "Code": "0303.KL",
      "Long Name": NaN,
      "Name": "ALPHA"
    },
    {
      "Code": "5296.KL",
      "Long Name": "Mr D.I.Y. Group (M) Berhad",
      "Name": "MRDIY"
    },
    {
      "Code": "5209.KL",
      "Long Name": "Gas Malaysia Berhad",
      "Name": "GASMSIA"
    },
    {
      "Code": "03019.KL",
      "Long Name": "Matrix Parking Solution Holdings Berhad",
      "Name": "MPSOL"
    },
    {
      "Code": "5271.KL",
      "Long Name": "Pecca Group Berhad",
      "Name": "PECCA"
    },
    {
      "Code": "03047.KL",
      "Long Name": "Lim Seong Hai Capital Berhad",
      "Name": "LSH"
    },
    {
      "Code": "0291.KL",
      "Long Name": "Critical Holdings Berhad",
      "Name": "CHB"
    },
    {
      "Code": "5216.KL",
      "Long Name": "NEXG Berhad",
      "Name": "NEXG"
    },
    {
      "Code": "0253.KL",
      "Long Name": "Infoline Tec Group Berhad",
      "Name": "INFOTEC"
    },
    {
      "Code": "6262.KL",
      "Long Name": "Innoprise Plantations Berhad",
      "Name": "INNO"
    },
    {
      "Code": "0151.KL",
      "Long Name": "Kelington Group Berhad",
      "Name": "KGB"
    },
    {
      "Code": "0277.KL",
      "Long Name": "Cloudpoint Technology Berhad",
      "Name": "CLOUDPT"
    },
    {
      "Code": "0157.KL",
      "Long Name": "Focus Point Holdings Berhad",
      "Name": "FOCUSP"
    },
    {
      "Code": "0051.KL",
      "Long Name": "Cuscapi Berhad",
      "Name": "CUSCAPI"
    },
    {
      "Code": "0138.KL",
      "Long Name": "My E.G. Services Berhad",
      "Name": "MYEG"
    },
    {
      "Code": "6012.KL",
      "Long Name": "Maxis Berhad",
      "Name": "MAXIS"
    },
    {
      "Code": "0212.KL",
      "Long Name": "SDS Group Berhad",
      "Name": "SDS"
    },
    {
      "Code": "03031.KL",
      "Long Name": "Polydamic Group Berhad",
      "Name": "POLYDM"
    },
    {
      "Code": "5246.KL",
      "Long Name": "Westports Holdings Berhad",
      "Name": "WPRTS"
    },
    {
      "Code": "03032.KL",
      "Long Name": "Astramina Group Berhad",
      "Name": "ASTRA"
    },
    {
      "Code": "7471.KL",
      "Long Name": "Eden Inc. Berhad",
      "Name": "EDEN"
    },
    {
      "Code": "5308.KL",
      "Long Name": "Seng Fong Holdings Berhad",
      "Name": "SENFONG"
    },
    {
      "Code": "6432.KL",
      "Long Name": "Apollo Food Holdings Berhad",
      "Name": "APOLLO"
    },
    {
      "Code": "0167.KL",
      "Long Name": "MClean Technologies Berhad",
      "Name": "MCLEAN"
    },
    {
      "Code": "5326.KL",
      "Long Name": "99 Speed Mart Retail Holdings Berhad",
      "Name": "99SMART"
    },
    {
      "Code": "0340.KL",
      "Long Name": "Northern Solar Holdings Berhad",
      "Name": "NORTHERN"
    },
    {
      "Code": "5318.KL",
      "Long Name": "DXN Holdings Bhd.",
      "Name": "DXN"
    },
    {
      "Code": "0032.KL",
      "Long Name": "REDtone Digital Berhad",
      "Name": "REDTONE"
    },
    {
      "Code": "0279.KL",
      "Long Name": "Synergy House Berhad",
      "Name": "SYNERGY"
    },
    {
      "Code": "0296.KL",
      "Long Name": "HE Group Berhad",
      "Name": "HEGROUP"
    },
    {
      "Code": "7170.KL",
      "Long Name": "LFE Corporation Berhad",
      "Name": "LFECORP"
    },
    {
      "Code": "03038.KL",
      "Long Name": "ICT Zone Asia Berhad",
      "Name": "ICTZONE"
    },
    {
      "Code": "5151.KL",
      "Long Name": "Hextar Global Berhad",
      "Name": "HEXTAR"
    },
    {
      "Code": "0265.KL",
      "Long Name": "Infomina Berhad",
      "Name": "INFOM"
    },
    {
      "Code": "5263.KL",
      "Long Name": "Sunway Construction Group Berhad",
      "Name": "SUNCON"
    },
    {
      "Code": "0045.KL",
      "Long Name": "Southern Score Builders Berhad",
      "Name": "SSB8"
    },
    {
      "Code": "8869.KL",
      "Long Name": "Press Metal Aluminium Holdings Berhad",
      "Name": "PMETAL"
    },
    {
      "Code": "0307.KL",
      "Long Name": NaN,
      "Name": "KENERGY"
    },
    {
      "Code": "0828EA.KL",
      "Long Name": NaN,
      "Name": "GOLDETF"
    },
    {
      "Code": "0320.KL",
      "Long Name": "Steel Hawk Berhad",
      "Name": "HAWK"
    },
    {
      "Code": "1562.KL",
      "Long Name": "Sports Toto Berhad",
      "Name": "SPTOTO"
    },
    {
      "Code": "5102.KL",
      "Long Name": "Guan Chong Berhad",
      "Name": "GCB"
    },
    {
      "Code": "0290.KL",
      "Long Name": "Panda Eco System Berhad",
      "Name": "PANDA"
    },
    {
      "Code": "0273.KL",
      "Long Name": "Vestland Berhad",
      "Name": "VLB"
    },
    {
      "Code": "5309.KL",
      "Long Name": "ITMAX System Berhad",
      "Name": "ITMAX"
    },
    {
      "Code": "4863.KL",
      "Long Name": "Telekom Malaysia Berhad",
      "Name": "TM"
    },
    {
      "Code": "5257.KL",
      "Long Name": "Carimin Petroleum Berhad",
      "Name": "CARIMIN"
    },
    {
      "Code": "3301.KL",
      "Long Name": "Hong Leong Industries Berhad",
      "Name": "HLIND"
    },
    {
      "Code": "5322.KL",
      "Long Name": "Feytech Holdings Berhad",
      "Name": "FEYTECH"
    },
    {
      "Code": "7028.KL",
      "Long Name": "Zecon Berhad",
      "Name": "ZECON"
    },
    {
      "Code": "0217.KL",
      "Long Name": "Powerwell Holdings Berhad",
      "Name": "PWRWELL"
    },
    {
      "Code": "3026.KL",
      "Long Name": "Dutch Lady Milk Industries Berhad",
      "Name": "DLADY"
    },
    {
      "Code": "7246.KL",
      "Long Name": "Signature International Berhad",
      "Name": "SIGN"
    },
    {
      "Code": "0310.KL",
      "Long Name": "UUE Holdings Berhad",
      "Name": "UUE"
    },
    {
      "Code": "6139.KL",
      "Long Name": "Syarikat Takaful Malaysia Keluarga Berhad",
      "Name": "TAKAFUL"
    },
    {
      "Code": "0099.KL",
      "Long Name": "Scicom (MSC) Berhad",
      "Name": "SCICOM"
    },
    {
      "Code": "7108.KL",
      "Long Name": "Perdana Petroleum Berhad",
      "Name": "PERDANA"
    },
    {
      "Code": "0128.KL",
      "Long Name": "Frontken Corporation Berhad",
      "Name": "FRONTKN"
    },
    {
      "Code": "0222.KL",
      "Long Name": "Optimax Holdings Berhad",
      "Name": "OPTIMAX"
    },
    {
      "Code": "5681.KL",
      "Long Name": "PETRONAS Dagangan Berhad",
      "Name": "PETDAG"
    },
    {
      "Code": "5142.KL",
      "Long Name": "Wasco Berhad",
      "Name": "WASCO"
    },
    {
      "Code": "5027.KL",
      "Long Name": "Kim Loong Resources Berhad",
      "Name": "KMLOONG"
    },
    {
      "Code": "0260.KL",
      "Long Name": "PT Resources Holdings Berhad",
      "Name": "PTRB"
    },
    {
      "Code": "0245.KL",
      "Long Name": "MN Holdings Berhad",
      "Name": "MNHLDG"
    },
    {
      "Code": "5149.KL",
      "Long Name": "TAS Offshore Berhad",
      "Name": "TAS"
    },
    {
      "Code": "0225.KL",
      "Long Name": "Southern Cable Group Berhad",
      "Name": "SCGBHD"
    },
    {
      "Code": "6633.KL",
      "Long Name": "Leong Hup International Berhad",
      "Name": "LHI"
    },
    {
      "Code": "0304.KL",
      "Long Name": "Farm Price Holdings Berhad",
      "Name": "FPHB"
    },
    {
      "Code": "0318.KL",
      "Long Name": "Elridge Energy Holdings Berhad",
      "Name": "ELRIDGE"
    },
    {
      "Code": "0106.KL",
      "Long Name": "Rexit Berhad",
      "Name": "REXIT"
    },
    {
      "Code": "0229.KL",
      "Long Name": "Mobilia Holdings Berhad",
      "Name": "MOBILIA"
    },
    {
      "Code": "2828.KL",
      "Long Name": "C.I. Holdings Berhad",
      "Name": "CIHLDG"
    },
    {
      "Code": "0192.KL",
      "Long Name": "Inta Bina Group Berhad",
      "Name": "INTA"
    },
    {
      "Code": "0208.KL",
      "Long Name": "Greatech Technology Berhad",
      "Name": "GREATEC"
    },
    {
      "Code": "5301.KL",
      "Long Name": "CTOS Digital Berhad",
      "Name": "CTOS"
    },
    {
      "Code": "0270.KL",
      "Long Name": "NationGate Holdings Berhad",
      "Name": "NATGATE"
    },
    {
      "Code": "03058.KL",
      "Long Name": NaN,
      "Name": "DYNAMIC"
    },
    {
      "Code": "2089.KL",
      "Long Name": "United Plantations Berhad",
      "Name": "UTDPLT"
    },
    {
      "Code": "7211.KL",
      "Long Name": "TAFI Industries Berhad",
      "Name": "TAFI"
    },
    {
      "Code": "7087.KL",
      "Long Name": "Magni-Tech Industries Berhad",
      "Name": "MAGNI"
    },
    {
      "Code": "5141.KL",
      "Long Name": "Dayang Enterprise Holdings Bhd",
      "Name": "DAYANG"
    },
    {
      "Code": "1996.KL",
      "Long Name": "Kretam Holdings Berhad",
      "Name": "KRETAM"
    },
    {
      "Code": "0263.KL",
      "Long Name": "Betamek Berhad",
      "Name": "BETA"
    },
    {
      "Code": "7085.KL",
      "Long Name": "LTKM Berhad",
      "Name": "LTKM"
    },
    {
      "Code": "5242.KL",
      "Long Name": "Solid Automotive Berhad",
      "Name": "SOLID"
    },
    {
      "Code": "0338.KL",
      "Long Name": "Oriental Kopi Holdings Berhad",
      "Name": "KOPI"
    },
    {
      "Code": "0339.KL",
      "Long Name": "CBH Engineering Holding Berhad",
      "Name": "CBHB"
    },
    {
      "Code": "0302.KL",
      "Long Name": "Topmix Berhad",
      "Name": "TOPMIX"
    },
    {
      "Code": "7293.KL",
      "Long Name": "Yinson Holdings Berhad",
      "Name": "YINSON"
    },
    {
      "Code": "9385.KL",
      "Long Name": "Lay Hong Berhad",
      "Name": "LAYHONG"
    },
    {
      "Code": "5132.KL",
      "Long Name": "Deleum Berhad",
      "Name": "DELEUM"
    },
    {
      "Code": "5133.KL",
      "Long Name": "Petra Energy Berhad",
      "Name": "PENERGY"
    },
    {
      "Code": "6459.KL",
      "Long Name": "MNRB Holdings Berhad",
      "Name": "MNRB"
    },
    {
      "Code": "0017.KL",
      "Long Name": "XOX Technology Berhad",
      "Name": "XOXTECH"
    },
    {
      "Code": "03053.KL",
      "Long Name": NaN,
      "Name": "CCIB"
    },
    {
      "Code": "2569.KL",
      "Long Name": "Sungei Bagan Rubber Company (Malaya) Berhad",
      "Name": "SBAGAN"
    },
    {
      "Code": "8621.KL",
      "Long Name": "LPI Capital Bhd",
      "Name": "LPI"
    },
    {
      "Code": "0002.KL",
      "Long Name": "Kotra Industries Berhad",
      "Name": "KOTRA"
    },
    {
      "Code": "7005.KL",
      "Long Name": "B.I.G. Industries Berhad",
      "Name": "BIG"
    },
    {
      "Code": "5310.KL",
      "Long Name": "Kumpulan Kitacon Berhad",
      "Name": "KITACON"
    },
    {
      "Code": "3611.KL",
      "Long Name": "Paragon Globe Berhad",
      "Name": "PGLOBE"
    },
    {
      "Code": "7107.KL",
      "Long Name": "Oriental Food Industries Holdings Berhad",
      "Name": "OFI"
    },
    {
      "Code": "0827EA.KL",
      "Long Name": NaN,
      "Name": "EQ8US50"
    },
    {
      "Code": "6742.KL",
      "Long Name": "YTL Power International Berhad",
      "Name": "YTLPOWR"
    },
    {
      "Code": "5085.KL",
      "Long Name": "Mudajaya Group Berhad",
      "Name": "MUDAJYA"
    },
    {
      "Code": "7179.KL",
      "Long Name": "Lagenda Properties Berhad",
      "Name": "LAGENDA"
    },
    {
      "Code": "5983.KL",
      "Long Name": "MBM Resources Berhad",
      "Name": "MBMR"
    },
    {
      "Code": "5073.KL",
      "Long Name": "Naim Holdings Berhad",
      "Name": "NAIM"
    },
    {
      "Code": "0836EA.KL",
      "Long Name": NaN,
      "Name": "MY-MOMETF"
    },
    {
      "Code": "0822EA.KL",
      "Long Name": NaN,
      "Name": "PAM-A40M"
    },
    {
      "Code": "0295.KL",
      "Long Name": "Master Tec Group Berhad",
      "Name": "MTEC"
    },
    {
      "Code": "5306.KL",
      "Long Name": "Farm Fresh Berhad",
      "Name": "FFB"
    },
    {
      "Code": "5789.KL",
      "Long Name": "LBS Bina Group Berhad",
      "Name": "LBS"
    },
    {
      "Code": "0292.KL",
      "Long Name": "Jati Tinggi Group Berhad",
      "Name": "JTGROUP"
    },
    {
      "Code": "7084.KL",
      "Long Name": "QL Resources Berhad",
      "Name": "QL"
    },
    {
      "Code": "7176.KL",
      "Long Name": "TPC Plus Berhad",
      "Name": "TPC"
    },
    {
      "Code": "3689.KL",
      "Long Name": "Fraser & Neave Holdings Bhd",
      "Name": "F&N"
    },
    {
      "Code": "5319.KL",
      "Long Name": "MKH Oil Palm (East Kalimantan) Berhad",
      "Name": "MKHOP"
    },
    {
      "Code": "0023.KL",
      "Long Name": "IFCA MSC Berhad",
      "Name": "IFCAMSC"
    },
    {
      "Code": "7167.KL",
      "Long Name": "Able Global Berhad",
      "Name": "ABLEGLOB"
    },
    {
      "Code": "0039.KL",
      "Long Name": "GFM Services Berhad",
      "Name": "GFM"
    },
    {
      "Code": "9296.KL",
      "Long Name": "RCE Capital Berhad",
      "Name": "RCECAP"
    },
    {
      "Code": "7161.KL",
      "Long Name": "Kerjaya Prospek Group Berhad",
      "Name": "KERJAYA"
    },
    {
      "Code": "0299.KL",
      "Long Name": "AGX Group Berhad",
      "Name": "AGX"
    },
    {
      "Code": "5878.KL",
      "Long Name": "KPJ Healthcare Berhad",
      "Name": "KPJ"
    },
    {
      "Code": "5162.KL",
      "Long Name": "VSTECS Berhad",
      "Name": "VSTECS"
    },
    {
      "Code": "0271.KL",
      "Long Name": "Wellspire Holdings Berhad",
      "Name": "WELLS"
    },
    {
      "Code": "4731.KL",
      "Long Name": "Scientex Berhad",
      "Name": "SCIENTX"
    },
    {
      "Code": "03027.KL",
      "Long Name": "MMIS Berhad",
      "Name": "MMIS"
    },
    {
      "Code": "0233.KL",
      "Long Name": "Pekat Group Berhad",
      "Name": "PEKAT"
    },
    {
      "Code": "5227.KL",
      "Long Name": "IGB Real Estate Investment Trust",
      "Name": "IGBREIT"
    },
    {
      "Code": "0198.KL",
      "Long Name": "GDB Holdings Berhad",
      "Name": "GDB"
    },
    {
      "Code": "6399.KL",
      "Long Name": "Astro Malaysia Holdings Berhad",
      "Name": "ASTRO"
    },
    {
      "Code": "5041.KL",
      "Long Name": "PBA Holdings Bhd",
      "Name": "PBA"
    },
    {
      "Code": "0223.KL",
      "Long Name": "Samaiden Group Berhad",
      "Name": "SAMAIDEN"
    },
    {
      "Code": "5178.KL",
      "Long Name": "Ingenieur Gudang Berhad",
      "Name": "INGENIEU"
    },
    {
      "Code": "6378.KL",
      "Long Name": "WMG Holdings Bhd.",
      "Name": "WMG"
    },
    {
      "Code": "03037.KL",
      "Long Name": NaN,
      "Name": "AURORA"
    },
    {
      "Code": "5080.KL",
      "Long Name": "Poh Kong Holdings Berhad",
      "Name": "POHKONG"
    },
    {
      "Code": "8907.KL",
      "Long Name": "EG Industries Berhad",
      "Name": "EG"
    },
    {
      "Code": "5139.KL",
      "Long Name": "AEON Credit Service (M) Berhad",
      "Name": "AEONCR"
    },
    {
      "Code": "1163.KL",
      "Long Name": "Allianz Malaysia Berhad",
      "Name": "ALLIANZ"
    },
    {
      "Code": "7007.KL",
      "Long Name": "ARK Resources Holdings Berhad",
      "Name": "ARK"
    },
    {
      "Code": "6033.KL",
      "Long Name": "PETRONAS Gas Berhad",
      "Name": "PETGAS"
    },
    {
      "Code": "3069.KL",
      "Long Name": "Mega First Corporation Berhad",
      "Name": "MFCB"
    },
    {
      "Code": "0249.KL",
      "Long Name": "LGMS Berhad",
      "Name": "LGMS"
    },
    {
      "Code": "5029.KL",
      "Long Name": "Far East Holdings Berhad",
      "Name": "FAREAST"
    },
    {
      "Code": "0258.KL",
      "Long Name": "Agmo Holdings Berhad",
      "Name": "AGMO"
    },
    {
      "Code": "7230.KL",
      "Long Name": "Tomei Consolidated Berhad",
      "Name": "TOMEI"
    },
    {
      "Code": "5036.KL",
      "Long Name": "Edaran Berhad",
      "Name": "EDARAN"
    },
    {
      "Code": "0058.KL",
      "Long Name": "JcbNext Berhad",
      "Name": "JCBNEXT"
    },
    {
      "Code": "03043.KL",
      "Long Name": NaN,
      "Name": "UTAMA"
    },
    {
      "Code": "0086.KL",
      "Long Name": "Ygl Convergence Berhad",
      "Name": "YGL"
    },
    {
      "Code": "0040.KL",
      "Long Name": "OpenSys (M) Berhad",
      "Name": "OPENSYS"
    },
    {
      "Code": "5152.KL",
      "Long Name": "Muar Ban Lee Group Berhad",
      "Name": "MBL"
    },
    {
      "Code": "03052.KL",
      "Long Name": "Ray Go Solar Holdings Berhad",
      "Name": "RGS"
    },
    {
      "Code": "5908.KL",
      "Long Name": "DKSH Holdings (Malaysia) Berhad",
      "Name": "DKSH"
    },
    {
      "Code": "5302.KL",
      "Long Name": "Aurelius Technologies Berhad",
      "Name": "ATECH"
    },
    {
      "Code": "0259.KL",
      "Long Name": "SNS Network Technology Berhad",
      "Name": "SNS"
    },
    {
      "Code": "9687.KL",
      "Long Name": "Ideal Capital Berhad",
      "Name": "IDEAL"
    },
    {
      "Code": "1295.KL",
      "Long Name": "Public Bank Berhad",
      "Name": "PBBANK"
    },
    {
      "Code": "2062.KL",
      "Long Name": "Harbour-Link Group Berhad",
      "Name": "HARBOUR"
    },
    {
      "Code": "7052.KL",
      "Long Name": "Padini Holdings Berhad",
      "Name": "PADINI"
    },
    {
      "Code": "7225.KL",
      "Long Name": "P.A. Resources Berhad",
      "Name": "PA"
    },
    {
      "Code": "5130.KL",
      "Long Name": "Atrium Real Estate Investment Trust",
      "Name": "ATRIUM"
    },
    {
      "Code": "5199.KL",
      "Long Name": "Hibiscus Petroleum Berhad",
      "Name": "HIBISCS"
    },
    {
      "Code": "03050.KL",
      "Long Name": "Sunmow Holding Berhad",
      "Name": "SUNMOW"
    },
    {
      "Code": "0256.KL",
      "Long Name": "UMediC Group Berhad",
      "Name": "UMC"
    },
    {
      "Code": "7035.KL",
      "Long Name": "CCK Consolidated Holdings Berhad",
      "Name": "CCK"
    },
    {
      "Code": "4677.KL",
      "Long Name": "YTL Corporation Berhad",
      "Name": "YTL"
    },
    {
      "Code": "7155.KL",
      "Long Name": "SKP Resources Bhd",
      "Name": "SKPRES"
    },
    {
      "Code": "9172.KL",
      "Long Name": "Formosa Prosonic Industries Berhad",
      "Name": "FPI"
    },
    {
      "Code": "03057.KL",
      "Long Name": NaN,
      "Name": "SANCY"
    },
    {
      "Code": "5325.KL",
      "Long Name": "Well Chip Group Berhad",
      "Name": "WELLCHIP"
    },
    {
      "Code": "03061.KL",
      "Long Name": NaN,
      "Name": "TPTEC"
    },
    {
      "Code": "5088.KL",
      "Long Name": "Apex Equity Holdings Berhad",
      "Name": "APEX"
    },
    {
      "Code": "0215.KL",
      "Long Name": "Solarvest Holdings Berhad",
      "Name": "SLVEST"
    },
    {
      "Code": "5135.KL",
      "Long Name": "Sarawak Plantation Berhad",
      "Name": "SWKPLNT"
    },
    {
      "Code": "8079.KL",
      "Long Name": "Lee Swee Kiat Group Berhad",
      "Name": "LEESK"
    },
    {
      "Code": "5285.KL",
      "Long Name": "SD Guthrie Berhad",
      "Name": "SDG"
    },
    {
      "Code": "5126.KL",
      "Long Name": "Sarawak Oil Palms Berhad",
      "Name": "SOP"
    },
    {
      "Code": "8311.KL",
      "Long Name": "Pesona Metro Holdings Berhad",
      "Name": "PESONA"
    },
    {
      "Code": "0257.KL",
      "Long Name": "Unique Fire Holdings Berhad",
      "Name": "UNIQUE"
    },
    {
      "Code": "0203.KL",
      "Long Name": "Securemetric Berhad",
      "Name": "SMETRIC"
    },
    {
      "Code": "0083.KL",
      "Long Name": "Notion VTec Berhad",
      "Name": "NOTION"
    },
    {
      "Code": "4847.KL",
      "Long Name": "Epicon Berhad",
      "Name": "EPICON"
    },
    {
      "Code": "5250.KL",
      "Long Name": "7-Eleven Malaysia Holdings Berhad",
      "Name": "SEM"
    },
    {
      "Code": "0835EA.KL",
      "Long Name": NaN,
      "Name": "KLCI1XI"
    },
    {
      "Code": "7579.KL",
      "Long Name": "AWC Berhad",
      "Name": "AWC"
    },
    {
      "Code": "0315.KL",
      "Long Name": "Kucingko Berhad",
      "Name": "KUCINGKO"
    },
    {
      "Code": "5916.KL",
      "Long Name": "Malaysia Smelting Corporation Berhad",
      "Name": "MSC"
    },
    {
      "Code": "1023.KL",
      "Long Name": "CIMB Group Holdings Berhad",
      "Name": "CIMB"
    },
    {
      "Code": "5932.KL",
      "Long Name": "Bina Puri Holdings Bhd",
      "Name": "BPURI"
    },
    {
      "Code": "5160.KL",
      "Long Name": "Homeritz Corporation Berhad",
      "Name": "HOMERIZ"
    },
    {
      "Code": "5038.KL",
      "Long Name": "KSL Holdings Berhad",
      "Name": "KSL"
    },
    {
      "Code": "8524.KL",
      "Long Name": "Taliworks Corporation Berhad",
      "Name": "TALIWRK"
    },
    {
      "Code": "7004.KL",
      "Long Name": "MCE Holdings Berhad",
      "Name": "MCEHLDG"
    },
    {
      "Code": "1155.KL",
      "Long Name": "Malayan Banking Berhad",
      "Name": "MAYBANK"
    },
    {
      "Code": "0236.KL",
      "Long Name": "Ramssol Group Berhad",
      "Name": "RAMSSOL"
    },
    {
      "Code": "5819.KL",
      "Long Name": "Hong Leong Bank Berhad",
      "Name": "HLBANK"
    },
    {
      "Code": "6491.KL",
      "Long Name": "Kumpulan Fima Berhad",
      "Name": "KFIMA"
    },
    {
      "Code": "5125.KL",
      "Long Name": "Pantech Group Holdings Berhad",
      "Name": "PANTECH"
    },
    {
      "Code": "1961.KL",
      "Long Name": "IOI Corporation Berhad",
      "Name": "IOICORP"
    },
    {
      "Code": "7237.KL",
      "Long Name": "Power Root Berhad",
      "Name": "PWROOT"
    },
    {
      "Code": "7115.KL",
      "Long Name": "SKB Shutters Corporation Berhad",
      "Name": "SKBSHUT"
    },
    {
      "Code": "1082.KL",
      "Long Name": "Hong Leong Financial Group Berhad",
      "Name": "HLFG"
    },
    {
      "Code": "5072.KL",
      "Long Name": "Hiap Teck Venture Berhad",
      "Name": "HIAPTEK"
    },
    {
      "Code": "4383.KL",
      "Long Name": "Jaya Tiasa Holdings Berhad",
      "Name": "JTIASA"
    },
    {
      "Code": "5210.KL",
      "Long Name": "Bumi Armada Berhad",
      "Name": "ARMADA"
    },
    {
      "Code": "5827.KL",
      "Long Name": "Oriental Interest Berhad",
      "Name": "OIB"
    },
    {
      "Code": "0055.KL",
      "Long Name": "Sersol Berhad",
      "Name": "SERSOL"
    },
    {
      "Code": "0268.KL",
      "Long Name": "L&P Global Berhad",
      "Name": "L&PBHD"
    },
    {
      "Code": "1929.KL",
      "Long Name": "Chin Teck Plantations Berhad",
      "Name": "CHINTEK"
    },
    {
      "Code": "7029.KL",
      "Long Name": "Master-Pack Group Berhad",
      "Name": "MASTER"
    },
    {
      "Code": "5276.KL",
      "Long Name": "Dancomech Holdings Berhad",
      "Name": "DANCO"
    },
    {
      "Code": "0005.KL",
      "Long Name": "UCrest Berhad",
      "Name": "UCREST"
    },
    {
      "Code": "03039.KL",
      "Long Name": NaN,
      "Name": "RTSTECH"
    },
    {
      "Code": "0289.KL",
      "Long Name": "PLYTEC Holding Berhad",
      "Name": "PLYTEC"
    },
    {
      "Code": "7048.KL",
      "Long Name": "Atlan Holdings Bhd",
      "Name": "ATLAN"
    },
    {
      "Code": "7047.KL",
      "Long Name": "Fajarbaru Builder Group Bhd.",
      "Name": "FAJAR"
    },
    {
      "Code": "0337.KL",
      "Long Name": NaN,
      "Name": "SET"
    },
    {
      "Code": "7609.KL",
      "Long Name": "Ajiya Berhad",
      "Name": "AJIYA"
    },
    {
      "Code": "5176.KL",
      "Long Name": "Sunway Real Estate Investment Trust",
      "Name": "SUNREIT"
    },
    {
      "Code": "5173.KL",
      "Long Name": "Shin Yang Group Berhad",
      "Name": "SYGROUP"
    },
    {
      "Code": "0243.KL",
      "Long Name": "Cengild Medical Berhad",
      "Name": "CENGILD"
    },
    {
      "Code": "5012.KL",
      "Long Name": "Ta Ann Holdings Berhad",
      "Name": "TAANN"
    },
    {
      "Code": "7595.KL",
      "Long Name": "MGB Berhad",
      "Name": "MGB"
    },
    {
      "Code": "0286.KL",
      "Long Name": "Evergreen Max Cash Capital Berhad",
      "Name": "EMCC"
    },
    {
      "Code": "0297.KL",
      "Long Name": NaN,
      "Name": "TSA"
    },
    {
      "Code": "6211.KL",
      "Long Name": "Kia Lim Berhad",
      "Name": "KIALIM"
    },
    {
      "Code": "5112.KL",
      "Long Name": "TH Plantations Berhad",
      "Name": "THPLANT"
    },
    {
      "Code": "4758.KL",
      "Long Name": "Ancom Nylex Berhad",
      "Name": "ANCOMNY"
    },
    {
      "Code": "2488.KL",
      "Long Name": "Alliance Bank Malaysia Berhad",
      "Name": "ABMB"
    },
    {
      "Code": "0238.KL",
      "Long Name": "CEKD Berhad",
      "Name": "CEKD"
    },
    {
      "Code": "5031.KL",
      "Long Name": "TIME dotCom Berhad",
      "Name": "TIMECOM"
    },
    {
      "Code": "6963.KL",
      "Long Name": "V.S. Industry Berhad",
      "Name": "VS"
    },
    {
      "Code": "5606.KL",
      "Long Name": "IGB Berhad",
      "Name": "IGBB"
    },
    {
      "Code": "0131.KL",
      "Long Name": "Divfex Berhad",
      "Name": "DFX"
    },
    {
      "Code": "1015.KL",
      "Long Name": "AMMB Holdings Berhad",
      "Name": "AMBANK"
    },
    {
      "Code": "5138.KL",
      "Long Name": "Hap Seng Plantations Holdings Berhad",
      "Name": "HSPLANT"
    },
    {
      "Code": "0011.KL",
      "Long Name": "Brite-Tech Berhad",
      "Name": "BTECH"
    },
    {
      "Code": "0216.KL",
      "Long Name": "Spring Art Holdings Berhad",
      "Name": "SPRING"
    },
    {
      "Code": "7090.KL",
      "Long Name": "Apex Healthcare Berhad",
      "Name": "AHEALTH"
    },
    {
      "Code": "1066.KL",
      "Long Name": "RHB Bank Berhad",
      "Name": "RHBBANK"
    },
    {
      "Code": "5182.KL",
      "Long Name": "Avaland Berhad",
      "Name": "AVALAND"
    },
    {
      "Code": "5084.KL",
      "Long Name": "Ibraco Berhad",
      "Name": "IBRACO"
    },
    {
      "Code": "0252.KL",
      "Long Name": "Orgabio Holdings Berhad",
      "Name": "ORGABIO"
    },
    {
      "Code": "5159.KL",
      "Long Name": "Yoong Onn Corporation Berhad",
      "Name": "YOCB"
    },
    {
      "Code": "0284.KL",
      "Long Name": "Glostrext Berhad",
      "Name": "GLXT"
    },
    {
      "Code": "8273.KL",
      "Long Name": "Public Packages Holdings Berhad",
      "Name": "PPHB"
    },
    {
      "Code": "0202.KL",
      "Long Name": "Radiant Globaltech Berhad",
      "Name": "RGTECH"
    },
    {
      "Code": "0196.KL",
      "Long Name": "QES Group Berhad",
      "Name": "QES"
    },
    {
      "Code": "0317.KL",
      "Long Name": "EPB Group Berhad",
      "Name": "EPB"
    },
    {
      "Code": "5008.KL",
      "Long Name": "Harrisons Holdings (Malaysia) Berhad",
      "Name": "HARISON"
    },
    {
      "Code": "0311.KL",
      "Long Name": "Go Hub Capital Berhad",
      "Name": "GOHUB"
    },
    {
      "Code": "0326.KL",
      "Long Name": NaN,
      "Name": "SORENTO"
    },
    {
      "Code": "5293.KL",
      "Long Name": "AME Elite Consortium Berhad",
      "Name": "AME"
    },
    {
      "Code": "6084.KL",
      "Long Name": "Star Media Group Berhad",
      "Name": "STAR"
    },
    {
      "Code": "7174.KL",
      "Long Name": "CAB Cakaran Corporation Berhad",
      "Name": "CAB"
    },
    {
      "Code": "0186.KL",
      "Long Name": "Perak Transit Berhad",
      "Name": "PTRANS"
    },
    {
      "Code": "0098.KL",
      "Long Name": "AuMas Resources Berhad",
      "Name": "AUMAS"
    },
    {
      "Code": "5323.KL",
      "Long Name": NaN,
      "Name": "JPG"
    },
    {
      "Code": "0173.KL",
      "Long Name": "Catcha Digital Berhad",
      "Name": "CATCHA"
    },
    {
      "Code": "0269.KL",
      "Long Name": "DS Sigma Holdings Berhad",
      "Name": "DSS"
    },
    {
      "Code": "03055.KL",
      "Long Name": "DSR Taiko Berhad",
      "Name": "DSR"
    },
    {
      "Code": "0012.KL",
      "Long Name": "Three-A Resources Berhad",
      "Name": "3A"
    },
    {
      "Code": "7133.KL",
      "Long Name": "United U-LI Corporation Berhad",
      "Name": "ULICORP"
    },
    {
      "Code": "9326.KL",
      "Long Name": "LB Aluminium Berhad",
      "Name": "LBALUM"
    },
    {
      "Code": "6815.KL",
      "Long Name": "Eupe Corporation Berhad",
      "Name": "EUPE"
    },
    {
      "Code": "5071.KL",
      "Long Name": "Coastal Contracts Bhd",
      "Name": "COASTAL"
    },
    {
      "Code": "0097.KL",
      "Long Name": "ViTrox Corporation Berhad",
      "Name": "VITROX"
    },
    {
      "Code": "0168.KL",
      "Long Name": "BM GreenTech Berhad",
      "Name": "BMGREEN"
    },
    {
      "Code": "5225.KL",
      "Long Name": "IHH Healthcare Berhad",
      "Name": "IHH"
    },
    {
      "Code": "5307.KL",
      "Long Name": "AME Real Estate Investment Trust",
      "Name": "AMEREIT"
    },
    {
      "Code": "7148.KL",
      "Long Name": "Duopharma Biotech Berhad",
      "Name": "DPHARMA"
    },
    {
      "Code": "5186.KL",
      "Long Name": "Malaysia Marine and Heavy Engineering Holdings Berhad",
      "Name": "MHB"
    },
    {
      "Code": "0220.KL",
      "Long Name": "Ocean Vantage Holdings Berhad",
      "Name": "OVH"
    },
    {
      "Code": "0053.KL",
      "Long Name": "OSK Ventures International Berhad",
      "Name": "OSKVI"
    },
    {
      "Code": "7160.KL",
      "Long Name": "Pentamaster Corporation Berhad",
      "Name": "PENTA"
    },
    {
      "Code": "0193.KL",
      "Long Name": "Kinergy Advancement Berhad",
      "Name": "KAB"
    },
    {
      "Code": "0166.KL",
      "Long Name": "Inari Amertron Berhad",
      "Name": "INARI"
    },
    {
      "Code": "0185.KL",
      "Long Name": "HSS Engineers Berhad",
      "Name": "HSSEB"
    },
    {
      "Code": "6483.KL",
      "Long Name": "Kenanga Investment Bank Berhad",
      "Name": "KENANGA"
    },
    {
      "Code": "6947.KL",
      "Long Name": "Celcomdigi Berhad",
      "Name": "CDB"
    },
    {
      "Code": "5026.KL",
      "Long Name": "MHC Plantations Bhd.",
      "Name": "MHC"
    },
    {
      "Code": "6254.KL",
      "Long Name": "PDZ Holdings Bhd",
      "Name": "PDZ"
    },
    {
      "Code": "5274.KL",
      "Long Name": "Hong Leong Capital Berhad",
      "Name": "HLCAP"
    },
    {
      "Code": "5212.KL",
      "Long Name": "Pavilion Real Estate Investment Trust",
      "Name": "PAVREIT"
    },
    {
      "Code": "8443.KL",
      "Long Name": "Hil Industries Berhad",
      "Name": "HIL"
    },
    {
      "Code": "9679.KL",
      "Long Name": "WCT Holdings Berhad",
      "Name": "WCT"
    },
    {
      "Code": "3867.KL",
      "Long Name": "Malaysian Pacific Industries Berhad",
      "Name": "MPI"
    },
    {
      "Code": "5300.KL",
      "Long Name": "Yenher Holdings Berhad",
      "Name": "YENHER"
    },
    {
      "Code": "7235.KL",
      "Long Name": "Superlon Holdings Berhad",
      "Name": "SUPERLN"
    },
    {
      "Code": "7214.KL",
      "Long Name": "A-Rank Berhad",
      "Name": "ARANK"
    },
    {
      "Code": "4197.KL",
      "Long Name": "Sime Darby Berhad",
      "Name": "SIME"
    },
    {
      "Code": "7228.KL",
      "Long Name": "T7 Global Berhad",
      "Name": "T7GLOBAL"
    },
    {
      "Code": "5211.KL",
      "Long Name": "Sunway Berhad",
      "Name": "SUNWAY"
    },
    {
      "Code": "5249.KL",
      "Long Name": "IOI Properties Group Berhad",
      "Name": "IOIPG"
    },
    {
      "Code": "5053.KL",
      "Long Name": "OSK Holdings Berhad",
      "Name": "OSK"
    },
    {
      "Code": "3794.KL",
      "Long Name": "Malayan Cement Berhad",
      "Name": "MCEMENT"
    },
    {
      "Code": "0298.KL",
      "Long Name": "Wentel Engineering Holdings Berhad",
      "Name": "WENTEL"
    },
    {
      "Code": "3034.KL",
      "Long Name": "Hap Seng Consolidated Berhad",
      "Name": "HAPSENG"
    },
    {
      "Code": "5243.KL",
      "Long Name": "Velesto Energy Berhad",
      "Name": "VELESTO"
    },
    {
      "Code": "7216.KL",
      "Long Name": "Kawan Food Berhad",
      "Name": "KAWAN"
    },
    {
      "Code": "0180.KL",
      "Long Name": "Kim Teck Cheong Consolidated Berhad",
      "Name": "KTC"
    },
    {
      "Code": "9083.KL",
      "Long Name": "Kumpulan Jetson Berhad",
      "Name": "JETSON"
    },
    {
      "Code": "5100.KL",
      "Long Name": "BP Plastics Holding Bhd.",
      "Name": "BPPLAS"
    },
    {
      "Code": "9946.KL",
      "Long Name": "Rex Industry Berhad",
      "Name": "REX"
    },
    {
      "Code": "0227.KL",
      "Long Name": "Econframe Berhad",
      "Name": "EFRAME"
    },
    {
      "Code": "7095.KL",
      "Long Name": "P.I.E. Industrial Berhad",
      "Name": "PIE"
    },
    {
      "Code": "0161.KL",
      "Long Name": "Hextar Industries Berhad",
      "Name": "HEXIND"
    },
    {
      "Code": "5032.KL",
      "Long Name": "Bintulu Port Holdings Berhad",
      "Name": "BIPORT"
    },
    {
      "Code": "0089.KL",
      "Long Name": "Tex Cycle Technology (M) Berhad",
      "Name": "TEXCYCL"
    },
    {
      "Code": "5070.KL",
      "Long Name": "Protasco Berhad",
      "Name": "PRTASCO"
    },
    {
      "Code": "0278.KL",
      "Long Name": "Edelteq Holdings Berhad",
      "Name": "EDELTEQ"
    },
    {
      "Code": "5145.KL",
      "Long Name": "Sealink International Berhad",
      "Name": "SEALINK"
    },
    {
      "Code": "5255.KL",
      "Long Name": "Lianson Fleet Group Berhad",
      "Name": "LFG"
    },
    {
      "Code": "0237.KL",
      "Long Name": "Haily Group Berhad",
      "Name": "HAILY"
    },
    {
      "Code": "0104.KL",
      "Long Name": "Genetec Technology Berhad",
      "Name": "GENETEC"
    },
    {
      "Code": "7250.KL",
      "Long Name": "Uzma Berhad",
      "Name": "UZMA"
    },
    {
      "Code": "0285.KL",
      "Long Name": "Mercury Securities Group Berhad",
      "Name": "MERSEC"
    },
    {
      "Code": "5347.KL",
      "Long Name": "Tenaga Nasional Berhad",
      "Name": "TENAGA"
    },
    {
      "Code": "4006.KL",
      "Long Name": "Oriental Holdings Berhad",
      "Name": "ORIENT"
    },
    {
      "Code": "0323.KL",
      "Long Name": "Crest Group Berhad",
      "Name": "CREST"
    },
    {
      "Code": "7060.KL",
      "Long Name": "New Hoong Fatt Holdings Berhad",
      "Name": "NHFATT"
    },
    {
      "Code": "5265.KL",
      "Long Name": "Oasis Harvest Corporation Berhad",
      "Name": "OASIS"
    },
    {
      "Code": "03059.KL",
      "Long Name": NaN,
      "Name": "AUTORIS"
    },
    {
      "Code": "6998.KL",
      "Long Name": "Bintai Kinden Corporation Berhad",
      "Name": "BINTAI"
    },
    {
      "Code": "3557.KL",
      "Long Name": "EcoFirst Consolidated Bhd",
      "Name": "ECOFIRS"
    },
    {
      "Code": "7169.KL",
      "Long Name": "Dominant Enterprise Berhad",
      "Name": "DOMINAN"
    },
    {
      "Code": "7439.KL",
      "Long Name": "Teck Guan Perdana Berhad",
      "Name": "TECGUAN"
    },
    {
      "Code": "7010.KL",
      "Long Name": "PTT Synergy Group Berhad",
      "Name": "PTT"
    },
    {
      "Code": "9199.KL",
      "Long Name": "Lysaght Galvanized Steel Berhad",
      "Name": "LYSAGHT"
    },
    {
      "Code": "5328.KL",
      "Long Name": NaN,
      "Name": "LWSABAH"
    },
    {
      "Code": "7248.KL",
      "Long Name": "SLP Resources Berhad",
      "Name": "SLP"
    },
    {
      "Code": "8133.KL",
      "Long Name": "Boustead Heavy Industries Corporation Berhad",
      "Name": "BHIC"
    },
    {
      "Code": "5235SS.KL",
      "Long Name": "KLCC Property Holdings Berhad",
      "Name": "KLCC"
    },
    {
      "Code": "6769.KL",
      "Long Name": "JKG Land Berhad",
      "Name": "JKGLAND"
    },
    {
      "Code": "5258.KL",
      "Long Name": "Bank Islam Malaysia Berhad",
      "Name": "BIMB"
    },
    {
      "Code": "5113.KL",
      "Long Name": "Rimbunan Sawit Berhad",
      "Name": "RSAWIT"
    },
    {
      "Code": "8419.KL",
      "Long Name": "Pansar Berhad",
      "Name": "PANSAR"
    },
    {
      "Code": "5143.KL",
      "Long Name": "Luxchem Corporation Berhad",
      "Name": "LUXCHEM"
    },
    {
      "Code": "7210.KL",
      "Long Name": "FM Global Logistics Holdings Berhad",
      "Name": "FM"
    },
    {
      "Code": "5140.KL",
      "Long Name": "TASCO Berhad",
      "Name": "TASCO"
    },
    {
      "Code": "1058.KL",
      "Long Name": "Manulife Holdings Berhad",
      "Name": "MANULFE"
    },
    {
      "Code": "2755.KL",
      "Long Name": "FCW Holdings Berhad",
      "Name": "FCW"
    },
    {
      "Code": "5278.KL",
      "Long Name": "Rhone Ma Holdings Berhad",
      "Name": "RHONEMA"
    },
    {
      "Code": "7034.KL",
      "Long Name": "Thong Guan Industries Berhad",
      "Name": "TGUAN"
    },
    {
      "Code": "0001.KL",
      "Long Name": "Supercomnet Technologies Berhad",
      "Name": "SCOMNET"
    },
    {
      "Code": "5273.KL",
      "Long Name": "Chin Hin Group Berhad",
      "Name": "CHINHIN"
    },
    {
      "Code": "7134.KL",
      "Long Name": "PWF Corporation Bhd.",
      "Name": "PWF"
    },
    {
      "Code": "6017.KL",
      "Long Name": "SHL Consolidated Bhd.",
      "Name": "SHL"
    },
    {
      "Code": "0242.KL",
      "Long Name": "Pappajack Berhad",
      "Name": "PPJACK"
    },
    {
      "Code": "5228.KL",
      "Long Name": "ELK-Desa Resources Berhad",
      "Name": "ELKDESA"
    },
    {
      "Code": "4995.KL",
      "Long Name": "Versatile Creative Berhad",
      "Name": "VERSATL"
    },
    {
      "Code": "1724.KL",
      "Long Name": "Paramount Corporation Berhad",
      "Name": "PARAMON"
    },
    {
      "Code": "5330.KL",
      "Long Name": NaN,
      "Name": "TMK"
    },
    {
      "Code": "9369.KL",
      "Long Name": "Teo Guan Lee Corporation Berhad",
      "Name": "TGL"
    },
    {
      "Code": "0293.KL",
      "Long Name": NaN,
      "Name": "KJTS"
    },
    {
      "Code": "3719.KL",
      "Long Name": "Panasonic Manufacturing Malaysia Berhad",
      "Name": "PANAMY"
    },
    {
      "Code": "2135.KL",
      "Long Name": "Gopeng Berhad",
      "Name": "GOPENG"
    },
    {
      "Code": "5236.KL",
      "Long Name": "Matrix Concepts Holdings Berhad",
      "Name": "MATRIX"
    },
    {
      "Code": "0246.KL",
      "Long Name": "Cnergenz Berhad",
      "Name": "CNERGEN"
    },
    {
      "Code": "9059.KL",
      "Long Name": "TSH Resources Berhad",
      "Name": "TSH"
    },
    {
      "Code": "0341.KL",
      "Long Name": "Colform Group Berhad",
      "Name": "COLFORM"
    },
    {
      "Code": "0119.KL",
      "Long Name": "AppAsia Berhad",
      "Name": "APPASIA"
    },
    {
      "Code": "7031.KL",
      "Long Name": "Amtel Holdings Berhad",
      "Name": "AMTEL"
    },
    {
      "Code": "5315.KL",
      "Long Name": "SkyWorld Development Berhad",
      "Name": "SKYWLD"
    },
    {
      "Code": "0054.KL",
      "Long Name": "Karyon Industries Berhad",
      "Name": "KARYON"
    },
    {
      "Code": "0010.KL",
      "Long Name": "IRIS Corporation Berhad",
      "Name": "IRIS"
    },
    {
      "Code": "8125.KL",
      "Long Name": "Scientex Packaging (Ayer Keroh) Berhad",
      "Name": "SCIPACK"
    },
    {
      "Code": "7234.KL",
      "Long Name": "Lotus Circular Berhad",
      "Name": "LOTUSCIR"
    },
    {
      "Code": "0288.KL",
      "Long Name": "Minox International Group Berhad",
      "Name": "MINOX"
    },
    {
      "Code": "8117.KL",
      "Long Name": "PGF Capital Berhad",
      "Name": "PGF"
    },
    {
      "Code": "5843.KL",
      "Long Name": "Kumpulan Perangsang Selangor Berhad",
      "Name": "KPS"
    },
    {
      "Code": "0250.KL",
      "Long Name": "YX Precious Metals Bhd",
      "Name": "YXPM"
    },
    {
      "Code": "3514.KL",
      "Long Name": "Marco Holdings Berhad",
      "Name": "MARCO"
    },
    {
      "Code": "7091.KL",
      "Long Name": "Unimech Group Berhad",
      "Name": "UNIMECH"
    },
    {
      "Code": "7811.KL",
      "Long Name": "Sapura Industrial Berhad",
      "Name": "SAPIND"
    },
    {
      "Code": "5180.KL",
      "Long Name": "CapitaLand Malaysia Trust",
      "Name": "CLMT"
    },
    {
      "Code": "7229.KL",
      "Long Name": "Favelle Favco Berhad",
      "Name": "FAVCO"
    },
    {
      "Code": "5171.KL",
      "Long Name": "Kimlun Corporation Berhad",
      "Name": "KIMLUN"
    },
    {
      "Code": "6599.KL",
      "Long Name": "Aeon Co. (M) Bhd.",
      "Name": "AEON"
    },
    {
      "Code": "9539.KL",
      "Long Name": "Multi-Usage Holdings Berhad",
      "Name": "MUH"
    },
    {
      "Code": "9822.KL",
      "Long Name": "SAM Engineering & Equipment (M) Berhad",
      "Name": "SAM"
    },
    {
      "Code": "5286.KL",
      "Long Name": "Mi Technovation Berhad",
      "Name": "MI"
    },
    {
      "Code": "5289.KL",
      "Long Name": "Techbond Group Berhad",
      "Name": "TECHBND"
    },
    {
      "Code": "7765.KL",
      "Long Name": "Rapid Synergy Berhad",
      "Name": "RAPID"
    },
    {
      "Code": "7178.KL",
      "Long Name": "Y.S.P. Southeast Asia Holding Berhad",
      "Name": "YSPSAH"
    },
    {
      "Code": "5163.KL",
      "Long Name": "Seremban Engineering Berhad",
      "Name": "SEB"
    },
    {
      "Code": "5082.KL",
      "Long Name": "Annum Berhad",
      "Name": "ANNUM"
    },
    {
      "Code": "0331.KL",
      "Long Name": "Cropmate Berhad",
      "Name": "CRPMATE"
    },
    {
      "Code": "5191.KL",
      "Long Name": "Tambun Indah Land Berhad",
      "Name": "TAMBUN"
    },
    {
      "Code": "7199.KL",
      "Long Name": "Kein Hing International Berhad",
      "Name": "KEINHIN"
    },
    {
      "Code": "5147.KL",
      "Long Name": "Samchem Holdings Berhad",
      "Name": "SAMCHEM"
    },
    {
      "Code": "0065.KL",
      "Long Name": "Excel Force MSC Berhad",
      "Name": "EFORCE"
    },
    {
      "Code": "7152.KL",
      "Long Name": "Jaycorp Berhad",
      "Name": "JAYCORP"
    },
    {
      "Code": "5106.KL",
      "Long Name": "Axis Real Estate Investment Trust",
      "Name": "AXREIT"
    },
    {
      "Code": "5047.KL",
      "Long Name": "NPC Resources Berhad",
      "Name": "NPC"
    },
    {
      "Code": "7233.KL",
      "Long Name": "Dufu Technology Corp. Berhad",
      "Name": "DUFU"
    },
    {
      "Code": "9466.KL",
      "Long Name": "KKB Engineering Berhad",
      "Name": "KKB"
    },
    {
      "Code": "6874.KL",
      "Long Name": "KUB Malaysia Berhad",
      "Name": "KUB"
    },
    {
      "Code": "5277.KL",
      "Long Name": "FoundPac Group Berhad",
      "Name": "FPGROUP"
    },
    {
      "Code": "5272.KL",
      "Long Name": "Ranhill Utilities Berhad",
      "Name": "RANHILL"
    },
    {
      "Code": "7197.KL",
      "Long Name": "GE-Shen Corporation Berhad",
      "Name": "GESHEN"
    },
    {
      "Code": "0213.KL",
      "Long Name": "MTAG Group Berhad",
      "Name": "MTAG"
    },
    {
      "Code": "8206.KL",
      "Long Name": "Eco World Development Group Berhad",
      "Name": "ECOWLD"
    },
    {
      "Code": "7162.KL",
      "Long Name": "Astino Berhad",
      "Name": "ASTINO"
    },
    {
      "Code": "5317.KL",
      "Long Name": "CPE Technology Berhad",
      "Name": "CPETECH"
    },
    {
      "Code": "3859.KL",
      "Long Name": "Magnum Berhad",
      "Name": "MAGNUM"
    },
    {
      "Code": "7083.KL",
      "Long Name": "Analabs Resources Berhad",
      "Name": "ANALABS"
    },
    {
      "Code": "2291.KL",
      "Long Name": "Genting Plantations Berhad",
      "Name": "GENP"
    },
    {
      "Code": "8583.KL",
      "Long Name": "Mah Sing Group Berhad",
      "Name": "MAHSING"
    },
    {
      "Code": "7103.KL",
      "Long Name": "Spritzer Bhd",
      "Name": "SPRITZER"
    },
    {
      "Code": "5109.KL",
      "Long Name": "YTL Hospitality REIT",
      "Name": "YTLREIT"
    },
    {
      "Code": "03012.KL",
      "Long Name": "Baba Eco Group Berhad",
      "Name": "BABA"
    },
    {
      "Code": "5329.KL",
      "Long Name": "Azam Jaya Berhad",
      "Name": "AZAMJAYA"
    },
    {
      "Code": "0129.KL",
      "Long Name": "Silver Ridge Holdings Bhd.",
      "Name": "SRIDGE"
    },
    {
      "Code": "0306.KL",
      "Long Name": NaN,
      "Name": "SMART"
    },
    {
      "Code": "2305.KL",
      "Long Name": "AYER Holdings Berhad",
      "Name": "AYER"
    },
    {
      "Code": "7528.KL",
      "Long Name": "DKLS Industries Berhad",
      "Name": "DKLS"
    },
    {
      "Code": "5297.KL",
      "Long Name": "Tuju Setia Berhad",
      "Name": "TJSETIA"
    },
    {
      "Code": "5049.KL",
      "Long Name": "Country View Berhad",
      "Name": "CVIEW"
    },
    {
      "Code": "0191.KL",
      "Long Name": "Cabnet Holdings Berhad",
      "Name": "CABNET"
    },
    {
      "Code": "3417.KL",
      "Long Name": "Eastern & Oriental Berhad",
      "Name": "E&O"
    },
    {
      "Code": "5280.KL",
      "Long Name": "KIP Real Estate Investment Trust",
      "Name": "KIPREIT"
    },
    {
      "Code": "7617.KL",
      "Long Name": "Magna Prima Berhad",
      "Name": "MAGNA"
    },
    {
      "Code": "5327.KL",
      "Long Name": NaN,
      "Name": "MEGAFB"
    },
    {
      "Code": "5123.KL",
      "Long Name": "Sentral REIT",
      "Name": "SENTRAL"
    },
    {
      "Code": "7140.KL",
      "Long Name": "OKA Corporation Bhd",
      "Name": "OKA"
    },
    {
      "Code": "5015.KL",
      "Long Name": "APM Automotive Holdings Berhad",
      "Name": "APM"
    },
    {
      "Code": "4502.KL",
      "Long Name": "Media Prima Berhad",
      "Name": "MEDIA"
    },
    {
      "Code": "5295.KL",
      "Long Name": "InNature Berhad",
      "Name": "INNATURE"
    },
    {
      "Code": "0149.KL",
      "Long Name": "Fibon Berhad",
      "Name": "FIBON"
    },
    {
      "Code": "5252.KL",
      "Long Name": "Sasbadi Holdings Berhad",
      "Name": "SASBADI"
    },
    {
      "Code": "2038.KL",
      "Long Name": "Negri Sembilan Oil Palms Berhad",
      "Name": "NSOP"
    },
    {
      "Code": "5195.KL",
      "Long Name": "Censof Holdings Berhad",
      "Name": "CENSOF"
    },
    {
      "Code": "7277.KL",
      "Long Name": "Dialog Group Berhad",
      "Name": "DIALOG"
    },
    {
      "Code": "0262.KL",
      "Long Name": "Sunview Group Berhad",
      "Name": "SUNVIEW"
    },
    {
      "Code": "6068.KL",
      "Long Name": "PCCS Group Berhad",
      "Name": "PCCS"
    },
    {
      "Code": "6939.KL",
      "Long Name": "Fiamma Holdings Berhad",
      "Name": "FIAMMA"
    },
    {
      "Code": "0209.KL",
      "Long Name": "Aimflex Berhad",
      "Name": "AIMFLEX"
    },
    {
      "Code": "0282.KL",
      "Long Name": "KGW Group Berhad",
      "Name": "KGW"
    },
    {
      "Code": "7241.KL",
      "Long Name": "Nextgreen Global Berhad",
      "Name": "NGGB"
    },
    {
      "Code": "7692.KL",
      "Long Name": "MyTech Group Berhad",
      "Name": "MYTECH"
    },
    {
      "Code": "5116.KL",
      "Long Name": "Al-'Aqar Healthcare REIT",
      "Name": "ALAQAR"
    },
    {
      "Code": "5161.KL",
      "Long Name": "JCY International Berhad",
      "Name": "JCY"
    },
    {
      "Code": "0343.KL",
      "Long Name": "TechStore Berhad",
      "Name": "TECHSTORE"
    },
    {
      "Code": "5131.KL",
      "Long Name": "Zhulian Corporation Berhad",
      "Name": "ZHULIAN"
    },
    {
      "Code": "3336.KL",
      "Long Name": "IJM Corporation Berhad",
      "Name": "IJM"
    },
    {
      "Code": "0123.KL",
      "Long Name": "Privasia Technology Berhad",
      "Name": "PRIVA"
    },
    {
      "Code": "0207.KL",
      "Long Name": "Mestron Holdings Berhad",
      "Name": "MESTRON"
    },
    {
      "Code": "2097.KL",
      "Long Name": "Meta Bright Group Berhad",
      "Name": "MBRIGHT"
    },
    {
      "Code": "5069.KL",
      "Long Name": "BLD Plantation Bhd.",
      "Name": "BLDPLNT"
    },
    {
      "Code": "7088.KL",
      "Long Name": "Poh Huat Resources Holdings Berhad",
      "Name": "POHUAT"
    },
    {
      "Code": "0201.KL",
      "Long Name": "Nova Wellness Group Berhad",
      "Name": "NOVA"
    },
    {
      "Code": "5303.KL",
      "Long Name": "Swift Haulage Berhad",
      "Name": "SWIFT"
    },
    {
      "Code": "5703.KL",
      "Long Name": "Muhibbah Engineering (M) Bhd.",
      "Name": "MUHIBAH"
    },
    {
      "Code": "5192.KL",
      "Long Name": "K. Seng Seng Corporation Berhad",
      "Name": "KSSC"
    },
    {
      "Code": "7077.KL",
      "Long Name": "Kerjaya Prospek Property Berhad",
      "Name": "KPPROP"
    },
    {
      "Code": "1694.KL",
      "Long Name": "Menang Corporation (M) Berhad",
      "Name": "MENANG"
    },
    {
      "Code": "2593.KL",
      "Long Name": "United Malacca Berhad",
      "Name": "UMCCA"
    },
    {
      "Code": "1147.KL",
      "Long Name": "Global Oriental Berhad",
      "Name": "GOB"
    },
    {
      "Code": "9288.KL",
      "Long Name": "Bonia Corporation Berhad",
      "Name": "BONIA"
    },
    {
      "Code": "7131.KL",
      "Long Name": "ACME Holdings Berhad",
      "Name": "ACME"
    },
    {
      "Code": "0235.KL",
      "Long Name": "Nestcon Berhad",
      "Name": "NESTCON"
    },
    {
      "Code": "0230.KL",
      "Long Name": "Teladan Group Berhad",
      "Name": "TELADAN"
    },
    {
      "Code": "4022.KL",
      "Long Name": "Maxim Global Berhad",
      "Name": "MAXIM"
    },
    {
      "Code": "7374.KL",
      "Long Name": "Tien Wah Press Holdings Berhad",
      "Name": "TIENWAH"
    },
    {
      "Code": "5200.KL",
      "Long Name": "UOA Development Bhd",
      "Name": "UOADEV"
    },
    {
      "Code": "8982.KL",
      "Long Name": "Cepatwawasan Group Berhad",
      "Name": "CEPAT"
    },
    {
      "Code": "3476.KL",
      "Long Name": "Keck Seng (Malaysia) Berhad",
      "Name": "KSENG"
    },
    {
      "Code": "0251.KL",
      "Long Name": "SFP Tech Holdings Berhad",
      "Name": "SFPTECH"
    },
    {
      "Code": "7033.KL",
      "Long Name": "Kumpulan H & L High-Tech Berhad",
      "Name": "HIGHTEC"
    },
    {
      "Code": "6971.KL",
      "Long Name": "Kobay Technology Bhd.",
      "Name": "KOBAY"
    },
    {
      "Code": "9121.KL",
      "Long Name": "KPS Consortium Berhad",
      "Name": "KPSCB"
    },
    {
      "Code": "3107.KL",
      "Long Name": "Fima Corporation Berhad",
      "Name": "FIMACOR"
    },
    {
      "Code": "7078.KL",
      "Long Name": "Ahmad Zaki Resources Berhad",
      "Name": "AZRB"
    },
    {
      "Code": "5288.KL",
      "Long Name": "Sime Darby Property Berhad",
      "Name": "SIMEPROP"
    },
    {
      "Code": "0095.KL",
      "Long Name": "MAG Holdings Berhad",
      "Name": "MAG"
    },
    {
      "Code": "0056.KL",
      "Long Name": "NCT Alliance Berhad",
      "Name": "NCT"
    },
    {
      "Code": "0308.KL",
      "Long Name": NaN,
      "Name": "KTI"
    },
    {
      "Code": "5134.KL",
      "Long Name": "Southern Acids (M) Berhad",
      "Name": "SAB"
    },
    {
      "Code": "3395.KL",
      "Long Name": "Berjaya Corporation Berhad",
      "Name": "BJCORP"
    },
    {
      "Code": "0345.KL",
      "Long Name": NaN,
      "Name": "SUNLOGY"
    },
    {
      "Code": "5264.KL",
      "Long Name": "Malakoff Corporation Berhad",
      "Name": "MALAKOF"
    },
    {
      "Code": "0175.KL",
      "Long Name": "HHRG Berhad",
      "Name": "HHRG"
    },
    {
      "Code": "9431.KL",
      "Long Name": "Seni Jaya Corporation Berhad",
      "Name": "SJC"
    },
    {
      "Code": "0287.KL",
      "Long Name": "SSF Home Group Berhad",
      "Name": "SSF"
    },
    {
      "Code": "4936.KL",
      "Long Name": "Malpac Holdings Berhad",
      "Name": "MALPAC"
    },
    {
      "Code": "7187.KL",
      "Long Name": "Chin Hin Group Property Berhad",
      "Name": "CHGP"
    },
    {
      "Code": "8478.KL",
      "Long Name": "Hwa Tai Industries Berhad",
      "Name": "HWATAI"
    },
    {
      "Code": "4065.KL",
      "Long Name": "PPB Group Berhad",
      "Name": "PPB"
    },
    {
      "Code": "0112.KL",
      "Long Name": "Mikro MSC Berhad",
      "Name": "MIKROMB"
    },
    {
      "Code": "0197.KL",
      "Long Name": "Wegmans Holdings Berhad",
      "Name": "WEGMANS"
    },
    {
      "Code": "5075.KL",
      "Long Name": "Plenitude Berhad",
      "Name": "PLENITU"
    },
    {
      "Code": "5222.KL",
      "Long Name": "FGV Holdings Berhad",
      "Name": "FGV"
    },
    {
      "Code": "5208.KL",
      "Long Name": "EITA Resources Berhad",
      "Name": "EITA"
    },
    {
      "Code": "0281.KL",
      "Long Name": "Daythree Digital Berhad",
      "Name": "DAY3"
    },
    {
      "Code": "7165.KL",
      "Long Name": "Velocity Capital Partner Berhad",
      "Name": "VELOCITY"
    },
    {
      "Code": "7232.KL",
      "Long Name": "Resintech Berhad",
      "Name": "RESINTC"
    },
    {
      "Code": "3662.KL",
      "Long Name": "Malayan Flour Mills Berhad",
      "Name": "MFLOUR"
    },
    {
      "Code": "6888.KL",
      "Long Name": "Axiata Group Berhad",
      "Name": "AXIATA"
    },
    {
      "Code": "0321.KL",
      "Long Name": "Solar District Cooling Group Berhad",
      "Name": "SDCG"
    },
    {
      "Code": "5185.KL",
      "Long Name": "AFFIN Bank Berhad",
      "Name": "AFFIN"
    },
    {
      "Code": "0226.KL",
      "Long Name": "Aneka Jaringan Holdings Berhad",
      "Name": "ANEKA"
    },
    {
      "Code": "7105.KL",
      "Long Name": "HCK Capital Group Berhad",
      "Name": "HCK"
    },
    {
      "Code": "9792.KL",
      "Long Name": "SEG International Bhd",
      "Name": "SEG"
    },
    {
      "Code": "7227.KL",
      "Long Name": "UMS-Neiken Group Berhad",
      "Name": "UMSNGB"
    },
    {
      "Code": "7204.KL",
      "Long Name": "D & O Green Technologies Berhad",
      "Name": "D&O"
    },
    {
      "Code": "0335.KL",
      "Long Name": "Carlo Rino Group Bhd",
      "Name": "CARLORINO"
    },
    {
      "Code": "8664.KL",
      "Long Name": "S P Setia Berhad",
      "Name": "SPSETIA"
    },
    {
      "Code": "9962.KL",
      "Long Name": "Gromutual Berhad",
      "Name": "GMUTUAL"
    },
    {
      "Code": "1899.KL",
      "Long Name": "Batu Kawan Berhad",
      "Name": "BKAWAN"
    },
    {
      "Code": "0328.KL",
      "Long Name": "3REN Berhad",
      "Name": "3REN"
    },
    {
      "Code": "7207.KL",
      "Long Name": "Success Transformer Corporation Berhad",
      "Name": "SUCCESS"
    },
    {
      "Code": "0218.KL",
      "Long Name": "ACO Group Berhad",
      "Name": "ACO"
    },
    {
      "Code": "5166.KL",
      "Long Name": "Cyberjaya Education Group Berhad",
      "Name": "CYBERE"
    },
    {
      "Code": "2445.KL",
      "Long Name": "Kuala Lumpur Kepong Berhad",
      "Name": "KLK"
    },
    {
      "Code": "1171.KL",
      "Long Name": "MBSB Berhad",
      "Name": "MBSB"
    },
    {
      "Code": "7121.KL",
      "Long Name": "XL Holdings Berhad",
      "Name": "XL"
    },
    {
      "Code": "7773.KL",
      "Long Name": "EP Manufacturing Bhd",
      "Name": "EPMB"
    },
    {
      "Code": "5320.KL",
      "Long Name": NaN,
      "Name": "PLINTAS"
    },
    {
      "Code": "5205.KL",
      "Long Name": "Eversendai Corporation Berhad",
      "Name": "SENDAI"
    },
    {
      "Code": "0330.KL",
      "Long Name": NaN,
      "Name": "SUPREME"
    },
    {
      "Code": "0261.KL",
      "Long Name": "Cosmos Technology International Berhad",
      "Name": "COSMOS"
    },
    {
      "Code": "0079.KL",
      "Long Name": "Aldrich Resources Berhad",
      "Name": "ALRICH"
    },
    {
      "Code": "4057.KL",
      "Long Name": "Asian Pac Holdings Berhad",
      "Name": "ASIAPAC"
    },
    {
      "Code": "5028.KL",
      "Long Name": "HeiTech Padu Berhad",
      "Name": "HTPADU"
    },
    {
      "Code": "9598.KL",
      "Long Name": "Pintaras Jaya Berhad",
      "Name": "PTARAS"
    },
    {
      "Code": "6114.KL",
      "Long Name": "MKH Berhad",
      "Name": "MKH"
    },
    {
      "Code": "8567.KL",
      "Long Name": "Salcon Berhad",
      "Name": "SALCON"
    },
    {
      "Code": "5292.KL",
      "Long Name": "UWC Berhad",
      "Name": "UWC"
    },
    {
      "Code": "7082.KL",
      "Long Name": "M & A Equity Holdings Berhad",
      "Name": "M&A"
    },
    {
      "Code": "0232.KL",
      "Long Name": "Volcano Berhad",
      "Name": "VOLCANO"
    },
    {
      "Code": "2429.KL",
      "Long Name": "Tanco Holdings Berhad",
      "Name": "TANCO"
    },
    {
      "Code": "5398.KL",
      "Long Name": "Gamuda Berhad",
      "Name": "GAMUDA"
    },
    {
      "Code": "5275.KL",
      "Long Name": "Mynews Holdings Berhad",
      "Name": "MYNEWS"
    },
    {
      "Code": "7132.KL",
      "Long Name": "SMIS Corporation Berhad",
      "Name": "SMISCOR"
    },
    {
      "Code": "0205.KL",
      "Long Name": "DPI Holdings Berhad",
      "Name": "DPIH"
    },
    {
      "Code": "6149.KL",
      "Long Name": "Metrod Holdings Berhad",
      "Name": "METROD"
    },
    {
      "Code": "7412.KL",
      "Long Name": "SHH Resources Holdings Berhad",
      "Name": "SHH"
    },
    {
      "Code": "7172.KL",
      "Long Name": "PMB Technology Berhad",
      "Name": "PMBTECH"
    },
    {
      "Code": "1503.KL",
      "Long Name": "GuocoLand (Malaysia) Berhad",
      "Name": "GUOCO"
    },
    {
      "Code": "0336.KL",
      "Long Name": NaN,
      "Name": "WINSTAR"
    },
    {
      "Code": "2852.KL",
      "Long Name": "Cahya Mata Sarawak Berhad",
      "Name": "CMSB"
    },
    {
      "Code": "7245.KL",
      "Long Name": "Citaglobal Berhad",
      "Name": "CITAGLB"
    },
    {
      "Code": "5517.KL",
      "Long Name": "Shangri-La Hotels (Malaysia) Berhad",
      "Name": "SHANG"
    },
    {
      "Code": "0160.KL",
      "Long Name": "Hiap Huat Holdings Berhad",
      "Name": "HHHCORP"
    },
    {
      "Code": "7137.KL",
      "Long Name": "UMS Holdings Berhad",
      "Name": "UMS"
    },
    {
      "Code": "5110.KL",
      "Long Name": "Uoa Real Estate Investment",
      "Name": "UOAREIT"
    },
    {
      "Code": "5094.KL",
      "Long Name": "CSC Steel Holdings Berhad",
      "Name": "CSCSTEL"
    },
    {
      "Code": "0231.KL",
      "Long Name": "Flexidynamic Holdings Berhad",
      "Name": "FLEXI"
    },
    {
      "Code": "4723.KL",
      "Long Name": "JAKS Resources Berhad",
      "Name": "JAKS"
    },
    {
      "Code": "2453.KL",
      "Long Name": "Kluang Rubber Company (Malaya) Berhad",
      "Name": "KLUANG"
    },
    {
      "Code": "3379.KL",
      "Long Name": "Insas Berhad",
      "Name": "INSAS"
    },
    {
      "Code": "0171.KL",
      "Long Name": "PeterLabs Holdings Berhad",
      "Name": "PLABS"
    },
    {
      "Code": "0342.KL",
      "Long Name": "RichTech Digital Berhad",
      "Name": "RTECH"
    },
    {
      "Code": "0313.KL",
      "Long Name": "BWYS Group Berhad",
      "Name": "BWYS"
    },
    {
      "Code": "5035.KL",
      "Long Name": "Knusford Berhad",
      "Name": "KNUSFOR"
    },
    {
      "Code": "7022.KL",
      "Long Name": "Globetronics Technology Bhd.",
      "Name": "GTRONIC"
    },
    {
      "Code": "5120.KL",
      "Long Name": "AmFirst Real Estate Investment Trust",
      "Name": "AMFIRST"
    },
    {
      "Code": "8702.KL",
      "Long Name": "Texchem Resources Bhd",
      "Name": "TEXCHEM"
    },
    {
      "Code": "5190.KL",
      "Long Name": "Benalec Holdings Berhad",
      "Name": "BENALEC"
    },
    {
      "Code": "0240.KL",
      "Long Name": "Coraza Integrated Technology Berhad",
      "Name": "CORAZA"
    },
    {
      "Code": "8362.KL",
      "Long Name": "KYM Holdings Bhd",
      "Name": "KYM"
    },
    {
      "Code": "7668.KL",
      "Long Name": "Beshom Holdings Berhad",
      "Name": "BESHOM"
    },
    {
      "Code": "5121.KL",
      "Long Name": "Hektar Real Estate Investment Trust",
      "Name": "HEKTAR"
    },
    {
      "Code": "7153.KL",
      "Long Name": "Kossan Rubber Industries Bhd",
      "Name": "KOSSAN"
    },
    {
      "Code": "7089.KL",
      "Long Name": "Lii Hen Industries Bhd",
      "Name": "LIIHEN"
    },
    {
      "Code": "1368.KL",
      "Long Name": "UEM Edgenta Berhad",
      "Name": "EDGENTA"
    },
    {
      "Code": "5087.KL",
      "Long Name": "Mycron Steel Berhad",
      "Name": "MYCRON"
    },
    {
      "Code": "5247.KL",
      "Long Name": "Karex Berhad",
      "Name": "KAREX"
    },
    {
      "Code": "3816.KL",
      "Long Name": "MISC Berhad",
      "Name": "MISC"
    },
    {
      "Code": "0272.KL",
      "Long Name": "TT Vision Holdings Berhad",
      "Name": "TTVHB"
    },
    {
      "Code": "7066.KL",
      "Long Name": "Yong Tai Berhad",
      "Name": "YONGTAI"
    },
    {
      "Code": "0312.KL",
      "Long Name": "Ocean Fresh Berhad",
      "Name": "OFB"
    },
    {
      "Code": "3743.KL",
      "Long Name": "Sunsuria Berhad",
      "Name": "SUNSURIA"
    },
    {
      "Code": "7099.KL",
      "Long Name": "Mayu Global Group Berhad",
      "Name": "MAYU"
    },
    {
      "Code": "0148.KL",
      "Long Name": "Sunzen Group Berhad",
      "Name": "SUNZEN"
    },
    {
      "Code": "5129.KL",
      "Long Name": "Melati Ehsan Holdings Berhad",
      "Name": "MELATI"
    },
    {
      "Code": "4316.KL",
      "Long Name": "Sin Heng Chan (Malaya) Berhad",
      "Name": "SHCHAN"
    },
    {
      "Code": "9938.KL",
      "Long Name": "Bright Packaging Industry Berhad",
      "Name": "BRIGHT"
    },
    {
      "Code": "5183.KL",
      "Long Name": "PETRONAS Chemicals Group Berhad",
      "Name": "PCHEM"
    },
    {
      "Code": "7200.KL",
      "Long Name": "Tek Seng Holdings Berhad",
      "Name": "TEKSENG"
    },
    {
      "Code": "4359.KL",
      "Long Name": "Turiya Berhad",
      "Name": "TURIYA"
    },
    {
      "Code": "0024.KL",
      "Long Name": "JAG Berhad",
      "Name": "JAG"
    },
    {
      "Code": "6521.KL",
      "Long Name": "Suria Capital Holdings Berhad",
      "Name": "SURIA"
    },
    {
      "Code": "8494.KL",
      "Long Name": "LBI Capital Berhad",
      "Name": "LBICAP"
    },
    {
      "Code": "6181.KL",
      "Long Name": "Malton Berhad",
      "Name": "MALTON"
    },
    {
      "Code": "7501.KL",
      "Long Name": "Harn Len Corporation Bhd",
      "Name": "HARNLEN"
    },
    {
      "Code": "2224.KL",
      "Long Name": "Selangor Dredging Berhad",
      "Name": "SDRED"
    },
    {
      "Code": "5042.KL",
      "Long Name": "TSR Capital Berhad",
      "Name": "TSRCAP"
    },
    {
      "Code": "0300.KL",
      "Long Name": "SBH Marine Holdings Berhad",
      "Name": "SBH"
    },
    {
      "Code": "9571.KL",
      "Long Name": "Mitrajaya Holdings Berhad",
      "Name": "MITRA"
    },
    {
      "Code": "9873.KL",
      "Long Name": "Prestar Resources Berhad",
      "Name": "PRESTAR"
    },
    {
      "Code": "5065.KL",
      "Long Name": "Ornapaper Berhad",
      "Name": "ORNA"
    },
    {
      "Code": "5299.KL",
      "Long Name": "IGB Commercial Real Estate Investment Trust",
      "Name": "IGBCR"
    },
    {
      "Code": "3182.KL",
      "Long Name": "Genting Berhad",
      "Name": "GENTING"
    },
    {
      "Code": "0327.KL",
      "Long Name": "OB Holdings Berhad",
      "Name": "OBHB"
    },
    {
      "Code": "5005.KL",
      "Long Name": "Unisem (M) Berhad",
      "Name": "UNISEM"
    },
    {
      "Code": "0239.KL",
      "Long Name": "Ecomate Holdings Berhad",
      "Name": "ECOMATE"
    },
    {
      "Code": "0018.KL",
      "Long Name": "Lambo Group Berhad",
      "Name": "LAMBO"
    },
    {
      "Code": "5220.KL",
      "Long Name": "Globaltec Formation Berhad",
      "Name": "GLOTEC"
    },
    {
      "Code": "5316.KL",
      "Long Name": "MST Golf Group Berhad",
      "Name": "MSTGOLF"
    },
    {
      "Code": "5291.KL",
      "Long Name": "HPMT Holdings Berhad",
      "Name": "HPMT"
    },
    {
      "Code": "8346.KL",
      "Long Name": "Perak Corporation Berhad",
      "Name": "PRKCORP"
    },
    {
      "Code": "6602.KL",
      "Long Name": "BCB Berhad",
      "Name": "BCB"
    },
    {
      "Code": "5331.KL",
      "Long Name": NaN,
      "Name": "PGLOBAL"
    },
    {
      "Code": "0241.KL",
      "Long Name": "Taghill Holdings Berhad",
      "Name": "TAGHILL"
    },
    {
      "Code": "7198.KL",
      "Long Name": "DPS Resources Berhad",
      "Name": "DPS"
    },
    {
      "Code": "2984.KL",
      "Long Name": "FACB Industries Incorporated Berhad",
      "Name": "FACBIND"
    },
    {
      "Code": "5020.KL",
      "Long Name": "Glomac Berhad",
      "Name": "GLOMAC"
    },
    {
      "Code": "03024.KL",
      "Long Name": "CE Technology Berhad",
      "Name": "CETECH"
    },
    {
      "Code": "0146.KL",
      "Long Name": "JF Technology Berhad",
      "Name": "JFTECH"
    },
    {
      "Code": "2542.KL",
      "Long Name": "Riverview Rubber Estates, Berhad",
      "Name": "RVIEW"
    },
    {
      "Code": "4251.KL",
      "Long Name": "I-Berhad",
      "Name": "IBHD"
    },
    {
      "Code": "7222.KL",
      "Long Name": "Imaspro Corporation Berhad",
      "Name": "IMASPRO"
    },
    {
      "Code": "5054.KL",
      "Long Name": "TRC Synergy Berhad",
      "Name": "TRC"
    },
    {
      "Code": "5533.KL",
      "Long Name": "OCB Berhad",
      "Name": "OCB"
    },
    {
      "Code": "5239.KL",
      "Long Name": "Titijaya Land Berhad",
      "Name": "TITIJYA"
    },
    {
      "Code": "7129.KL",
      "Long Name": "Asia File Corporation Bhd.",
      "Name": "ASIAFLE"
    },
    {
      "Code": "0319.KL",
      "Long Name": "VETECE Holdings Berhad",
      "Name": "VTC"
    },
    {
      "Code": "5305.KL",
      "Long Name": "Senheng New Retail Berhad",
      "Name": "SENHENG"
    },
    {
      "Code": "0172.KL",
      "Long Name": "OCK Group Berhad",
      "Name": "OCK"
    },
    {
      "Code": "9954.KL",
      "Long Name": "RGT Berhad",
      "Name": "RGTBHD"
    },
    {
      "Code": "7191.KL",
      "Long Name": "Adventa Berhad",
      "Name": "ADVENTA"
    },
    {
      "Code": "7323.KL",
      "Long Name": "Ken Holdings Berhad",
      "Name": "KEN"
    },
    {
      "Code": "5202.KL",
      "Long Name": "MSM Malaysia Holdings Berhad",
      "Name": "MSM"
    },
    {
      "Code": "3905.KL",
      "Long Name": "Mulpha International Bhd",
      "Name": "MULPHA"
    },
    {
      "Code": "7249.KL",
      "Long Name": "Skygate Solutions Berhad",
      "Name": "SKYGATE"
    },
    {
      "Code": "7079.KL",
      "Long Name": "TWL Holdings Berhad",
      "Name": "TWL"
    },
    {
      "Code": "4715.KL",
      "Long Name": "Genting Malaysia Berhad",
      "Name": "GENM"
    },
    {
      "Code": "5068.KL",
      "Long Name": "Luster Industries Bhd",
      "Name": "LUSTER"
    },
    {
      "Code": "0090.KL",
      "Long Name": "Elsoft Research Berhad",
      "Name": "ELSOFT"
    },
    {
      "Code": "5006.KL",
      "Long Name": "Varia Berhad",
      "Name": "VARIA"
    },
    {
      "Code": "6912.KL",
      "Long Name": "Pasdec Holdings Berhad",
      "Name": "PASDEC"
    },
    {
      "Code": "0064.KL",
      "Long Name": "Efficient E-Solutions Berhad",
      "Name": "EFFICEN"
    },
    {
      "Code": "0228.KL",
      "Long Name": "HPP Holdings Berhad",
      "Name": "HPPHB"
    },
    {
      "Code": "5313.KL",
      "Long Name": "Radium Development Berhad",
      "Name": "RADIUM"
    },
    {
      "Code": "0080.KL",
      "Long Name": "Straits Energy Resources Berhad",
      "Name": "STRAITS"
    },
    {
      "Code": "0325.KL",
      "Long Name": "Northeast Group Berhad",
      "Name": "NE"
    },
    {
      "Code": "8591.KL",
      "Long Name": "Crest Builder Holdings Berhad",
      "Name": "CRESBLD"
    },
    {
      "Code": "5168.KL",
      "Long Name": "Hartalega Holdings Berhad",
      "Name": "HARTA"
    },
    {
      "Code": "0199.KL",
      "Long Name": "Tri-Mode System (M) Berhad",
      "Name": "TRIMODE"
    },
    {
      "Code": "5098.KL",
      "Long Name": "Malaysia Steel Works (KL) Bhd.",
      "Name": "MASTEEL"
    },
    {
      "Code": "0069.KL",
      "Long Name": "Vinvest Capital Holdings Berhad",
      "Name": "VINVEST"
    },
    {
      "Code": "7128.KL",
      "Long Name": "CAM Resources Berhad",
      "Name": "CAMRES"
    },
    {
      "Code": "0221.KL",
      "Long Name": "TCS Group Holdings Berhad",
      "Name": "TCS"
    },
    {
      "Code": "5111.KL",
      "Long Name": "Tower Real Estate Investment Trust",
      "Name": "TWRREIT"
    },
    {
      "Code": "7006.KL",
      "Long Name": "Rhong Khen International Berhad",
      "Name": "RKI"
    },
    {
      "Code": "2054.KL",
      "Long Name": "TDM Berhad",
      "Name": "TDM"
    },
    {
      "Code": "0189.KL",
      "Long Name": "Matang Berhad",
      "Name": "MATANG"
    },
    {
      "Code": "7071.KL",
      "Long Name": "OCR Group Berhad",
      "Name": "OCR"
    },
    {
      "Code": "0195.KL",
      "Long Name": "Binasat Communications Berhad",
      "Name": "BINACOM"
    },
    {
      "Code": "5576.KL",
      "Long Name": "Minho (M) Berhad",
      "Name": "MINHO"
    },
    {
      "Code": "0101.KL",
      "Long Name": "TMC Life Sciences Berhad",
      "Name": "TMCLIFE"
    },
    {
      "Code": "3778.KL",
      "Long Name": "Melewar Industrial Group Berhad",
      "Name": "MELEWAR"
    },
    {
      "Code": "5148.KL",
      "Long Name": "UEM Sunrise Berhad",
      "Name": "UEMS"
    },
    {
      "Code": "5062.KL",
      "Long Name": "Hua Yang Berhad",
      "Name": "HUAYANG"
    },
    {
      "Code": "8052.KL",
      "Long Name": "Central Global Berhad",
      "Name": "CGB"
    },
    {
      "Code": "3298.KL",
      "Long Name": "Hexza Corporation Berhad",
      "Name": "HEXZA"
    },
    {
      "Code": "9237.KL",
      "Long Name": "Sarawak Consolidated Industries Berhad",
      "Name": "SCIB"
    },
    {
      "Code": "1651.KL",
      "Long Name": "Malaysian Resources Corporation Berhad",
      "Name": "MRCB"
    },
    {
      "Code": "0329.KL",
      "Long Name": "Metro Healthcare Berhad",
      "Name": "METRO"
    },
    {
      "Code": "8486.KL",
      "Long Name": "Lion Posim Berhad",
      "Name": "LIONPSIM"
    },
    {
      "Code": "7013.KL",
      "Long Name": "Hubline Berhad",
      "Name": "HUBLINE"
    },
    {
      "Code": "5056.KL",
      "Long Name": "Engtex Group Berhad",
      "Name": "ENGTEX"
    },
    {
      "Code": "5232.KL",
      "Long Name": "Leon Fuat Berhad",
      "Name": "LEONFB"
    },
    {
      "Code": "9261.KL",
      "Long Name": "Gadang Holdings Berhad",
      "Name": "GADANG"
    },
    {
      "Code": "0206.KL",
      "Long Name": "Gagasan Nadi Cergas Berhad",
      "Name": "NADIBHD"
    },
    {
      "Code": "0176.KL",
      "Long Name": "Kronologi Asia Berhad",
      "Name": "KRONO"
    },
    {
      "Code": "7722.KL",
      "Long Name": "Asia Brands Berhad",
      "Name": "ASIABRN"
    },
    {
      "Code": "0266.KL",
      "Long Name": "Leform Berhad",
      "Name": "LEFORM"
    },
    {
      "Code": "5260.KL",
      "Long Name": "Only World Group Holdings Berhad",
      "Name": "OWG"
    },
    {
      "Code": "2143.KL",
      "Long Name": "ECM Libra Group Berhad",
      "Name": "ECM"
    },
    {
      "Code": "0322.KL",
      "Long Name": "KHPT Holdings Berhad",
      "Name": "KHB"
    },
    {
      "Code": "8397.KL",
      "Long Name": "Tiong Nam Logistics Holdings Berhad",
      "Name": "TNLOGIS"
    },
    {
      "Code": "7181.KL",
      "Long Name": "ARB Berhad",
      "Name": "ARBB"
    },
    {
      "Code": "8893.KL",
      "Long Name": "M K Land Holdings Berhad",
      "Name": "MKLAND"
    },
    {
      "Code": "5269.KL",
      "Long Name": "Al-Salam Real Estate Investment Trust",
      "Name": "ALSREIT"
    },
    {
      "Code": "9814.KL",
      "Long Name": "Bertam Alliance Berhad",
      "Name": "BERTAM"
    },
    {
      "Code": "5077.KL",
      "Long Name": "Maybulk Berhad",
      "Name": "MAYBULK"
    },
    {
      "Code": "3042.KL",
      "Long Name": "Petron Malaysia Refining & Marketing Bhd",
      "Name": "PETRONM"
    },
    {
      "Code": "7202.KL",
      "Long Name": "Hextar Retail Berhad",
      "Name": "HEXRTL"
    },
    {
      "Code": "3913.KL",
      "Long Name": "MUI Properties Berhad",
      "Name": "MUIPROP"
    },
    {
      "Code": "0158.KL",
      "Long Name": "SCC Holdings Berhad",
      "Name": "SCC"
    },
    {
      "Code": "0316.KL",
      "Long Name": "Sik Cheong Berhad",
      "Name": "SCB"
    },
    {
      "Code": "5167.KL",
      "Long Name": "Turbo-Mech Berhad",
      "Name": "TURBO"
    },
    {
      "Code": "8745.KL",
      "Long Name": "S & F Capital Berhad",
      "Name": "S&FCAP"
    },
    {
      "Code": "7062.KL",
      "Long Name": "Khind Holdings Berhad",
      "Name": "KHIND"
    },
    {
      "Code": "9717.KL",
      "Long Name": "Sycal Ventures Berhad",
      "Name": "SYCAL"
    },
    {
      "Code": "03011.KL",
      "Long Name": "Amlex Holdings Berhad",
      "Name": "AMLEX"
    },
    {
      "Code": "3174.KL",
      "Long Name": "Land & General Berhad",
      "Name": "L&G"
    },
    {
      "Code": "9881.KL",
      "Long Name": "Leader Steel Holdings Berhad",
      "Name": "LSTEEL"
    },
    {
      "Code": "7757.KL",
      "Long Name": "UPA Corporation Berhad",
      "Name": "UPA"
    },
    {
      "Code": "5007.KL",
      "Long Name": "Chin Well Holdings Berhad",
      "Name": "CHINWEL"
    },
    {
      "Code": "0301.KL",
      "Long Name": "Zantat Holdings Berhad",
      "Name": "ZANTAT"
    },
    {
      "Code": "5127.KL",
      "Long Name": "AmanahRaya Real Estate Investment Trust",
      "Name": "ARREIT"
    },
    {
      "Code": "5165.KL",
      "Long Name": "DFCITY Group Berhad",
      "Name": "DFCITY"
    },
    {
      "Code": "7157.KL",
      "Long Name": "CYL Corporation Berhad",
      "Name": "CYL"
    },
    {
      "Code": "7217.KL",
      "Long Name": "Eonmetall Group Berhad",
      "Name": "EMETALL"
    },
    {
      "Code": "7203.KL",
      "Long Name": "Wang-Zheng Berhad",
      "Name": "WANGZNG"
    },
    {
      "Code": "6076.KL",
      "Long Name": "Encorp Berhad",
      "Name": "ENCORP"
    },
    {
      "Code": "6173.KL",
      "Long Name": "Bina Darulaman Berhad",
      "Name": "BDB"
    },
    {
      "Code": "0102.KL",
      "Long Name": "Waja Konsortium Berhad",
      "Name": "WAJA"
    },
    {
      "Code": "5108.KL",
      "Long Name": NaN,
      "Name": "ICAP"
    },
    {
      "Code": "5001.KL",
      "Long Name": "Mieco Chipboard Berhad",
      "Name": "MIECO"
    },
    {
      "Code": "6904.KL",
      "Long Name": "Subur Tiasa Holdings Berhad",
      "Name": "SUBUR"
    },
    {
      "Code": "03054.KL",
      "Long Name": NaN,
      "Name": "SNOWFIT"
    },
    {
      "Code": "0248.KL",
      "Long Name": "Yew Lee Pacific Group Berhad",
      "Name": "YEWLEE"
    },
    {
      "Code": "5738.KL",
      "Long Name": "Country Heights Holdings Berhad",
      "Name": "CHHB"
    },
    {
      "Code": "5010.KL",
      "Long Name": "Tong Herr Resources Berhad",
      "Name": "TONGHER"
    },
    {
      "Code": "1619.KL",
      "Long Name": "DRB-HICOM Berhad",
      "Name": "DRBHCOM"
    },
    {
      "Code": "3948.KL",
      "Long Name": "DutaLand Berhad",
      "Name": "DUTALND"
    },
    {
      "Code": "9628.KL",
      "Long Name": "Lebtech Berhad",
      "Name": "LEBTECH"
    },
    {
      "Code": "7073.KL",
      "Long Name": "Seacera Group Berhad",
      "Name": "SEACERA"
    },
    {
      "Code": "5101.KL",
      "Long Name": "Evergreen Fibreboard Berhad",
      "Name": "EVERGRN"
    },
    {
      "Code": "0111.KL",
      "Long Name": "K-One Technology Berhad",
      "Name": "K1"
    },
    {
      "Code": "0035.KL",
      "Long Name": "Hextar Capital Berhad",
      "Name": "HEXCAP"
    },
    {
      "Code": "8303.KL",
      "Long Name": "Lotus KFM Berhad",
      "Name": "LOTUS"
    },
    {
      "Code": "5230.KL",
      "Long Name": "Tune Protect Group Berhad",
      "Name": "TUNEPRO"
    },
    {
      "Code": "7003.KL",
      "Long Name": "Y&G Corporation Bhd.",
      "Name": "Y&G"
    },
    {
      "Code": "7086.KL",
      "Long Name": "AbleGroup Berhad",
      "Name": "ABLEGRP"
    },
    {
      "Code": "7113.KL",
      "Long Name": "Top Glove Corporation Bhd.",
      "Name": "TOPGLOV"
    },
    {
      "Code": "0351.KL",
      "Long Name": NaN,
      "Name": "LSH"
    },
    {
      "Code": "0346.KL",
      "Long Name": NaN,
      "Name": "SALIRAN"
    },
    {
      "Code": "0400GB.KL",
      "Long Name": NaN,
      "Name": "DIN045801028"
    },
    {
      "Code": "0347.KL",
      "Long Name": NaN,
      "Name": "DENGKIL"
    },
    {
      "Code": "5298.KL",
      "Long Name": "OM Holdings Limited",
      "Name": "OMH"
    },
    {
      "Code": "1163PA.KL",
      "Long Name": "Allianz Malaysia Berhad",
      "Name": "ALLIANZ-PA"
    },
    {
      "Code": "0348.KL",
      "Long Name": NaN,
      "Name": "CLITE"
    },
    {
      "Code": "0839EA.KL",
      "Long Name": NaN,
      "Name": "EQ8WAQF"
    },
    {
      "Code": "0820EA.KL",
      "Long Name": NaN,
      "Name": "FBMKLCI-EA"
    },
    {
      "Code": "03022.KL",
      "Long Name": NaN,
      "Name": "MCOM"
    },
    {
      "Code": "5099.KL",
      "Long Name": "Capital A Berhad",
      "Name": "CAPITALA"
    },
    {
      "Code": "8834.KL",
      "Long Name": "Ireka Corporation Berhad",
      "Name": "IREKA"
    },
    {
      "Code": "0094.KL",
      "Long Name": "Zen Tech International Berhad",
      "Name": "ZENTECH"
    },
    {
      "Code": "03029.KL",
      "Long Name": NaN,
      "Name": "GPP"
    },
    {
      "Code": "03002.KL",
      "Long Name": "JaGaSolution Berhad",
      "Name": "JAGAAPP"
    },
    {
      "Code": "03048.KL",
      "Long Name": "Carzo Holdings Berhad",
      "Name": "CARZO"
    },
    {
      "Code": "5218.KL",
      "Long Name": "Sapura Energy Berhad",
      "Name": "SAPNRG"
    },
    {
      "Code": "2283.KL",
      "Long Name": "Zelan Berhad",
      "Name": "ZELAN"
    },
    {
      "Code": "5170.KL",
      "Long Name": "Sarawak Cable Berhad",
      "Name": "SCABLE"
    },
    {
      "Code": "5115.KL",
      "Long Name": "Alam Maritim Resources Berhad",
      "Name": "ALAM"
    },
    {
      "Code": "7081.KL",
      "Long Name": "Pharmaniaga Berhad",
      "Name": "PHARMA"
    },
    {
      "Code": "6203.KL",
      "Long Name": "Khee San Berhad",
      "Name": "KHEESAN"
    },
    {
      "Code": "0800EA.KL",
      "Long Name": NaN,
      "Name": "ABFMY1"
    },
    {
      "Code": "0060.KL",
      "Long Name": "Harvest Miracle Capital Berhad",
      "Name": "HM"
    },
    {
      "Code": "0170.KL",
      "Long Name": "Kanger International Berhad",
      "Name": "KANGER"
    },
    {
      "Code": "0049.KL",
      "Long Name": "Oceancash Pacific Berhad",
      "Name": "OCNCASH"
    },
    {
      "Code": "5226.KL",
      "Long Name": "Gabungan AQRS Berhad",
      "Name": "GBGAQRS"
    },
    {
      "Code": "5231.KL",
      "Long Name": "PBS Berhad",
      "Name": "PBSB"
    },
    {
      "Code": "7854.KL",
      "Long Name": "Timberwell Berhad",
      "Name": "TIMWELL"
    },
    {
      "Code": "5066.KL",
      "Long Name": "NTPM Holdings Berhad",
      "Name": "NTPM"
    },
    {
      "Code": "0078.KL",
      "Long Name": "GDEX Berhad",
      "Name": "GDEX"
    },
    {
      "Code": "0211.KL",
      "Long Name": "Tashin Holdings Berhad",
      "Name": "TASHIN"
    },
    {
      "Code": "5207.KL",
      "Long Name": "SBC Corporation Berhad",
      "Name": "SBCCORP"
    },
    {
      "Code": "9148.KL",
      "Long Name": "Greater Bay Holdings Berhad",
      "Name": "GBAY"
    },
    {
      "Code": "1198.KL",
      "Long Name": "MAA Group Berhad",
      "Name": "MAA"
    },
    {
      "Code": "0305.KL",
      "Long Name": "Sin-Kung Logistics Berhad",
      "Name": "SINKUNG"
    },
    {
      "Code": "5107.KL",
      "Long Name": "IQ Group Holdings Berhad",
      "Name": "IQGROUP"
    },
    {
      "Code": "0113.KL",
      "Long Name": "MMS Ventures Berhad",
      "Name": "MMSV"
    },
    {
      "Code": "0829EB.KL",
      "Long Name": NaN,
      "Name": "CHINAETF-USD"
    },
    {
      "Code": "03017.KL",
      "Long Name": "Uni Wall APS Holdings Berhad",
      "Name": "UNIWALL"
    },
    {
      "Code": "9377.KL",
      "Long Name": "FSBM Holdings Berhad",
      "Name": "FSBM"
    },
    {
      "Code": "7043.KL",
      "Long Name": "Xin Synergy Group Berhad",
      "Name": "XIN"
    },
    {
      "Code": "5204.KL",
      "Long Name": "AwanBiru Technology Berhad",
      "Name": "AWANTEC"
    },
    {
      "Code": "7154.KL",
      "Long Name": "Classita Holdings Berhad",
      "Name": "CLASSITA"
    },
    {
      "Code": "5105.KL",
      "Long Name": "Can-One Berhad",
      "Name": "CANONE"
    },
    {
      "Code": "2607.KL",
      "Long Name": "Inch Kenneth Kajang Rubber Public Limited Company",
      "Name": "INCKEN"
    },
    {
      "Code": "4286.KL",
      "Long Name": "Seal Incorporated Berhad",
      "Name": "SEAL"
    },
    {
      "Code": "5095.KL",
      "Long Name": "HeveaBoard Berhad",
      "Name": "HEVEA"
    },
    {
      "Code": "0153.KL",
      "Long Name": "Oversea Enterprise Berhad",
      "Name": "OVERSEA"
    },
    {
      "Code": "5021.KL",
      "Long Name": "AYS Ventures Berhad",
      "Name": "AYS"
    },
    {
      "Code": "8605.KL",
      "Long Name": "Federal International Holdings Berhad",
      "Name": "FIHB"
    },
    {
      "Code": "0309.KL",
      "Long Name": "Agricore CS Holdings Berhad",
      "Name": "AGRICOR"
    },
    {
      "Code": "9016.KL",
      "Long Name": "Eksons Corporation Berhad",
      "Name": "EKSONS"
    },
    {
      "Code": "9741.KL",
      "Long Name": "Rohas Tecnic Berhad",
      "Name": "ROHAS"
    },
    {
      "Code": "1538.KL",
      "Long Name": "Symphony Life Berhad",
      "Name": "SYMLIFE"
    },
    {
      "Code": "9334.KL",
      "Long Name": "KESM Industries Berhad",
      "Name": "KESM"
    },
    {
      "Code": "1643.KL",
      "Long Name": "Landmarks Berhad",
      "Name": "LANDMRK"
    },
    {
      "Code": "5022.KL",
      "Long Name": "Paos Holdings Berhad",
      "Name": "PAOS"
    },
    {
      "Code": "9423.KL",
      "Long Name": "CWG Holdings Berhad",
      "Name": "CWG"
    },
    {
      "Code": "7117.KL",
      "Long Name": "CJ Century Logistics Holdings Berhad",
      "Name": "CJCEN"
    },
    {
      "Code": "2674.KL",
      "Long Name": "Alcom Group Berhad",
      "Name": "ALCOM"
    },
    {
      "Code": "9407.KL",
      "Long Name": "Paragon Union Berhad",
      "Name": "PARAGON"
    },
    {
      "Code": "3239.KL",
      "Long Name": "Berjaya Assets Berhad",
      "Name": "BJASSET"
    },
    {
      "Code": "7025.KL",
      "Long Name": "Woodlandor Holdings Berhad",
      "Name": "WOODLAN"
    },
    {
      "Code": "5009.KL",
      "Long Name": "White Horse Berhad",
      "Name": "WTHORSE"
    },
    {
      "Code": "5223.KL",
      "Long Name": "Mentiga Corporation Berhad",
      "Name": "MENTIGA"
    },
    {
      "Code": "7016.KL",
      "Long Name": "Chuan Huat Resources Berhad",
      "Name": "CHUAN"
    },
    {
      "Code": "7221.KL",
      "Long Name": "BSL Corporation Berhad",
      "Name": "BSLCORP"
    },
    {
      "Code": "7054.KL",
      "Long Name": "Astral Asia Berhad",
      "Name": "AASIA"
    },
    {
      "Code": "03060.KL",
      "Long Name": NaN,
      "Name": "HPI"
    },
    {
      "Code": "4219.KL",
      "Long Name": "Berjaya Land Berhad",
      "Name": "BJLAND"
    },
    {
      "Code": "0091.KL",
      "Long Name": NaN,
      "Name": "PGB"
    },
    {
      "Code": "9318.KL",
      "Long Name": "FITTERS Diversified Berhad",
      "Name": "FITTERS"
    },
    {
      "Code": "5157.KL",
      "Long Name": "SaudiGold Group Berhad",
      "Name": "SG"
    },
    {
      "Code": "7186.KL",
      "Long Name": "SWS Capital Berhad",
      "Name": "SWSCAP"
    },
    {
      "Code": "0275.KL",
      "Long Name": "Oppstar Berhad",
      "Name": "OPPSTAR"
    },
    {
      "Code": "9091.KL",
      "Long Name": "Emico Holdings Berhad",
      "Name": "EMICO"
    },
    {
      "Code": "0068.KL",
      "Long Name": "Asdion Berhad",
      "Name": "ASDION"
    },
    {
      "Code": "7803.KL",
      "Long Name": "Hextar Healthcare Berhad",
      "Name": "HEXCARE"
    },
    {
      "Code": "1589.KL",
      "Long Name": "Iskandar Waterfront City Berhad",
      "Name": "IWCITY"
    },
    {
      "Code": "9601.KL",
      "Long Name": "Ho Wah Genting Berhad",
      "Name": "HWGB"
    },
    {
      "Code": "7247.KL",
      "Long Name": "SCGM Bhd",
      "Name": "SCGM"
    },
    {
      "Code": "5283.KL",
      "Long Name": "Eco World International Berhad",
      "Name": "EWINT"
    },
    {
      "Code": "4456.KL",
      "Long Name": "Dagang NeXchange Berhad",
      "Name": "DNEX"
    },
    {
      "Code": "8141.KL",
      "Long Name": "Majuperak Holdings Berhad",
      "Name": "MJPERAK"
    },
    {
      "Code": "7226.KL",
      "Long Name": "Watta Holding Berhad",
      "Name": "WATTA"
    },
    {
      "Code": "0247.KL",
      "Long Name": "Unitrade Industries Berhad",
      "Name": "UNITRAD"
    },
    {
      "Code": "5665.KL",
      "Long Name": "Southern Steel Berhad",
      "Name": "SSTEEL"
    },
    {
      "Code": "8532.KL",
      "Long Name": "Pertama Digital Berhad",
      "Name": "PERTAMA"
    },
    {
      "Code": "0081.KL",
      "Long Name": "Rekatech Capital Berhad",
      "Name": "REKATECH"
    },
    {
      "Code": "5187.KL",
      "Long Name": "HB Global Limited",
      "Name": "HBGLOB"
    },
    {
      "Code": "0150.KL",
      "Long Name": "Fintec Global Berhad",
      "Name": "FINTEC"
    },
    {
      "Code": "5614.KL",
      "Long Name": "Nuenergy Holdings Berhad",
      "Name": "NHB"
    },
    {
      "Code": "5011.KL",
      "Long Name": "Mesiniaga Berhad",
      "Name": "MSNIAGA"
    },
    {
      "Code": "5104.KL",
      "Long Name": "Citra Nusa Holdings Berhad",
      "Name": "CNH"
    },
    {
      "Code": "0100.KL",
      "Long Name": "ES Ceramics Technology Berhad",
      "Name": "ESCERAM"
    },
    {
      "Code": "5253.KL",
      "Long Name": "Econpile Holdings Berhad",
      "Name": "ECONBHD"
    },
    {
      "Code": "7382.KL",
      "Long Name": "Golden Land Berhad",
      "Name": "GLBHD"
    },
    {
      "Code": "3573.KL",
      "Long Name": "Lien Hoe Corporation Berhad",
      "Name": "LIENHOE"
    },
    {
      "Code": "3158.KL",
      "Long Name": "YNH Property Bhd",
      "Name": "YNHPROP"
    },
    {
      "Code": "7076.KL",
      "Long Name": "CB Industrial Product Holding Berhad",
      "Name": "CBIP"
    },
    {
      "Code": "4375.KL",
      "Long Name": "South Malaysia Industries Berhad",
      "Name": "SMI"
    },
    {
      "Code": "7106.KL",
      "Long Name": "Supermax Corporation Berhad",
      "Name": "SUPERMX"
    },
    {
      "Code": "0156.KL",
      "Long Name": "ManagePay Systems Berhad",
      "Name": "MPAY"
    },
    {
      "Code": "9695.KL",
      "Long Name": "PLS Plantations Berhad",
      "Name": "PLS"
    },
    {
      "Code": "2682.KL",
      "Long Name": "Parkwood Holdings Berhad",
      "Name": "PARKWD"
    },
    {
      "Code": "7020.KL",
      "Long Name": "ASTEEL Group Berhad",
      "Name": "ASTEEL"
    },
    {
      "Code": "0332.KL",
      "Long Name": "Topvision Eye Specialist Berhad",
      "Name": "TOPVISN"
    },
    {
      "Code": "5156.KL",
      "Long Name": "XiDeLang Holdings Ltd",
      "Name": "XDL"
    },
    {
      "Code": "4464.KL",
      "Long Name": "Pegasus Heights Berhad",
      "Name": "PHB"
    },
    {
      "Code": "8044.KL",
      "Long Name": "Computer Forms (Malaysia) Berhad",
      "Name": "CFM"
    },
    {
      "Code": "3018.KL",
      "Long Name": "Olympia Industries Berhad",
      "Name": "OLYMPIA"
    },
    {
      "Code": "7130.KL",
      "Long Name": "Reneuco Berhad",
      "Name": "RENEUCO"
    },
    {
      "Code": "0136.KL",
      "Long Name": "Greenyield Berhad",
      "Name": "GREENYB"
    },
    {
      "Code": "0210.KL",
      "Long Name": "Kim Hin Joo (Malaysia) Berhad",
      "Name": "KHJB"
    },
    {
      "Code": "3883.KL",
      "Long Name": "Muda Holdings Berhad",
      "Name": "MUDA"
    },
    {
      "Code": "5797.KL",
      "Long Name": "Choo Bee Metal Industries Berhad",
      "Name": "CHOOBEE"
    },
    {
      "Code": "8885.KL",
      "Long Name": "Avillion Berhad",
      "Name": "AVI"
    },
    {
      "Code": "7036.KL",
      "Long Name": "Borneo Oil Berhad",
      "Name": "BORNOIL"
    },
    {
      "Code": "0118.KL",
      "Long Name": "Trive Property Group Berhad",
      "Name": "TRIVE"
    },
    {
      "Code": "7053.KL",
      "Long Name": "See Hup Consolidated Berhad",
      "Name": "SEEHUP"
    },
    {
      "Code": "5401.KL",
      "Long Name": "Tropicana Corporation Berhad",
      "Name": "TROP"
    },
    {
      "Code": "3247.KL",
      "Long Name": "GUH Holdings Berhad",
      "Name": "GUH"
    },
    {
      "Code": "6041.KL",
      "Long Name": "Farlim Group (Malaysia) Bhd.",
      "Name": "FARLIM"
    },
    {
      "Code": "0116.KL",
      "Long Name": "Focus Dynamics Group Berhad",
      "Name": "FOCUS"
    },
    {
      "Code": "8672.KL",
      "Long Name": "Kamdar Group (M) Berhad",
      "Name": "KAMDAR"
    },
    {
      "Code": "1902.KL",
      "Long Name": "Pinehill Pacific Berhad",
      "Name": "PINEPAC"
    },
    {
      "Code": "7163.KL",
      "Long Name": "PJBumi Berhad",
      "Name": "PJBUMI"
    },
    {
      "Code": "7018.KL",
      "Long Name": "CME Group Berhad",
      "Name": "CME"
    },
    {
      "Code": "0162.KL",
      "Long Name": "Widad Group Berhad",
      "Name": "WIDAD"
    },
    {
      "Code": "5081.KL",
      "Long Name": "Esthetics International Group Berhad",
      "Name": "EIG"
    },
    {
      "Code": "0050.KL",
      "Long Name": "Systech Bhd",
      "Name": "SYSTECH"
    },
    {
      "Code": "5622.KL",
      "Long Name": "Pimpinan Ehsan Berhad",
      "Name": "PEB"
    },
    {
      "Code": "0159.KL",
      "Long Name": "MMM Group Berhad",
      "Name": "MMM"
    },
    {
      "Code": "5016.KL",
      "Long Name": "Warisan TC Holdings Berhad",
      "Name": "WARISAN"
    },
    {
      "Code": "4243.KL",
      "Long Name": "W T K Holdings Berhad",
      "Name": "WTK"
    },
    {
      "Code": "7180.KL",
      "Long Name": "Sern Kou Resources Berhad",
      "Name": "SERNKOU"
    },
    {
      "Code": "7935.KL",
      "Long Name": "Milux Corporation Berhad",
      "Name": "MILUX"
    },
    {
      "Code": "7215.KL",
      "Long Name": "Ni Hsin Group Berhad",
      "Name": "NIHSIN"
    },
    {
      "Code": "7498.KL",
      "Long Name": "Ralco Corporation Berhad",
      "Name": "RALCO"
    },
    {
      "Code": "8877.KL",
      "Long Name": "Ekovest Berhad",
      "Name": "EKOVEST"
    },
    {
      "Code": "5267.KL",
      "Long Name": "Xin Hwa Holdings Berhad",
      "Name": "XINHWA"
    },
    {
      "Code": "0190.KL",
      "Long Name": "Eversafe Rubber Berhad",
      "Name": "ESAFE"
    },
    {
      "Code": "4596.KL",
      "Long Name": "Sapura Resources Berhad",
      "Name": "SAPRES"
    },
    {
      "Code": "7080.KL",
      "Long Name": "Permaju Industries Berhad",
      "Name": "PERMAJU"
    },
    {
      "Code": "0066.KL",
      "Long Name": "Vsolar Group Berhad",
      "Name": "VSOLAR"
    },
    {
      "Code": "2127.KL",
      "Long Name": "Comfort Gloves Berhad",
      "Name": "COMFORT"
    },
    {
      "Code": "5175.KL",
      "Long Name": "Ivory Properties Group Berhad",
      "Name": "IVORY"
    },
    {
      "Code": "7120.KL",
      "Long Name": "Axteria Group Berhad",
      "Name": "AXTERIA"
    },
    {
      "Code": "0837EA.KL",
      "Long Name": NaN,
      "Name": "AXJ-REITSETF"
    },
    {
      "Code": "0029.KL",
      "Long Name": "Digistar Corporation Berhad",
      "Name": "DIGISTA"
    },
    {
      "Code": "0187.KL",
      "Long Name": "BCM Alliance Berhad",
      "Name": "BCMALL"
    },
    {
      "Code": "0096.KL",
      "Long Name": "Nexgram Holdings Berhad",
      "Name": "NEXGRAM"
    },
    {
      "Code": "7149.KL",
      "Long Name": "Eng Kah Corporation Berhad",
      "Name": "ENGKAH"
    },
    {
      "Code": "0127.KL",
      "Long Name": "JHM Consolidation Berhad",
      "Name": "JHM"
    },
    {
      "Code": "0133.KL",
      "Long Name": "Sanichi Technology Berhad",
      "Name": "SANICHI"
    },
    {
      "Code": "7114.KL",
      "Long Name": "D'nonce Technology Bhd.",
      "Name": "DNONCE"
    },
    {
      "Code": "5657.KL",
      "Long Name": "Parkson Holdings Berhad",
      "Name": "PARKSON"
    },
    {
      "Code": "7209.KL",
      "Long Name": "Cheetah Holdings Berhad",
      "Name": "CHEETAH"
    },
    {
      "Code": "4405.KL",
      "Long Name": "Tan Chong Motor Holdings Berhad",
      "Name": "TCHONG"
    },
    {
      "Code": "0103.KL",
      "Long Name": "M N C Wireless Berhad",
      "Name": "MNC"
    },
    {
      "Code": "3204.KL",
      "Long Name": "George Kent (Malaysia) Berhad",
      "Name": "GKENT"
    },
    {
      "Code": "5436.KL",
      "Long Name": "Perusahaan Sadur Timah Malaysia (Perstima) Berhad",
      "Name": "PERSTIM"
    },
    {
      "Code": "5037.KL",
      "Long Name": "Compugates Holdings Berhad",
      "Name": "COMPUGT"
    },
    {
      "Code": "5184.KL",
      "Long Name": "Cypark Resources Berhad",
      "Name": "CYPARK"
    },
    {
      "Code": "4235.KL",
      "Long Name": "Lion Industries Corporation Berhad",
      "Name": "LIONIND"
    },
    {
      "Code": "0093.KL",
      "Long Name": "Solution Group Berhad",
      "Name": "SOLUTN"
    },
    {
      "Code": "7201.KL",
      "Long Name": "Progressive Impact Corporation Berhad",
      "Name": "PICORP"
    },
    {
      "Code": "5090.KL",
      "Long Name": "Media Chinese International Limited",
      "Name": "MEDIAC"
    },
    {
      "Code": "8966.KL",
      "Long Name": "Techbase Industries Berhad",
      "Name": "TECHBASE"
    },
    {
      "Code": "0085.KL",
      "Long Name": "Mlabs Systems Berhad",
      "Name": "MLAB"
    },
    {
      "Code": "3441.KL",
      "Long Name": "Johan Holdings Berhad",
      "Name": "JOHAN"
    },
    {
      "Code": "0829EA.KL",
      "Long Name": NaN,
      "Name": "CHINAETF-MYR"
    },
    {
      "Code": "5198.KL",
      "Long Name": "ABM Fujiya Berhad",
      "Name": "AFUJIYA"
    },
    {
      "Code": "0105.KL",
      "Long Name": "Asia Poly Holdings Berhad",
      "Name": "ASIAPLY"
    },
    {
      "Code": "0163.KL",
      "Long Name": "Careplus Group Berhad",
      "Name": "CAREPLS"
    },
    {
      "Code": "0333.KL",
      "Long Name": NaN,
      "Name": "VANZO"
    },
    {
      "Code": "0825EA.KL",
      "Long Name": NaN,
      "Name": "EQ8SID"
    },
    {
      "Code": "0280.KL",
      "Long Name": "MYMBN Berhad",
      "Name": "MBN"
    },
    {
      "Code": "0108.KL",
      "Long Name": "N2N Connect Berhad",
      "Name": "N2N"
    },
    {
      "Code": "5311.KL",
      "Long Name": "Cape EMS Berhad",
      "Name": "CEB"
    },
    {
      "Code": "7188.KL",
      "Long Name": "BTM Resources Berhad",
      "Name": "BTM"
    },
    {
      "Code": "0008.KL",
      "Long Name": "Willowglen MSC Berhad",
      "Name": "WILLOW"
    },
    {
      "Code": "9393.KL",
      "Long Name": "Industronics Berhad",
      "Name": "ITRONIC"
    },
    {
      "Code": "5256.KL",
      "Long Name": "Reach Energy Berhad",
      "Name": "REACH"
    },
    {
      "Code": "0165.KL",
      "Long Name": "XOX Berhad",
      "Name": "XOX"
    },
    {
      "Code": "5371.KL",
      "Long Name": "Kim Hin Industry Berhad",
      "Name": "KIMHIN"
    },
    {
      "Code": "5673.KL",
      "Long Name": "Jentayu Sustainables Berhad",
      "Name": "JSB"
    },
    {
      "Code": "6807.KL",
      "Long Name": "Puncak Niaga Holdings Berhad",
      "Name": "PUNCAK"
    },
    {
      "Code": "5197.KL",
      "Long Name": "Focus Lumber Berhad",
      "Name": "FLBHD"
    },
    {
      "Code": "9997.KL",
      "Long Name": "Pensonic Holdings Berhad",
      "Name": "PENSONI"
    },
    {
      "Code": "6297.KL",
      "Long Name": "Box-Pak (Malaysia) Bhd.",
      "Name": "BOXPAK"
    },
    {
      "Code": "03023.KL",
      "Long Name": "Smile-Link Healthcare Global Berhad",
      "Name": "SMILE"
    },
    {
      "Code": "7097.KL",
      "Long Name": "Ta Win Holdings Berhad",
      "Name": "TAWIN"
    },
    {
      "Code": "0070.KL",
      "Long Name": "MQ Technology Berhad",
      "Name": "MQTECH"
    },
    {
      "Code": "0200.KL",
      "Long Name": "Revenue Group Berhad",
      "Name": "REVENUE"
    },
    {
      "Code": "5284.KL",
      "Long Name": "Lotte Chemical Titan Holding Berhad",
      "Name": "LCTITAN"
    },
    {
      "Code": "7219.KL",
      "Long Name": "AIZO Group Berhad",
      "Name": "AIZO"
    },
    {
      "Code": "7139.KL",
      "Long Name": "Niche Capital Emas Holdings Berhad",
      "Name": "NICE"
    },
    {
      "Code": "03045.KL",
      "Long Name": NaN,
      "Name": "NP"
    },
    {
      "Code": "7218.KL",
      "Long Name": "Arka Berhad",
      "Name": "ARKA"
    },
    {
      "Code": "0120.KL",
      "Long Name": "Visdynamics Holdings Berhad",
      "Name": "VIS"
    },
    {
      "Code": "5281.KL",
      "Long Name": "Advancecon Holdings Berhad",
      "Name": "ADVCON"
    },
    {
      "Code": "5592.KL",
      "Long Name": "Grand Central Enterprises Bhd.",
      "Name": "GCE"
    },
    {
      "Code": "7240.KL",
      "Long Name": "Infraharta Holdings Berhad",
      "Name": "IHB"
    },
    {
      "Code": "0154.KL",
      "Long Name": "EA Holdings Berhad",
      "Name": "EAH"
    },
    {
      "Code": "0181.KL",
      "Long Name": "Aemulus Holdings Berhad",
      "Name": "AEMULUS"
    },
    {
      "Code": "0026.KL",
      "Long Name": "Nova MSC Berhad",
      "Name": "NOVAMSC"
    },
    {
      "Code": "7544.KL",
      "Long Name": "Quality Concrete Holdings Berhad",
      "Name": "QUALITY"
    },
    {
      "Code": "0025.KL",
      "Long Name": "YBS International Berhad",
      "Name": "YBS"
    },
    {
      "Code": "0267.KL",
      "Long Name": "ECA Integrated Solution Berhad",
      "Name": "ECA"
    },
    {
      "Code": "7055.KL",
      "Long Name": "PLB Engineering Berhad",
      "Name": "PLB"
    },
    {
      "Code": "0041.KL",
      "Long Name": "Hong Seng Consolidated Berhad",
      "Name": "HONGSENG"
    },
    {
      "Code": "7096.KL",
      "Long Name": "Joe Holding Berhad",
      "Name": "JOE"
    },
    {
      "Code": "0177.KL",
      "Long Name": "Pasukhas Group Berhad",
      "Name": "PASUKGB"
    },
    {
      "Code": "4944.KL",
      "Long Name": NaN,
      "Name": "NYLEX"
    },
    {
      "Code": "7676.KL",
      "Long Name": "G Capital Berhad",
      "Name": "GCAP"
    },
    {
      "Code": "5048.KL",
      "Long Name": "YB Ventures Berhad",
      "Name": "YB"
    },
    {
      "Code": "0178.KL",
      "Long Name": "Sedania Innovator Berhad",
      "Name": "SEDANIA"
    },
    {
      "Code": "1481.KL",
      "Long Name": "Advance Synergy Berhad",
      "Name": "ASB"
    },
    {
      "Code": "5025.KL",
      "Long Name": "Auro Holdings Berhad",
      "Name": "AURO"
    },
    {
      "Code": "9776.KL",
      "Long Name": "Sinmah Capital Berhad",
      "Name": "SMCAP"
    },
    {
      "Code": "8435.KL",
      "Long Name": "Concrete Engineering Products Berhad",
      "Name": "CEPCO"
    },
    {
      "Code": "7050.KL",
      "Long Name": "Wong Engineering Corporation Berhad",
      "Name": "WONG"
    },
    {
      "Code": "0006.KL",
      "Long Name": "Pineapple Resources Berhad",
      "Name": "PINEAPP"
    },
    {
      "Code": "0834EA.KL",
      "Long Name": NaN,
      "Name": "KLCI2XL"
    },
    {
      "Code": "6009.KL",
      "Long Name": "Pacific & Orient Berhad",
      "Name": "P&O"
    },
    {
      "Code": "3565.KL",
      "Long Name": "WCE Holdings Berhad",
      "Name": "WCEHB"
    },
    {
      "Code": "7239.KL",
      "Long Name": "Scanwolf Corporation Berhad",
      "Name": "SCNWOLF"
    },
    {
      "Code": "0048.KL",
      "Long Name": "Ancom Logistics Berhad",
      "Name": "ANCOMLB"
    },
    {
      "Code": "0824EA.KL",
      "Long Name": NaN,
      "Name": "EQ8MID"
    },
    {
      "Code": "0043.KL",
      "Long Name": "Metronic Global Berhad",
      "Name": "MTRONIC"
    },
    {
      "Code": "5649.KL",
      "Long Name": "Golden Pharos Berhad",
      "Name": "GPHAROS"
    },
    {
      "Code": "6637.KL",
      "Long Name": "PNE PCB Berhad",
      "Name": "PNEPCB"
    },
    {
      "Code": "0140.KL",
      "Long Name": "Xox Networks Berhad",
      "Name": "XOXNET"
    },
    {
      "Code": "7014.KL",
      "Long Name": "YLI Holdings Berhad",
      "Name": "YLI"
    },
    {
      "Code": "0092.KL",
      "Long Name": "mTouche Technology Berhad",
      "Name": "MTOUCHE"
    },
    {
      "Code": "0147.KL",
      "Long Name": "Innity Corporation Berhad",
      "Name": "INNITY"
    },
    {
      "Code": "8192.KL",
      "Long Name": "Mercury Industries Berhad",
      "Name": "MERCURY"
    },
    {
      "Code": "0155.KL",
      "Long Name": "Malaysian Genomics Resource Centre Berhad",
      "Name": "MGRC"
    },
    {
      "Code": "5136.KL",
      "Long Name": "Hextar Technologies Solutions Berhad",
      "Name": "HEXTECH"
    },
    {
      "Code": "0028.KL",
      "Long Name": "Scope Industries Berhad",
      "Name": "SCOPE"
    },
    {
      "Code": "03056.KL",
      "Long Name": NaN,
      "Name": "SAFETY"
    },
    {
      "Code": "7285.KL",
      "Long Name": "Tomypak Holdings Berhad",
      "Name": "TOMYPAK"
    },
    {
      "Code": "0074.KL",
      "Long Name": "Green Ocean Corporation Berhad",
      "Name": "GOCEAN"
    },
    {
      "Code": "7208.KL",
      "Long Name": "Euro Holdings Berhad",
      "Name": "EURO"
    },
    {
      "Code": "7315.KL",
      "Long Name": "AHB Holdings Berhad",
      "Name": "AHB"
    },
    {
      "Code": "0034.KL",
      "Long Name": "MMAG Holdings Berhad",
      "Name": "MMAG"
    },
    {
      "Code": "7986.KL",
      "Long Name": "CN Asia Corporation Bhd",
      "Name": "CNASIA"
    },
    {
      "Code": "0107.KL",
      "Long Name": "Eduspec Holdings Berhad",
      "Name": "EDUSPEC"
    },
    {
      "Code": "0109.KL",
      "Long Name": "SC Estate Builder Berhad",
      "Name": "SCBUILD"
    },
    {
      "Code": "6556.KL",
      "Long Name": "Ann Joo Resources Berhad",
      "Name": "ANNJOO"
    },
    {
      "Code": "8176.KL",
      "Long Name": "ATA IMS Berhad",
      "Name": "ATAIMS"
    },
    {
      "Code": "0182.KL",
      "Long Name": "LKL International Berhad",
      "Name": "LKL"
    },
    {
      "Code": "8338.KL",
      "Long Name": "Dataprep Holdings Bhd",
      "Name": "DATAPRP"
    },
    {
      "Code": "3891.KL",
      "Long Name": "Malayan United Industries Berhad",
      "Name": "MUIIND"
    },
    {
      "Code": "0188.KL",
      "Long Name": "HLT Global Berhad",
      "Name": "HLT"
    },
    {
      "Code": "9075.KL",
      "Long Name": "Theta Edge Berhad",
      "Name": "THETA"
    },
    {
      "Code": "0020.KL",
      "Long Name": "NetX Holdings Berhad",
      "Name": "NETX"
    },
    {
      "Code": "5079.KL",
      "Long Name": "One Glove Group Berhad",
      "Name": "ONEGLOVE"
    },
    {
      "Code": "7889.KL",
      "Long Name": "Thriven Global Berhad",
      "Name": "THRIVEN"
    },
    {
      "Code": "0122.KL",
      "Long Name": "Advance Information Marketing Berhad",
      "Name": "AIM"
    },
    {
      "Code": "4324.KL",
      "Long Name": "Hengyuan Refining Company Berhad",
      "Name": "HENGYUAN"
    },
    {
      "Code": "7123.KL",
      "Long Name": "Maxland Berhad",
      "Name": "MAXLAND"
    },
    {
      "Code": "0821EA.KL",
      "Long Name": NaN,
      "Name": "EQ8MY25"
    },
    {
      "Code": "03041.KL",
      "Long Name": NaN,
      "Name": "1TECH"
    },
    {
      "Code": "03009.KL",
      "Long Name": NaN,
      "Name": "SEERS"
    },
    {
      "Code": "0084.KL",
      "Long Name": "Fast Energy Holdings Berhad",
      "Name": "FAST"
    },
    {
      "Code": "0022.KL",
      "Long Name": "Parlo Berhad",
      "Name": "PARLO"
    },
    {
      "Code": "1287.KL",
      "Long Name": "Exsim Hospitality Berhad",
      "Name": "EXSIMHB"
    },
    {
      "Code": "7943.KL",
      "Long Name": "Mpire Global Berhad",
      "Name": "MPIRE"
    },
    {
      "Code": "0838EA.KL",
      "Long Name": NaN,
      "Name": "CHINA100-MYR"
    },
    {
      "Code": "7164.KL",
      "Long Name": "KNM Group Berhad",
      "Name": "KNM"
    },
    {
      "Code": "7146.KL",
      "Long Name": "AE Multi Holdings Berhad",
      "Name": "AEM"
    },
    {
      "Code": "7173.KL",
      "Long Name": "Toyo Ventures Holdings Berhad",
      "Name": "TOYOVEN"
    },
    {
      "Code": "5196.KL",
      "Long Name": "Berjaya Food Berhad",
      "Name": "BJFOOD"
    },
    {
      "Code": "03042.KL",
      "Long Name": NaN,
      "Name": "BVLH"
    },
    {
      "Code": "0038.KL",
      "Long Name": "Artroniq Berhad",
      "Name": "ARTRONIQ"
    },
    {
      "Code": "8923.KL",
      "Long Name": "Jiankun International Berhad",
      "Name": "JIANKUN"
    },
    {
      "Code": "0823EA.KL",
      "Long Name": NaN,
      "Name": "PAM-C50"
    },
    {
      "Code": "5188.KL",
      "Long Name": "China Ouhua Winery Holdings Limited",
      "Name": "CNOUHUA"
    },
    {
      "Code": "7017.KL",
      "Long Name": "Komarkcorp Berhad",
      "Name": "KOMARK"
    },
    {
      "Code": "7070.KL",
      "Long Name": "Vizione Holdings Berhad",
      "Name": "VIZIONE"
    },
    {
      "Code": "0179.KL",
      "Long Name": "Bioalpha Holdings Berhad",
      "Name": "BIOHLDG"
    },
    {
      "Code": "7243.KL",
      "Long Name": "Magma Group Berhad",
      "Name": "MAGMA"
    },
    {
      "Code": "2739.KL",
      "Long Name": "Techna-X Berhad",
      "Name": "TECHNAX"
    },
    {
      "Code": "5219.KL",
      "Long Name": "Pestec International Berhad",
      "Name": "PESTECH"
    },
    {
      "Code": "0283.KL",
      "Long Name": "DC Healthcare Holdings Berhad",
      "Name": "DCHCARE"
    },
    {
      "Code": "0082.KL",
      "Long Name": "Green Packet Berhad",
      "Name": "GPACKET"
    },
    {
      "Code": "0169.KL",
      "Long Name": "SMTrack Berhad",
      "Name": "SMTRACK"
    },
    {
      "Code": "7184.KL",
      "Long Name": "G3 Global Berhad",
      "Name": "G3"
    },
    {
      "Code": "0255.KL",
      "Long Name": "Ecoscience International Berhad",
      "Name": "EIB"
    },
    {
      "Code": "0007.KL",
      "Long Name": "PUC Berhad",
      "Name": "PUC"
    },
    {
      "Code": "9113.KL",
      "Long Name": "Iconic Worldwide Berhad",
      "Name": "ICONIC"
    },
    {
      "Code": "7223.KL",
      "Long Name": "Jadi Imaging Holdings Berhad",
      "Name": "JADI"
    },
    {
      "Code": "0174.KL",
      "Long Name": "Evd Berhad",
      "Name": "EVD"
    },
    {
      "Code": "4081.KL",
      "Long Name": "Pan Malaysia Corporation Berhad",
      "Name": "PMCORP"
    },
    {
      "Code": "8613.KL",
      "Long Name": "ENRA Group Berhad",
      "Name": "ENRA"
    },
    {
      "Code": "0072.KL",
      "Long Name": "Erdasan Group Berhad",
      "Name": "ERDASAN"
    },
    {
      "Code": "7192.KL",
      "Long Name": "GIIB Holdings Berhad",
      "Name": "GIIB"
    },
    {
      "Code": "0143.KL",
      "Long Name": "Key ASIC Berhad",
      "Name": "KEYASIC"
    },
    {
      "Code": "0132.KL",
      "Long Name": "Technodex Bhd",
      "Name": "TDEX"
    },
    {
      "Code": "0075.KL",
      "Long Name": "LYC Healthcare Berhad",
      "Name": "LYC"
    },
    {
      "Code": "0145.KL",
      "Long Name": "TFP Solutions Berhad",
      "Name": "TFP"
    },
    {
      "Code": "4634.KL",
      "Long Name": "Pos Malaysia Berhad",
      "Name": "POS"
    },
    {
      "Code": "03051.KL",
      "Long Name": "Alpha Ocean Resources Berhad",
      "Name": "AORB"
    },
    {
      "Code": "2259.KL",
      "Long Name": "Talam Transform Berhad",
      "Name": "TALAMT"
    },
    {
      "Code": "0183.KL",
      "Long Name": "Salutica Berhad",
      "Name": "SALUTE"
    },
    {
      "Code": "7168.KL",
      "Long Name": "PRG Holdings Berhad",
      "Name": "PRG"
    },
    {
      "Code": "7212.KL",
      "Long Name": "Destini Berhad",
      "Name": "DESTINI"
    },
    {
      "Code": "5040.KL",
      "Long Name": "Meridian Berhad",
      "Name": "MERIDIAN"
    },
    {
      "Code": "5270.KL",
      "Long Name": NaN,
      "Name": "RSENA"
    },
    {
      "Code": "0126.KL",
      "Long Name": "Microlink Solutions Berhad",
      "Name": "MICROLN"
    },
    {
      "Code": "5169.KL",
      "Long Name": "Ho Hup Construction Company Berhad",
      "Name": "HOHUP"
    },
    {
      "Code": "5568.KL",
      "Long Name": "APB Resources Berhad",
      "Name": "APB"
    },
    {
      "Code": "0059.KL",
      "Long Name": "Ecobuilt Holdings Berhad",
      "Name": "ECOHLDS"
    },
    {
      "Code": "03028.KL",
      "Long Name": "Go Innovate Asia Berhad",
      "Name": "GOINNO"
    },
    {
      "Code": "5172.KL",
      "Long Name": "Sinaran Advance Group Berhad",
      "Name": "SINARAN"
    },
    {
      "Code": "03001.KL",
      "Long Name": "Cloudaron Group Berhad",
      "Name": "CLOUD"
    },
    {
      "Code": "5213.KL",
      "Long Name": "Sentoria Group Berhad",
      "Name": "SNTORIA"
    },
    {
      "Code": "03021.KL",
      "Long Name": "Equitiestracker Holdings Berhad",
      "Name": "ETH"
    },
    {
      "Code": "2186.KL",
      "Long Name": "Kuchai Development Berhad",
      "Name": "KUCHAI"
    },
    {
      "Code": "7253.KL",
      "Long Name": "Handal Energy Berhad",
      "Name": "HANDAL"
    },
    {
      "Code": "03033.KL",
      "Long Name": "Supergenics Berhad",
      "Name": "SGBHD"
    },
    {
      "Code": "0036.KL",
      "Long Name": "Key Alliance Group Berhad",
      "Name": "KGROUP"
    },
    {
      "Code": "9008.KL",
      "Long Name": "Omesti Berhad",
      "Name": "OMESTI"
    },
    {
      "Code": "0152.KL",
      "Long Name": "DGB Asia Berhad",
      "Name": "DGB"
    },
    {
      "Code": "7145.KL",
      "Long Name": "Txcd Berhad",
      "Name": "TXCD"
    }
  ]

  const [isLoading, setIsLoading] = useState(false);

  const getOptionLabel = (option) =>
    option ? `${option.Code} - ${option['Long Name']} ` : "";
 
  const filterOptions = (options, { inputValue }) => {
    if (!Array.isArray(options)) return [];

    return options.filter((option) => {
      const code = option.Code || "";
      const name = option.Name || "";
      const longName = option["Long Name"] || "";

      return (
        code.toLowerCase().includes(inputValue.toLowerCase()) ||
        name.toLowerCase().includes(inputValue.toLowerCase()) ||
        longName.toLowerCase().includes(inputValue.toLowerCase())
      );
    });
  };

  return (
    <Box 
    sx={{
      display: 'flex',
      alignItems: 'center',
      borderRadius: '999px',

    }}>
      <Autocomplete
        options={companies}
        loading={isLoading}
        getOptionLabel={getOptionLabel}
        filterOptions={filterOptions}
        value={selectedCompany}
        onChange={(event, value) => onSelect(value)}
        componentsProps={{
          popupIndicator: {
            sx: {
              display: 'none',
            },
          },
          clearIndicator: {
            sx: {
              visibility: 'visible',
            },
          },
        }}
    
        
        renderInput={(params) => (
          <TextField
          {...params}
          variant="outlined"
          placeholder="Search..."
          InputProps={{
            ...params.InputProps,
            sx: {
              // Apply to input container (MuiOutlinedInput-root)
              padding: 0,
              width: {
                xs: '180px',   // 👈 small screen
                sm: '300px',   // 👈 tablet & up
              },
              height: {
                xs: '32px',  // 🔹 for mobile (≤600px)
                sm: '40px',  // 🔸 for larger screens
              },
              display: 'flex',
              alignItems: 'center',
              borderRadius: '999px 0 0 999px',
              backgroundColor: '#fff',
           
              '& .MuiOutlinedInput-notchedOutline .MuiFormControl-root': {
                borderColor: '#ccc', // default subtle border
              },
              '&:hover .MuiOutlinedInput-notchedOutline .MuiFormControl-root': {
                borderColor: '#a4c0e3', // soft blue on hover
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#a4c0e3', // your desired focus border color
                  boxShadow: '0 0 0 2px rgba(226, 229, 236, 0.2)', // soft glow if you want
                },


              '& input': {
                padding: '0 0px !important', // overrides internal input spacing
                fontSize: '14px',
                height: '100%',
                minWidth: 0, // Allows flexibility inside flexbox
                border: 'none',
                boxShadow: 'none',
              },
              '&:hover input ': {
                border: 'none',
                boxShadow: 'none',
              },
              '&:focus-within input ': {
                border: 'none',
                boxShadow: 'none',
              },
            },
          }}
        />
          
        )}
      />

    <Button
      variant="contained"
      onClick={() => onSearchClick(selectedCompany)}
      sx={{
        height: {
          xs: '32px',  // ✅ smaller than before
          sm: '40px',
        },
        width: {
          xs: '32px',
          sm: '40px',
        },
        minWidth: 0,
        padding:0,
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '0 999px 999px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
          backgroundColor: '#0056b3',
        },
      }}
    >
      <span
        className="material-symbols-outlined"
        style={{ fontSize: '20px' }} // ✅ make icon smaller if needed
      >
        search
      </span>
    </Button>
    </Box>
  );
}