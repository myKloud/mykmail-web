import { CreateSharedURL, UpdateSharedURL } from '../interfaces/sharing';

export const queryInitSRPHandshake = (token: string) => {
    return {
        method: 'get',
        url: `drive/urls/${token}/info`,
    };
};

export const queryGetURLPayload = (token: string) => {
    return {
        method: 'post',
        url: `drive/urls/${token}/file`,
    };
};

export const queryCreateSharedLink = (shareId: string, data: CreateSharedURL) => {
    return {
        method: 'post',
        url: `drive/shares/${shareId}/urls`,
        data,
    };
};

export const querySharedURLs = (shareId: string) => {
    return {
        method: 'get',
        url: `drive/shares/${shareId}/urls`,
    };
};

export const queryUpdateSharedLink = (shareId: string, token: string, data: Partial<UpdateSharedURL>) => {
    return {
        method: 'put',
        url: `drive/shares/${shareId}/urls/${token}`,
        data,
    };
};
