const app = getApp();

export function getTextRisk(text, type) {
  return new Promise((resolve) => {
    if (!text) {
      resolve({ text, type: 'empty' })
      return;
    }

    // 风险评估
    if (my.textRiskIdentification) {
      my.textRiskIdentification({
        content: text,
        type: type || ['keyword', '0', '1', '2', '3'],
        success: (res) => {
          const { result } = res || {};
          resolve({ text, score: result, type: 'success' });
        },
        fail: () => {
          resolve({ text, type: 'fail' });
        },
      })
    } else {
      resolve({ text, type: 'fail' });
    }
  })
};

export function getImageRisk(path, pid) {
  return new Promise((resolve) => {
    const appId = app.CONSTANTS.authAppId;

    if (!path || !pid) {
      resolve({ path, type: 'fail' });
    }

    if (my.ap.imgRisk && my.ap.imgRiskCallback) {
      my.ap.imgRisk({
        pid,
        appId,
        bizContext: {
          "risk_type": "img_risk",
          "content": path,
        },
        success(res) {
          const { riskResult } = res;
          const { apply_id } = JSON.parse(riskResult) || {};
          // console.log(riskResult, 'my.ap.imgRisk success')

          // 查询风险评估结果
          var timer = setTimeout(function () {
            my.ap.imgRiskCallback({
              pid,
              appId,
              bizContext: {
                "risk_type": "img_risk_result",
                "apply_id": apply_id,
              },
              success: (resp) => {
                const { riskResult } = resp;
                const { action } = JSON.parse(riskResult) || {};
                // console.log(riskResult, 'my.ap.imgRiskCallback success')

                resolve({ path, type: action === 'PASSED' ? 'passed' : 'rejected' });
              },
              fail: (resp) => {
                console.log(resp, 'my.ap.imgRiskCallback fail');
                resolve({ path, type: 'fail' });
              }
            });
            clearTimeout(timer);
          }, 500);
        },
        fail(resp) {
          console.log(resp, 'my.ap.imgRisk fail');
          resolve({ path, type: 'fail' });
        },
      })
    } else {
      resolve({ path, type: 'fail' });
    }
  }).catch(() => {
    resolve({ path, type: 'fail' });
  })
};
