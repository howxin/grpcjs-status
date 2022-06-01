# grpcjs-status

`grpc-js` 的status扩展模块

```js
userServ.rpc('user.User.GetUserBaseInfo', { userId: 2 })
    .then(res => {
        console.log('user.User.GetUserBaseInfo res: ', res);
    })
    .catch(err => {
        console.error('user.User.GetUserBaseInfo rpc err', err);
        // grpc status
        const statusDetails = grpcStatus.deserializeGrpcStatusDetails(err, user_pb.Error);
        if (statusDetails) {
            console.log('status :', grpcStatus.toObject(statusDetails));
        }
    })
```