/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

    Copyright (c) 2025, 
    Author: Ing. Peter Javorsky
    Email: tekk.sk@gmail.com
    Website: https://tekk.eu
    GitHub: @tekk (https://github.com/tekk)
    License: GNU GPL v3.0
*/

// Yaesu FT2D/FT3D/FT5D Configuration Converter
// Handles conversion between the three transceiver CSV formats

class YaesuConverter {
    constructor() {
        this.sourceData = null;
        this.sourceFormat = null;
        this.conversionLog = [];
    }

    // Detect CSV format based on structure and content
    detectFormat(csvData) {
        const lines = csvData.trim().split('\n');
        if (lines.length < 2) {
            throw new Error('Invalid CSV file - insufficient data');
        }

        const firstLine = lines[0]; // Use first line to check structure
        const fields = this.parseCSVLine(firstLine);
        
        // FT2D has around 48 fields, FT3D/FT5D have around 53 fields
        if (fields.length >= 45 && fields.length <= 50) {
            // Check for FT2D-specific structure
            // Look for NFM/NAM in mode field position (field 6)
            if (lines.length > 1) {
                const dataLine = this.parseCSVLine(lines[1]);
                if (dataLine[6] && (dataLine[6].includes('NFM') || dataLine[6].includes('NAM'))) {
                    return 'FT2D';
                }
            }
            return 'FT2D';
        }
        
        // FT3D/FT5D have more fields and different structure
        if (fields.length >= 50 && fields.length <= 55) {
            // Check for ON/OFF in enabled field (field 1)
            if (lines.length > 1) {
                const dataLine = this.parseCSVLine(lines[1]);
                if (dataLine[1] && (dataLine[1] === 'ON' || dataLine[1] === 'OFF')) {
                    return 'FT3D'; // Treat FT5D same as FT3D
                }
            }
            return 'FT3D';
        }

        throw new Error('Unable to detect CSV format. Please ensure this is a valid FT2D, FT3D, or FT5D CSV file.');
    }

    // Parse a CSV line handling quoted fields
    parseCSVLine(line) {
        const fields = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                fields.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        fields.push(current.trim());
        return fields;
    }

    // Convert FT2D record to standardized format (complete mapping)
    convertFromFT2D(fields) {
        return {
            channel: fields[0] || '',
            skip: fields[1] || '0',
            rxFreq: fields[2] || '',
            txFreq: fields[3] || '',
            offset: fields[4] || '0',
            offsetDir: fields[5] || 'OFF',
            mode: this.mapMode(fields[6] || 'NFM', 'FT2D'),
            name: fields[7] || '',
            toneMode: fields[8] || 'OFF',
            toneFreq: fields[9] || '67.0 Hz',
            dcsCode: fields[10] || '023',
            rxSettings: fields[11] || 'RX Normal TX Normal',
            audioFilter: fields[12] || '1600 Hz',
            power: this.mapPower(fields[13] || 'HIGH', 'FT2D'),
            scanMode: fields[14] || 'OFF',
            step: this.mapStep(fields[15] || '12.5KHz', 'FT2D'),
            field16: fields[16] || '0',
            field17: fields[17] || '0',
            field18: fields[18] || 'OFF',
            field19: fields[19] || 'OFF',
            field20: fields[20] || 'OFF',
            field21: fields[21] || '1',
            field22: fields[22] || '0',
            field23: fields[23] || '1',
            field24: fields[24] || '0',
            field25: fields[25] || '0',
            field26: fields[26] || '0',
            field27: fields[27] || '0',
            field28: fields[28] || '0',
            field29: fields[29] || '0',
            field30: fields[30] || '0',
            field31: fields[31] || '0',
            field32: fields[32] || '0',
            field33: fields[33] || '0',
            field34: fields[34] || '0',
            field35: fields[35] || '0',
            field36: fields[36] || '0',
            field37: fields[37] || '0',
            field38: fields[38] || '0',
            field39: fields[39] || '0',
            field40: fields[40] || '0',
            comment: fields[45] || '',
            status: fields[46] || '1',
            finalField: fields[47] || ''
        };
    }

    // Convert FT3D/FT5D record to standardized format (complete mapping)
    convertFromFT3D(fields) {
        return {
            channel: fields[0] || '',
            enabled: fields[1] || 'OFF',
            rxFreq: fields[2] || '',
            txFreq: fields[3] || '',
            offset: fields[4] || '0',
            offsetDir: fields[5] || 'OFF',
            txEnabled: fields[6] || 'ON',
            rxMode: this.mapMode(fields[7] || 'FM', 'FT3D'),
            txMode: this.mapMode(fields[8] || 'FM', 'FT3D'),
            digitalEnabled: fields[9] || 'ON',
            name: fields[10] || '',
            toneMode: fields[11] || 'OFF',
            toneFreq: fields[12] || '88.5 Hz',
            dcsCode: fields[13] || '023',
            rxSettings: fields[14] || 'RX Normal TX Normal',
            audioFilter: fields[15] || '1600 Hz',
            rxDgId: fields[16] || 'RX 00',
            txDgId: fields[17] || 'TX 00',
            power: this.mapPower(fields[18] || 'High (5W)', 'FT3D'),
            scanMode: fields[19] || 'OFF',
            field20: fields[20] || 'ON',
            step: fields[21] || '12.5KHz',
            field22: fields[22] || 'OFF',
            field23: fields[23] || 'OFF',
            field24: fields[24] || 'OFF',
            field25: fields[25] || 'OFF',
            field26: fields[26] || 'OFF',
            field27: fields[27] || 'OFF',
            field28: fields[28] || 'ON',
            field29: fields[29] || 'OFF',
            field30: fields[30] || 'OFF',
            field31: fields[31] || 'OFF',
            field32: fields[32] || 'OFF',
            field33: fields[33] || 'OFF',
            field34: fields[34] || 'OFF',
            field35: fields[35] || 'OFF',
            field36: fields[36] || 'OFF',
            field37: fields[37] || 'OFF',
            field38: fields[38] || 'OFF',
            field39: fields[39] || 'OFF',
            field40: fields[40] || 'OFF',
            field41: fields[41] || 'OFF',
            field42: fields[42] || 'OFF',
            field43: fields[43] || 'OFF',
            field44: fields[44] || 'OFF',
            field45: fields[45] || 'OFF',
            field46: fields[46] || 'OFF',
            field47: fields[47] || 'OFF',
            field48: fields[48] || 'OFF',
            field49: fields[49] || 'OFF',
            comment: fields[50] || '',
            status: fields[51] || '0',
            finalField: fields[52] || ''
        };
    }

    // Convert standardized format to FT2D (complete mapping)
    convertToFT2D(record) {
        const fields = new Array(48).fill('');
        
        fields[0] = record.channel;
        fields[1] = this.mapFieldFromFT3DToFT2D('skip', record.enabled || record.skip || '0');
        fields[2] = record.rxFreq;
        fields[3] = record.txFreq || record.rxFreq;
        fields[4] = record.offset || '0';
        fields[5] = record.offsetDir || 'OFF';
        fields[6] = this.mapMode(record.rxMode || record.mode || 'FM', null, 'FT2D');
        fields[7] = record.name || '';
        fields[8] = record.toneMode || 'OFF';
        fields[9] = record.toneFreq || '67.0 Hz';
        fields[10] = record.dcsCode || '023';
        fields[11] = record.rxSettings || 'RX Normal TX Normal';
        fields[12] = record.audioFilter || '1600 Hz';
        fields[13] = this.mapPower(record.power || 'HIGH', null, 'FT2D');
        fields[14] = record.scanMode || 'OFF';
        fields[15] = this.mapStep(record.step || '12.5KHz', null, 'FT2D');
        fields[16] = record.field16 || '0';
        fields[17] = record.field17 || '0';
        fields[18] = record.field18 || 'OFF';
        fields[19] = record.field19 || 'OFF';
        fields[20] = record.field20 || 'OFF';
        fields[21] = record.field21 || this.mapVhfUhfFlag(record.rxFreq, 'FT2D');
        fields[22] = record.field22 || '0';
        fields[23] = record.field23 || '1';
        fields[24] = record.field24 || '0';
        fields[25] = record.field25 || '0';
        fields[26] = record.field26 || '0';
        fields[27] = record.field27 || '0';
        fields[28] = record.field28 || '0';
        fields[29] = record.field29 || '0';
        fields[30] = record.field30 || '0';
        fields[31] = record.field31 || '0';
        fields[32] = record.field32 || '0';
        fields[33] = record.field33 || '0';
        fields[34] = record.field34 || '0';
        fields[35] = record.field35 || '0';
        fields[36] = record.field36 || '0';
        fields[37] = record.field37 || '0';
        fields[38] = record.field38 || '0';
        fields[39] = record.field39 || '0';
        fields[40] = record.field40 || '0';
        fields[41] = record.field41 || '0';
        fields[42] = record.field42 || '0';
        fields[43] = record.field43 || '0';
        fields[44] = record.field44 || '0';
        fields[45] = record.comment || '';
        fields[46] = record.status || '1';
        fields[47] = record.finalField || '';
        
        return fields;
    }

    // Convert standardized format to FT3D/FT5D (complete mapping)
    convertToFT3D(record) {
        const fields = new Array(53).fill('');
        
        fields[0] = record.channel;
        fields[1] = this.mapFieldFromFT2DToFT3D('enabled', record.skip || record.enabled || 'OFF');
        fields[2] = record.rxFreq;
        fields[3] = record.txFreq || record.rxFreq;
        fields[4] = record.offset || '0';
        fields[5] = record.offsetDir || 'OFF';
        fields[6] = record.txEnabled || 'ON';
        fields[7] = this.mapMode(record.rxMode || record.mode || 'FM', null, 'FT3D');
        fields[8] = this.mapMode(record.txMode || record.mode || 'FM', null, 'FT3D');
        fields[9] = record.digitalEnabled || 'ON';
        fields[10] = record.name || '';
        fields[11] = record.toneMode || 'OFF';
        fields[12] = record.toneFreq || '88.5 Hz';
        fields[13] = record.dcsCode || '023';
        fields[14] = record.rxSettings || 'RX Normal TX Normal';
        fields[15] = record.audioFilter || '1600 Hz';
        fields[16] = record.rxDgId || 'RX 00';
        fields[17] = record.txDgId || 'TX 00';
        fields[18] = this.mapPower(record.power || 'High (5W)', null, 'FT3D');
        fields[19] = record.scanMode || 'OFF';
        fields[20] = record.field20 || 'ON';
        fields[21] = this.mapStep(record.step || '12.5KHz', null, 'FT3D');
        fields[22] = record.field22 || 'OFF';
        fields[23] = record.field23 || 'OFF';
        fields[24] = record.field24 || 'OFF';
        fields[25] = record.field25 || 'OFF';
        fields[26] = record.field26 || 'OFF';
        fields[27] = record.field27 || 'OFF';
        fields[28] = record.field28 || this.mapVhfUhfFlag(record.rxFreq, 'FT3D');
        fields[29] = record.field29 || 'OFF';
        fields[30] = record.field30 || 'OFF';
        fields[31] = record.field31 || 'OFF';
        fields[32] = record.field32 || 'OFF';
        fields[33] = record.field33 || 'OFF';
        fields[34] = record.field34 || 'OFF';
        fields[35] = record.field35 || 'OFF';
        fields[36] = record.field36 || 'OFF';
        fields[37] = record.field37 || 'OFF';
        fields[38] = record.field38 || 'OFF';
        fields[39] = record.field39 || 'OFF';
        fields[40] = record.field40 || 'OFF';
        fields[41] = record.field41 || 'OFF';
        fields[42] = record.field42 || 'OFF';
        fields[43] = record.field43 || 'OFF';
        fields[44] = record.field44 || 'OFF';
        fields[45] = record.field45 || 'OFF';
        fields[46] = record.field46 || 'OFF';
        fields[47] = record.field47 || 'OFF';
        fields[48] = record.field48 || 'OFF';
        fields[49] = record.field49 || 'OFF';
        fields[50] = record.comment || '';
        fields[51] = record.status || '0';
        fields[52] = record.finalField || '';
        
        return fields;
    }

    // Map mode values between formats
    mapMode(mode, fromFormat, toFormat) {
        const modeMap = {
            'FT2D_TO_STANDARD': {
                'NFM': 'FM',
                'NAM': 'AM',
                'FM': 'FM',
                'AM': 'AM'
            },
            'FT3D_TO_STANDARD': {
                'FM': 'FM',
                'AM': 'AM',
                'DN': 'DN',
                'AMS': 'AMS'
            },
            'STANDARD_TO_FT2D': {
                'FM': 'NFM',
                'AM': 'NAM',
                'DN': 'NFM',
                'AMS': 'NFM'
            },
            'STANDARD_TO_FT3D': {
                'FM': 'FM',
                'AM': 'AM',
                'NFM': 'FM',
                'NAM': 'AM',
                'DN': 'DN',
                'AMS': 'AMS'
            }
        };

        if (fromFormat && !toFormat) {
            const mapKey = `${fromFormat}_TO_STANDARD`;
            return modeMap[mapKey] ? modeMap[mapKey][mode] || mode : mode;
        } else if (!fromFormat && toFormat) {
            const mapKey = `STANDARD_TO_${toFormat}`;
            return modeMap[mapKey] ? modeMap[mapKey][mode] || mode : mode;
        }
        
        return mode;
    }

    // Map power values between formats
    mapPower(power, fromFormat, toFormat) {
        const powerMap = {
            'FT2D_TO_STANDARD': {
                'HIGH': 'High (5W)',
                'LOW1': 'Low1 (2.5W)',
                'LOW2': 'Low2 (1W)',
                'LOW3': 'Low3 (0.5W)'
            },
            'FT3D_TO_STANDARD': {
                'High (5W)': 'High (5W)',
                'Low1 (2.5W)': 'Low1 (2.5W)',
                'Low2 (1W)': 'Low2 (1W)',
                'Low3 (0.5W)': 'Low3 (0.5W)'
            },
            'STANDARD_TO_FT2D': {
                'High (5W)': 'HIGH',
                'Low1 (2.5W)': 'LOW1',
                'Low2 (1W)': 'LOW2',
                'Low3 (0.5W)': 'LOW3'
            },
            'STANDARD_TO_FT3D': {
                'HIGH': 'High (5W)',
                'LOW1': 'Low1 (2.5W)',
                'LOW2': 'Low2 (1W)',
                'LOW3': 'Low3 (0.5W)',
                'High (5W)': 'High (5W)',
                'Low1 (2.5W)': 'Low1 (2.5W)',
                'Low2 (1W)': 'Low2 (1W)',
                'Low3 (0.5W)': 'Low3 (0.5W)'
            }
        };

        if (fromFormat && !toFormat) {
            const mapKey = `${fromFormat}_TO_STANDARD`;
            return powerMap[mapKey] ? powerMap[mapKey][power] || power : power;
        } else if (!fromFormat && toFormat) {
            const mapKey = `STANDARD_TO_${toFormat}`;
            return powerMap[mapKey] ? powerMap[mapKey][power] || power : power;
        }
        
        return power;
    }

    // Map step values between formats
    mapStep(step, fromFormat, toFormat) {
        const stepMap = {
            '5.0KHz': '5.0KHz',
            '6.25KHz': '6.25KHz',
            '8.33KHz': '8.33KHz',
            '10.0KHz': '10.0KHz',
            '12.5KHz': '12.5KHz',
            '15.0KHz': '15.0KHz',
            '20.0KHz': '20.0KHz',
            '25.0KHz': '25.0KHz',
            '50.0KHz': '50.0KHz',
            '100.0KHz': '100.0KHz'
        };
        
        return stepMap[step] || step || '12.5KHz';
    }

    // Map VHF/UHF band flags
    mapVhfUhfFlag(frequency, targetFormat) {
        if (!frequency) return targetFormat === 'FT2D' ? '1' : 'ON';
        
        const freq = parseFloat(frequency);
        if (freq >= 144 && freq <= 148) {
            return targetFormat === 'FT2D' ? '1' : 'ON';  // VHF
        } else if (freq >= 430 && freq <= 450) {
            return targetFormat === 'FT2D' ? '0' : 'OFF'; // UHF
        }
        return targetFormat === 'FT2D' ? '1' : 'ON';
    }

    // Map skip field from FT3D enabled to FT2D skip
    mapFieldFromFT3DToFT2D(fieldType, value) {
        if (fieldType === 'skip') {
            if (value === 'ON') return '0';  // Enabled in FT3D = not skipped in FT2D
            if (value === 'OFF') return '1'; // Disabled in FT3D = skipped in FT2D
            return value;
        }
        return value;
    }

    // Map skip field from FT2D skip to FT3D enabled
    mapFieldFromFT2DToFT3D(fieldType, value) {
        if (fieldType === 'enabled') {
            if (value === '0') return 'ON';  // Not skipped in FT2D = enabled in FT3D
            if (value === '1') return 'OFF'; // Skipped in FT2D = disabled in FT3D
            return value === 'ON' || value === 'OFF' ? value : 'OFF';
        }
        return value;
    }

    // Main conversion function
    convert(csvData, targetFormat) {
        this.conversionLog = [];
        
        try {
            this.sourceFormat = this.detectFormat(csvData);
            this.addLog(`Detected source format: ${this.sourceFormat}`);
            
            if (this.sourceFormat === targetFormat) {
                this.addLog(`Source and target formats are the same (${targetFormat}). No conversion needed.`);
                return csvData;
            }

            const lines = csvData.trim().split('\n');
            const dataLines = lines.filter(line => line.trim().length > 0);
            
            this.addLog(`Processing ${dataLines.length} lines of data`);

            const convertedLines = [];
            let validRecords = 0;
            
            for (let i = 0; i < dataLines.length; i++) {
                const line = dataLines[i];
                const fields = this.parseCSVLine(line);
                
                try {
                    if (!fields[2] || fields[2].trim() === '') {
                        const emptyRecord = this.createEmptyRecord(fields[0] || (i + 1).toString(), targetFormat);
                        convertedLines.push(emptyRecord);
                        continue;
                    }

                    let standardRecord;
                    if (this.sourceFormat === 'FT2D') {
                        standardRecord = this.convertFromFT2D(fields);
                    } else {
                        standardRecord = this.convertFromFT3D(fields);
                    }

                    let targetFields;
                    if (targetFormat === 'FT2D') {
                        targetFields = this.convertToFT2D(standardRecord);
                    } else {
                        targetFields = this.convertToFT3D(standardRecord);
                    }

                    convertedLines.push(targetFields.join(','));
                    validRecords++;
                    
                } catch (error) {
                    this.addLog(`Warning: Error converting line ${i + 1}: ${error.message}`);
                    const emptyRecord = this.createEmptyRecord(fields[0] || (i + 1).toString(), targetFormat);
                    convertedLines.push(emptyRecord);
                }
            }

            this.addLog(`Successfully converted ${validRecords} valid records`);
            return convertedLines.join('\n');

        } catch (error) {
            this.addLog(`Conversion failed: ${error.message}`);
            throw error;
        }
    }

    // Create empty record for target format
    createEmptyRecord(channelNumber, targetFormat) {
        if (targetFormat === 'FT2D') {
            const fields = new Array(48).fill('');
            fields[0] = channelNumber;
            fields[1] = '0';
            fields[15] = '12.5KHz';
            fields[21] = '1';
            fields[23] = '1';
            fields[46] = '1';
            return fields.join(',');
        } else {
            const fields = new Array(53).fill('');
            fields[0] = channelNumber;
            fields[1] = 'OFF';
            fields[6] = 'ON';
            fields[9] = 'ON';
            fields[16] = 'RX 00';
            fields[17] = 'TX 00';
            fields[20] = 'ON';
            fields[21] = '12.5KHz';
            fields[28] = 'ON';
            for (let i = 22; i < 50; i++) {
                if (i !== 28) fields[i] = 'OFF';
            }
            fields[51] = '0';
            return fields.join(',');
        }
    }

    // Add log entry
    addLog(message) {
        this.conversionLog.push(message);
        console.log(message);
    }

    // Get conversion log
    getLog() {
        return this.conversionLog;
    }
}

// Initialize the converter first
const converter = new YaesuConverter();

// Application state
let appState = {
    sourceType: null,
    destinationType: null,
    uploadedFile: null,
    csvData: null
};

// DOM elements - will be initialized after DOM is ready
let sourceRadios, destinationRadios, csvFileInput, convertBtn, statusMessage;

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    try {
        // Initialize DOM elements safely
        sourceRadios = document.querySelectorAll('input[name="source"]');
        destinationRadios = document.querySelectorAll('input[name="destination"]');
        csvFileInput = document.getElementById('csvFile');
        convertBtn = document.getElementById('convertBtn');
        statusMessage = document.getElementById('statusMessage');
        
        // Only proceed if required elements exist
        if (sourceRadios.length && destinationRadios.length && csvFileInput && convertBtn && statusMessage) {
            initializeEventListeners();
            updateUI();
            initializeDragAndDrop();
        }
    } catch (error) {
        console.error('Initialization error:', error);
        // Don't show error to user on initialization
    }
});

function initializeEventListeners() {
    // Source radio button listeners
    sourceRadios.forEach(radio => {
        radio.addEventListener('change', handleSourceSelection);
    });

    // Destination radio button listeners
    destinationRadios.forEach(radio => {
        radio.addEventListener('change', handleDestinationSelection);
    });

    // File input listener
    csvFileInput.addEventListener('change', handleFileUpload);

    // Convert button listener
    convertBtn.addEventListener('click', handleConversion);
}

function handleSourceSelection(event) {
    appState.sourceType = event.target.value;
    updateDestinationRadios();
    updateTransceiverColumns();
    updateUI();
    showStatusMessage(`Source selected: ${event.target.value.toUpperCase()}`, 'info');
}

function handleDestinationSelection(event) {
    appState.destinationType = event.target.value;
    updateTransceiverColumns();
    updateUI();
    showStatusMessage(`Destination selected: ${event.target.value.toUpperCase()}`, 'info');
}

function updateDestinationRadios() {
    destinationRadios.forEach(radio => {
        if (radio.value === appState.sourceType) {
            radio.disabled = true;
            radio.checked = false;
            if (appState.destinationType === radio.value) {
                appState.destinationType = null;
            }
        } else {
            radio.disabled = false;
        }
    });
}

function updateTransceiverColumns() {
    // Update visual states of transceiver columns
    const allColumns = document.querySelectorAll('.transceiver-column');
    allColumns.forEach(column => {
        column.classList.remove('selected', 'disabled');
    });

    // Mark source column as selected
    if (appState.sourceType) {
        const sourceColumn = document.querySelector(`#source-${appState.sourceType}`).closest('.transceiver-column');
        sourceColumn.classList.add('selected');
    }

    // Mark destination column as selected
    if (appState.destinationType) {
        const destColumn = document.querySelector(`#dest-${appState.destinationType}`).closest('.transceiver-column');
        destColumn.classList.add('selected');
    }

    // Mark disabled destination columns
    destinationRadios.forEach(radio => {
        if (radio.disabled) {
            const disabledColumn = radio.closest('.transceiver-column');
            disabledColumn.classList.add('disabled');
        }
    });
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
            showStatusMessage('Please select a valid CSV file.', 'danger');
            event.target.value = '';
            appState.uploadedFile = null;
            updateUI();
            return;
        }

        appState.uploadedFile = file;
        showStatusMessage(`File selected: ${file.name}`, 'success');

        // Read and parse the CSV file
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                appState.csvData = parseCSV(e.target.result);
                showStatusMessage(`CSV file loaded successfully. Found ${appState.csvData.length - 1} records.`, 'success');
                updateUI();
            } catch (error) {
                showStatusMessage(`Error reading CSV file: ${error.message}`, 'danger');
                appState.uploadedFile = null;
                appState.csvData = null;
                updateUI();
            }
        };
        reader.readAsText(file);
    } else {
        appState.uploadedFile = null;
        appState.csvData = null;
        updateUI();
    }
}

function parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim() !== '');
    const result = [];

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
            // Simple CSV parser - handles basic CSV format
            const fields = line.split(',').map(field => field.trim().replace(/^"(.*)"$/, '$1'));
            result.push(fields);
        }
    }

    return result;
}

function updateUI() {
    // Enable convert button only if all conditions are met
    const canConvert = appState.sourceType &&
        appState.destinationType &&
        appState.uploadedFile &&
        appState.csvData;

    convertBtn.disabled = !canConvert;
}

function handleConversion() {
    if (!appState.sourceType || !appState.destinationType || !appState.csvData) {
        showStatusMessage('Please select source, destination, and upload a CSV file.', 'danger');
        return;
    }

    // Show loading state
    convertBtn.classList.add('loading');
    convertBtn.disabled = true;
    showStatusMessage('Converting configuration...', 'info');

    // Simulate processing time
    setTimeout(() => {
        try {
            const convertedData = performConversion(
                appState.csvData,
                appState.sourceType,
                appState.destinationType
            );

            downloadConvertedFile(convertedData, appState.destinationType);
            showStatusMessage('Conversion completed successfully!', 'success');

        } catch (error) {
            showStatusMessage(`Conversion error: ${error.message}`, 'danger');
        } finally {
            convertBtn.classList.remove('loading');
            updateUI();
        }
    }, 1500);
}

function performConversion(csvData, sourceType, destinationType) {
    console.log(`Converting from ${sourceType} to ${destinationType}`);
    
    // Convert array data back to CSV string for the converter
    const csvString = csvData.map(row => row.join(',')).join('\n');
    
    // Use the YaesuConverter class for actual conversion
    const result = converter.convert(csvString, destinationType.toUpperCase());
    
    // Convert back to array format for download
    return result.split('\n').map(line => line.split(','));
}

function downloadConvertedFile(data, destinationType) {
    // Convert array back to CSV format
    const csvContent = data.map(row =>
        row.map(field => {
            // Escape fields that contain commas or quotes
            if (field.toString().includes(',') || field.toString().includes('"')) {
                return `"${field.toString().replace(/"/g, '""')}"`;
            }
            return field.toString();
        }).join(',')
    ).join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${destinationType.toUpperCase()}_config.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

function showStatusMessage(message, type) {
    statusMessage.className = `alert alert-${type}`;
    statusMessage.textContent = message;
    statusMessage.classList.remove('d-none');

    // Auto-hide success and info messages after 5 seconds
    if (type === 'success' || type === 'info') {
        setTimeout(() => {
            statusMessage.classList.add('d-none');
        }, 5000);
    }
}

// Utility function to format transceiver names
function formatTransceiverName(type) {
    return type.toUpperCase();
}

// Error handling for the entire application
window.addEventListener('error', function (event) {
    console.error('Application error:', event.error);
    
    // Only show user-facing error for critical issues, not initialization problems
    if (event.error && event.error.message && 
        !event.error.message.includes('Cannot read property') && 
        !event.error.message.includes('Cannot access') &&
        !event.error.message.includes('getElementById') &&
        statusMessage) {
        showStatusMessage('An unexpected error occurred. Please refresh the page and try again.', 'danger');
    }
});

// Handle file drag and drop (enhancement)
function initializeDragAndDrop() {
    if (!csvFileInput || !csvFileInput.parentElement) {
        return; // Exit if elements don't exist
    }
    
    const fileInputContainer = csvFileInput.parentElement;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        fileInputContainer.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputContainer.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputContainer.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        fileInputContainer.classList.add('drag-over');
    }

    function unhighlight(e) {
        fileInputContainer.classList.remove('drag-over');
    }

    fileInputContainer.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        if (files.length > 0 && csvFileInput) {
            csvFileInput.files = files;
            handleFileUpload({ target: csvFileInput });
        }
    }
}

// Drag and drop initialization is now handled in the main DOMContentLoaded event

// These functions have been removed as they referenced non-existent DOM elements
// The main application functionality is handled by the functions above 