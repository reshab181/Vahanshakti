
import { BaseURL } from "../constants/baseURL";
import { checkResponse } from "./checkResponse";
import fetchInterceptor from "./fetchInterceptor";

const gipIpPortCommand = (body) => {

    let type = body?.action?.toUpperCase();

    switch (type) {
        case 'SET': {
            return `+S*R:SET:GIP#${body?.ip},${body?.port};`
        } default: {
            return `+S*R:${type}:GIP#;`
        }
    }

}

const apnApnCommand = (body) => {

    let type = body?.action?.toUpperCase();

    switch (type) {
        case 'SET': {
            return `+S*R:SET:APN#${body?.value};`
        } default: {
            return `+S*R:${type}:APN#;`
        }
    }

}

const sosMobileNoCommand = (body) => {

    let type = body?.action?.toUpperCase();

    switch (type) {
        case 'SET': {
            return `+S*R:SET:SOS#${body?.value};`
        } default: {
            return `+S*R:${type}:SOS#;`
        }
    }

}

const eipIpPortCommand = (body) => {

    let type = body?.action?.toUpperCase();

    switch (type) {
        case 'SET': {
            return `+S*R:SET:EIP#${body?.ip},${body?.port};`
        } default: {
            return `+S*R:${type}:EIP#;`
        }
    }

}

const vrnVehicleNoCommand = (body) => {

    let type = body?.action?.toUpperCase();

    switch (type) {
        case 'SET': {
            return `+S*R:SET:VRN#${body?.value};`
        } default: {
            return `+S*R:${type}:VRN#;`
        }
    }

}

const logsIntervalCommand = (body) => {

    let type = body?.action?.toUpperCase();

    switch (type) {
        case 'SET': {
            return `+S*R:SET:LOGS#${body?.value};`
        } default: {
            return `+S*R:${type}:LOGS#;`
        }
    }

}

const log2IntervalCommand = (body) => {

    let type = body?.action?.toUpperCase();

    switch (type) {
        case 'SET': {
            return `+S*R:SET:LOG2#${body?.value};`
        } default: {
            return `+S*R:${type}:LOG2#;`
        }
    }

}

const hptiIntervalCommand = (body) => {

    let type = body?.action?.toUpperCase();

    switch (type) {
        case 'SET': {
            return `+S*R:SET:HPTI#${body?.value};`
        } default: {
            return `+S*R:${type}:HPTI#;`
        }
    }

}

const eptiIntervalCommand = (body) => {

    let type = body?.action?.toUpperCase();

    switch (type) {
        case 'SET': {
            return `+S*R:SET:EPTI#${body?.value};`
        } default: {
            return `+S*R:${type}:EPTI#;`
        }
    }

}

const emtdIntervalCommand = (body) => {

    let type = body?.action?.toUpperCase();

    switch (type) {
        case 'SET': {
            return `+S*R:SET:EMTD#${body?.value};`
        } default: {
            return `+S*R:${type}:EMTD#;`
        }
    }

}

const pipIpPortCommand = (body) => {

    let type = body?.action?.toUpperCase();

    switch (type) {
        case 'SET': {
            return `+S*R:SET:PIP#${body?.ip},${body?.port};`
        } default: {
            return `+S*R:${type}:PIP#;`
        }
    }

}

const imCommand = (body) => {

    let type = body?.action?.toUpperCase();

    switch (type) {
        case '1': {
            return `+S*R:IMON#;`
        }
        case '0': {
            return `+S*R:IMOFF#;`
        }
        default: {
            return ``
        }
    }

}

const rstLogsEraseBitCommand = (body) => {

    let type = body?.action?.toUpperCase();

    switch (type) {
        case '1': {
            return `+S*R:RST#1;`
        }
        case '0': {
            return `+S*R:RST#0;`
        }
        default: {
            return ``
        }
    }

}

const fotaFileCommand = (body) => {

    let fileName = body?.firmware?.name;

    return `: +S*R:FOTA#${fileName};    `
}

const slSpeedCommand = (body) => {
    return `SETTD SL:${body?.value}`
}

const setGeoCommand = (body) => {
    return `SETGEO ${body?.range00},${body?.range01},${body?.range02},${body?.range03},${body?.range10},${body?.range11},${body?.range12},${body?.range13}`
}

// To call function to get code according to command type
const getCommand = (body) => {

    switch (body?.cType) {
        case 'gipIpPort': {
            return gipIpPortCommand(body);
        }
        case 'apnApn': {
            return apnApnCommand(body);
        }

        case 'sosMobileNo': {
            return sosMobileNoCommand(body);
        }

        case 'eipIpPort': {
            return eipIpPortCommand(body);
        }

        case 'vrnVehicleNo': {
            return vrnVehicleNoCommand(body);
        }

        case 'logsInterval': {
            return logsIntervalCommand(body);
        }

        case 'log2Interval': {
            return log2IntervalCommand(body);
        }

        case 'hptiInterval': {
            return hptiIntervalCommand(body);
        }

        case 'eptiInterval': {
            return eptiIntervalCommand(body);
        }

        case 'emtdInterval': {
            return emtdIntervalCommand(body);
        }

        case 'pipIpPort': {
            return pipIpPortCommand(body);
        }

        case 'im': {
            return imCommand(body);
        }

        case 'rstLogsEraseBit': {
            return rstLogsEraseBitCommand(body);
        }

        case 'fotaFile': {
            return fotaFileCommand(body);
        }

        case 'slSpeed': {
            return slSpeedCommand(body);
        }

        case 'setGeo': {
            return setGeoCommand(body);
        }

        default: {
            return ''
        }

    }

}

// Main function to hit API
export const otaCommandApi = async (body) => {
    console.log(body)
    let fd = new FormData()

    fd.append('type', String(body?.type))
    fd.append('val1', getCommand(body))

    const requestOptions = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            Accept: "application/json, text/plain, */*",
            'Content-Type': "multipart/form-data",
        },
        body: fd

    };

    const response = await fetchInterceptor(`${BaseURL}/Intuchproxy/devices/${body?.id}/command`, requestOptions)

    return checkResponse(response)

}