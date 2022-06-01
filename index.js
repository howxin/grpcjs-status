"use strict"
const statusPb = require("./generated/status_pb");

class GrpcErrorDetails {

    deserializeGrpcStatusDetails(error, pbMessage) {
        if (!error.metadata) {
            return null;
        }
        const buffer = error.metadata.get("grpc-status-details-bin")[0];
        if (!buffer || typeof buffer === "string") {
            return null;
        }

        const status = statusPb.Status.deserializeBinary(buffer);

        const details = status
            .getDetailsList()
            .map(detail => {
                if (pbMessage) {
                    const message = detail.unpack(pbMessage.deserializeBinary, detail.getTypeName());
                    return message;
                }
                return null;
            })
            .filter(this.notEmpty);
        return {
            status,
            details
        };
    }

    toObject(statusDetails) {
        const status = statusDetails.status.toObject();
        status.details = statusDetails.details.map(d => d.toObject());
        return status;
    }

    notEmpty(value) {
        return value !== null && value !== undefined;
    };
}

module.exports = new GrpcErrorDetails();