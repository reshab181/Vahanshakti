self.onmessage = async (e) => {
  const { eid, time, alarmsMap, BaseURL, formattedDate, token, access_token } =
    e.data;
  console.log(
    eid,
    time,
    alarmsMap,
    BaseURL,
    formattedDate,
    token,
    "workerData"
  );

  const myHeaders = new Headers();
  myHeaders.append("accept", "*/*");
  myHeaders.append("Authorization", "Bearer " + token);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    `${BaseURL}/DeviceInventory/getalldevicelistv2?eid=${eid}&page=1&pageSize=100000&fromDt=2024-01-01&toDt=${formattedDate}&status=1&locate=1&cttatus=1`,
    requestOptions
  );
  console.log(response, "entityResp");
  const responseParsed = await response.json();

  const entityResp = responseParsed?.result?.devicelist?.map(
    (item) => item?.intuchEntityId
  );

  if (entityResp?.length > 0) {
    let apiHitting = [];
    const resultEntityBatch = [];
    let size = 500;
    if (entityResp.length < 500) {
      size = 2;
    }

    for (let i = 0; i < entityResp.length; i += size) {
      resultEntityBatch.push(entityResp.slice(i, i + size));
    }
    console.log(resultEntityBatch, "entityRespLength", size);
    if (!access_token) {
      throw new Error("Access token is missing");
    }

    for (let i = 0; i < resultEntityBatch.length; i++) {
      try {
        let url;

        if (time) {
          url = `${BaseURL}/Intuchproxy/alarmLog?entityId=${resultEntityBatch[
            i
          ].join(",")}&startTime=${time?.start}&endTime=${time?.end}`;
        } else {
          url = `${BaseURL}/Intuchproxy/alarmLog?entityId=${resultEntityBatch[
            i
          ].join(",")}`;
        }

        console.log("urljoinids", url);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: "*/*",
          },
        });

        let dataParsed = await response.json();
        apiHitting = [...apiHitting, ...dataParsed.data];
      } catch (error) {
        console.error("Error fetching alarms:", error);
      }
    }
    const dataArray = apiHitting.sort((a, b) => b?.timestamp - a?.timestamp);

    const alarmsData = dataArray.map((item) => {
      const alarmDescription = alarmsMap.filter(
        (alarmMapItem) =>
          alarmMapItem["id"] === item["type"] &&
          alarmMapItem["key"] === item["data"]
      );
      return alarmDescription.length > 0
        ? { ...item, alarmDescription: alarmDescription[0]["uiLabel"] }
        : { ...item, alarmDescription: item["description"] };
    });

    // Send the processed data back to the main thread
    self.postMessage({ success: true, alarmsData: alarmsData });
  } else {
    self.postMessage({ success: false, alarmsData: [] });
  }
  // } catch (error) {
  //   self.postMessage({ success: false, error: error.message });
  // }
};
