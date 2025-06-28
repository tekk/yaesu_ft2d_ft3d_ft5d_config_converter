# 📻 Yaesu [FT2D](https://www.rigpix.com/yaesu/ft2dr.htm)/[FT3D](https://www.rigpix.com/yaesu/ft3dr.htm)/[FT5D](https://www.rigpix.com/yaesu/ft5dr.htm) Memory Channel CSV Configuration Converter

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Version](https://img.shields.io/badge/Version-converter--beta--1-blue.svg)](https://github.com/tekk)
[![Amateur Radio](https://img.shields.io/badge/Amateur%20Radio-OM7TEK-green.svg)](https://www.om7tek.com)
[![GitHub](https://img.shields.io/github/v/release/tekk/yaesu_ft2d_ft3d_ft5d_config_converter?include_prereleases)](https://github.com/tekk/yaesu_ft2d_ft3d_ft5d_config_converter/releases)


[![Yaesu](./img/yaesu-logo.png)](https://www.yaesu.com/)

[![OM7TEK](./img/OM7TEK-logo.png)](https://www.om7tek.com/)



A powerful **free web-based CSV memory channel converter** for Yaesu digital amateur radio transceivers. Seamlessly convert and migrate memory channel configurations between **[FT2D](https://www.rigpix.com/yaesu/ft2dr.htm)**, **[FT3D](https://www.rigpix.com/yaesu/ft3dr.htm)**, and **[FT5D](https://www.rigpix.com/yaesu/ft5dr.htm)** ham radio transceivers using ADMS programming software exports.

**🌍 Supported Models**: Both US and European versions including FT2D, FT2DE, FT2DR, FT3D, FT3DE, FT3DR, FT5D, FT5DE, and FT5DR variants. Compatible with ADMS-8, ADMS-11, and ADMS-14 software exports.

> **🔍 Meta Description**: Free online Yaesu FT2D FT3D FT5D memory channel CSV converter. Convert amateur radio configurations between models. No installation required. Compatible with ADMS software. Web-based ham radio programming tool by OM7TEK.

## 🎯 Overview

As an active amateur radio operator (**OM7TEK**), I created this tool to solve a common problem in the ham radio community: **incompatible CSV memory channel formats** between different Yaesu transceiver models. Whether you're upgrading from an **[FT2D](https://www.rigpix.com/yaesu/ft2dr.htm) to [FT3D](https://www.rigpix.com/yaesu/ft3dr.htm)**, migrating to the newer **[FT5D](https://www.rigpix.com/yaesu/ft5dr.htm)**, or helping fellow hams with their configurations, this converter handles the technical complexities automatically.

### 🔧 Key Features

- **🔄 Bidirectional Conversion**: Convert between any combination of [FT2D](https://www.rigpix.com/yaesu/ft2dr.htm) ↔ [FT3D](https://www.rigpix.com/yaesu/ft3dr.htm) ↔ [FT5D](https://www.rigpix.com/yaesu/ft5dr.htm)
- **🎯 Precise Field Mapping**: All 48-53 CSV fields are properly mapped and converted
- **🧠 Intelligent Format Detection**: Automatically detects source CSV format
- **⚡ Real-time Processing**: Instant conversion with detailed logging
- **🌐 Web-based Interface**: No software installation required
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices
- **🔒 Privacy First**: All processing happens locally in your browser
- **🎨 Modern UI**: Beautiful, intuitive interface with visual conversion flow

## 🚀 Quick Start

### Online Version
Visit the live converter:
- Main site [🌐 **https://yaesu-converter.om7tek.com**](https://yaesu-converter.om7tek.com/)
- If the link doesn't work for any reason, please try [Github Pages latest release](https://tekk.github.io/yaesu_ft2d_ft3d_ft5d_config_converter/)

## 🖼️ Preview

![Preview](./img/screenshot.png)

## 📋 Usage Instructions

### Step 1: Extract CSV File from Your Source Transceiver

#### 🔧 Required Programming Software

<a name="adms-downloads"></a>
### ADMS Downloads

Download the official Yaesu ADMS programming software suites (all of these are from [archive.org](https://archive.org))

**For [FT2D](https://www.rigpix.com/yaesu/ft2dr.htm)/FT2DE/FT2DR:**
- Software: **[ADMS-8](https://archive.org/details/FT2D_ADMS-8_EXP)**

**For [FT3D](https://www.rigpix.com/yaesu/ft3dr.htm)/FT3DE/FT3DR:**
- Software: **[ADMS-11](https://archive.org/details/FT3D_ADMS-11_ENG)**

**For [FT5D](https://www.rigpix.com/yaesu/ft5dr.htm)/FT5DE/FT5DR:**
- Software: **[ADMS-14](https://archive.org/details/yaesu_FT5D_ADMS-14_ENG)**

#### 📱 Method 1: Using microSD Card (Recommended - No Cable Required)

**All three transceivers support microSD card data transfer:**

1. **Backup Radio to SD Card**:
   - Insert microSD card into your transceiver (max 32GB, Class 4-10)
   - **FT2D**: Long press **[DISP]** → **SD Card** → **BACKUP** → **Write to SD** → **OK**
   - **FT3D**: Long press **[DISP]** → **SD Card** → **BACKUP** → **Write to SD** → **OK**  
   - **FT5D**: Long press **[F Menu]** → **SD Card** → **BACKUP** → **Write to SD** → **OK**
   - Wait for "COMPLETED" message

2. **Import Backup to ADMS**:
   - Remove microSD and insert into PC card reader
   - Launch appropriate ADMS software on your PC
   - **Communications** → **Get Data from SD Card**
   - Navigate to backup file (`BACKUP.DAT` in FT2D/FT3D/FT5D folder)
   - Click **Open** to import your radio's configuration

3. **Export Memory Channels to CSV**:
   - In ADMS software: Click **Memories** tab to view memory channels
   - **File** → **Export** → **CSV Format**
   - Choose destination folder and filename (e.g., `my_FT2D_memories.csv`)
   - Click **Save** to export your memory channels as CSV file

#### 🔌 Alternative method 2: Using USB Programming Cable

**Required Cable:**
- **SCU-19** USB programming cable (included in SCU-39 WIRES-X kit)

1. **Install Programming Software & Drivers**: 
   - Download and install appropriate ADMS software, see [ADMS Downloads](#adms-downloads).
   - Install SCU-19 USB drivers (included with software download)

2. **Connect Transceiver to PC**: 
   - Connect SCU-19 cable between transceiver data port and PC USB
   - Power on your transceiver in normal mode

3. **Read Data from Transceiver**:
   - Launch ADMS software on your PC
   - **Communications** → **Get Data from Radio**
   - Wait for data transfer to complete (progress bar will show status)

4. **Export Memory Channels to CSV**:
   - Click **Memories** tab to view memory channels
   - **File** → **Export** → **CSV Format**
   - Choose destination folder and filename
   - Click **Save** to export your memory channels as CSV file

### Step 2: Use This Web Converter

#### 🎯 Select Source Transceiver Type
Choose your **source transceiver model** (the format you're converting FROM):
- **[FT2D](https://www.rigpix.com/yaesu/ft2dr.htm)**: Yaesu FT2D/FT2DE/FT2DR dual band digital transceiver ([💾 sample CSV](sample_csv/FT2D.csv))
- **[FT3D](https://www.rigpix.com/yaesu/ft3dr.htm)**: Yaesu FT3D/FT3DE/FT3DR tri-band digital transceiver ([💾 sample CSV](sample_csv/FT3D.csv))
- **[FT5D](https://www.rigpix.com/yaesu/ft5dr.htm)**: Yaesu FT5D/FT5DE/FT5DR tri-band digital transceiver ([💾 sample CSV](sample_csv/FT5D.csv))

#### 🎯 Select Destination Transceiver
Choose your **destination transceiver model** (the format you're converting TO):
- The interface prevents selecting the same model for source and destination
- Visual indicators show the conversion direction with a large yellow arrow

#### 📁 Upload CSV File
- **Drag & drop** your exported CSV file onto the upload area, or
- **Click** to browse and select your memory channel CSV export
- Supported file types: `.csv` files exported from Yaesu ADMS programming software

#### ⚡ Convert & Download
- Click the **"CONVERT!"** button to process your file
- The converted CSV will be automatically downloaded
- File will be named with destination format (e.g., `converted_FT5D_format.csv`)

### Step 3: Import to Destination Transceiver

#### 📥 Load Converted CSV into Destination Transceiver

**Using microSD Card Method:**

1. **Save to ADMS**: After importing CSV, use **File** → **Save As** to save configuration

2. **Export to SD Card**:
   - **Communications** → **Send Data to SD Card** → **ALL**
   - Select microSD card drive and save

3. **Load in Transceiver**:
   - Insert microSD into destination transceiver
   - **Setup Menu** → **BACKUP** → **READ FROM SD**
   - Select your saved configuration file

**Using Programming Software:**

1. **Launch Destination ADMS Software**: 
   - Start the appropriate ADMS software for your destination transceiver
   - **[ADMS-8](https://archive.org/details/FT2D_ADMS-8_EXP)** for [FT2D](https://www.rigpix.com/yaesu/ft2dr.htm), **[ADMS-11](https://archive.org/details/FT3D_ADMS-11_ENG)** for [FT3D](https://www.rigpix.com/yaesu/ft3dr.htm), **[ADMS-14](https://archive.org/details/yaesu_FT5D_ADMS-14_ENG)** for [FT5D](https://www.rigpix.com/yaesu/ft5dr.htm) (all from archive.org), as already noted in [ADMS Downloads](#adms-downloads) section.

2. **Create New Configuration**:
   - **File** → **New** (to create a blank template)
   - Or **File** → **Open** (if you have an existing configuration)

3. **Import Converted CSV**:
   - **File** → **Import** → **CSV Format**
   - Select your converted CSV file
   - Click **Open** to import the memory channels

4. **Verify Data**: 
   - Review imported channels in the **Memories** tab
   - Check frequencies, names, and settings are correct
   - Make any necessary adjustments

5. **Transfer to Transceiver**:
   - Connect destination transceiver with appropriate cable
   - **Communications** → **Send Data to Radio**
   - Wait for transfer completion
   - Disconnect cable and restart transceiver

#### ✅ Verification Steps

1. **Check Memory Channels**: Verify a few key channels have correct frequencies
2. **Test Transmission**: Ensure power levels and modes are properly set
3. **Validate Names**: Confirm alpha tags/channel names transferred correctly
4. **Backup Configuration**: Create a backup of your new configuration

**🎉 Congratulations!** Your memory channels have been successfully converted and loaded into your destination transceiver.

## 🔧 Technical Specifications

### Supported Models & Formats

| Model | CSV Fields | Digital Modes | Memory Channels | Notes |
|-------|------------|---------------|-----------------|-------|
| **[FT2D](https://www.rigpix.com/yaesu/ft2dr.htm)** | 48 fields | C4FM, FM, AM | 900 | Original dual-band format |
| **[FT3D](https://www.rigpix.com/yaesu/ft3dr.htm)** | 53 fields | C4FM, FM, AM, DN, AMS | 900 | Enhanced tri-band format |
| **[FT5D](https://www.rigpix.com/yaesu/ft5dr.htm)** | 53 fields | C4FM, FM, AM, DN, AMS | 900 | Latest tri-band format |

### Field Mapping Details

#### The converter handles **precise mapping** of all critical fields:

- **🔢 Channel Numbers**: Preserved across all formats
- **📡 Frequencies**: RX/TX frequencies with proper validation
- **🎵 CTCSS/DCS**: Tone and DCS code conversion
- **⚡ Power Levels**: HIGH/LOW1/LOW2/LOW3 mapping
- **📶 Step Sizes**: 5.0KHz to 100KHz frequency steps
- **🎯 Band Flags**: VHF/UHF automatic detection
- **📝 Alpha Tags**: Memory channel names preserved
- **🔧 Mode Settings**: NFM/NAM ([FT2D](https://www.rigpix.com/yaesu/ft2dr.htm)) ↔ FM/AM ([FT3D](https://www.rigpix.com/yaesu/ft3dr.htm)/[FT5D](https://www.rigpix.com/yaesu/ft5dr.htm))

### Browser Compatibility

- ✅ **Chrome** 90+ (Recommended)
- ✅ **Firefox** 88+
- ✅ **Safari** 14+
- ✅ **Edge** 90+
- ⚠️ **Internet Explorer**: Not supported, and never will be

## 🛠️ Development

### Architecture
- **Frontend**: Pure HTML5 & CSS3 + JavaScript (ES6+)
- **Framework**: Bootstrap 5.3.0 for responsive UI
- **Fonts**: Custom Nerd Fonts and Material Symbols for icons
- **Processing**: Client-side JavaScript parsing and conversion

## 🔍 SEO Keywords & Tags

### **Primary Keywords:**
`yaesu ft2d ft3d ft5d converter` `amateur radio programming software` `ham radio memory channel converter` `csv converter yaesu` `ft2d ft3d ft5d configuration` `yaesu adms converter` `system fusion programming` `c4fm memory channels`

### **Amateur Radio Keywords:**
**Yaesu Models**: [FT2D](https://www.rigpix.com/yaesu/ft2dr.htm), [FT3D](https://www.rigpix.com/yaesu/ft3dr.htm), [FT5D](https://www.rigpix.com/yaesu/ft5dr.htm), FT2DE, FT2DR, FT3DE, FT3DR, FT5DE, FT5DR, FT-2D, FT-3D, FT-5D

**Radio Technology**: ham radio, amateur radio, digital transceiver, C4FM, System Fusion, WIRES-X, dual band, tri-band, handheld transceiver, HT programming, repeater programming

**Programming**: memory channel programming, frequency management, radio configuration, transceiver setup, ADMS software, SCU-19 cable, microSD programming, backup restore

### **Technical Keywords:**
**File Formats**: CSV converter, memory channel CSV, ADMS export, backup.dat, configuration file, frequency list, repeater database

**Software**: radio programming software, ham radio tools, web-based converter, browser tool, no installation required, free amateur radio software

**Compatibility**: ADMS-8, ADMS-11, ADMS-14, RT Systems compatible, cross-platform, Windows Mac Linux, mobile responsive

## 🤝 Contributing

Fellow hams, you are welcome to contribute! This project benefits the entire **amateur radio community**.
I've made it free and open for everyone with **HAM SPIRIT** in mind! ❤️

### How to Contribute:
1. **🐛 Report Bugs**: [Open an issue](https://github.com/tekk/yaesu_ft2d_ft3d_ft5d_config_converter/issues) with details
2. **💡 Feature Requests**: Suggest improvements for other Yaesu models
3. **🔧 Code Contributions**: Submit pull requests with enhancements
4. **📖 Documentation**: Help improve instructions and examples

### Planned Features:
- 📻 **Additional Models**: FT70D, FT25/FT65 series support
- 📊 **Validation**: Enhanced CSV validation and error reporting
- 💾 **Backup**: Configuration backup and restore functionality
- 🌍 **Localization**: Multi-language support for international hams

Help needed! Please contact me.

## 📞 Support & Contact

**OM7TEK - Peter Javorsky**
- 🌐 **Website**: [om7tek.com](https://www.om7tek.com)
- 👤 **Portfolio**: [tekk.eu](https://tekk.eu)
- 💻 **GitHub**: [@tekk](https://github.com/tekk) 
- 📧 **Email**: tekk.sk@gmail.com
- 📻 **QRZ**: [OM7TEK](https://www.qrz.com/db/OM7TEK)

## 📜 License

This project is licensed under the **GNU General Public License v3.0**.

```
Copyright (c) 2025 Ing. Peter Javorsky (OM7TEK)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
```

See [LICENSE](LICENSE) file for complete terms.

## ⚡ Disclaimer

This software is provided **"AS IS"** without warranty. Always **backup your original configurations** before conversion. Test converted files in programming software before uploading to your transceiver.

📻 73, Peter "Tekk" OM7TEK

---

### 🏷️ GitHub Tags & Topics
`yaesu` `ft2d` `ft3d` `ft5d` `amateur-radio` `ham-radio` `c4fm` `system-fusion` `csv-converter` `memory-channels` `adms` `programming-software` `radio-programming` `transceiver` `handheld-radio` `repeater` `frequency-management` `backup-restore` `microsd` `scu-19` `wires-x` `digital-radio` `dual-band` `tri-band` `om7tek` `yaesu-programming` `radio-configuration` `free-software` `web-tool` `no-installation` `cross-platform` `mobile-friendly` `browser-based` `javascript` `html5` `bootstrap` `responsive-design`

### 🔖 Social Media Hashtags
`#YaesuFT2D` `#YaesuFT3D` `#YaesuFT5D` `#AmateurRadio` `#HamRadio` `#C4FM` `#SystemFusion` `#CSV` `#MemoryChannels` `#OM7TEK` `#YaesuProgramming` `#RadioSoftware` `#HamRadioSoftware` `#DigitalRadio` `#WIRESXS` `#RadioProgramming` `#FreeHamSoftware` `#WebTool` `#NoInstall` `#CrossPlatform`
