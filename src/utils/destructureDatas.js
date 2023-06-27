export default function destructureDatas(datas, sortProperty) {
    if (datas && datas.length != 0) {
        let datasHolder = []
        datas.docs.forEach((userDoc, index) => {
            let dataHolder = {}
            let object = userDoc._document.data.value.mapValue.fields
            let keys = Object.keys(object)
            keys.forEach((key) => {
                if (object[key].arrayValue) {
                    dataHolder[key] = object[key].arrayValue.values?.map((value) => value.stringValue)
                }
                if (object[key].integerValue) {
                    dataHolder[key] = Number(object[key].integerValue)
                }
                if (object[key].stringValue) {
                    dataHolder[key] = object[key].stringValue
                }
                if (object[key].timestampValue) {
                    dataHolder[key] = object[key].timestampValue
                }
            })
            dataHolder.id = userDoc.id
            dataHolder.creationDate = new Date(userDoc._document.createTime.timestamp.seconds)
            datasHolder.push(dataHolder)
        });
        if (sortProperty) datasHolder = datasHolder.sort((a, b) => b[sortProperty] - a[sortProperty])
        return datasHolder
    }
}