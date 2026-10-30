(() => {
  'use strict';
  const form = document.getElementById('inquiry-form');
  if (!form) return;
  const config = window.WFT_INQUIRY_CONFIG || {};
  const recipient = 'wft@wifinetech.co.kr';
  const endpoint = String(config.endpoint || '').trim();
  const ready = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(endpoint) || /^\/(?!\/)[a-zA-Z0-9_./-]+$/.test(endpoint);
  const status = document.getElementById('inquiry-status');
  const send = document.getElementById('send-inquiry');
  let sending = false;
  const lang = () => document.documentElement.lang === 'ko' ? 'ko' : document.documentElement.lang === 'zh-CN' ? 'cn' : 'en';
  const messages = {
    ko: {
      unavailable:'현재 온라인 문의 전송을 준비 중입니다. 문의 내용은 전송되지 않았습니다.',
      disclosureOffline:'* 필수 항목입니다. 현재 온라인 문의 전송을 준비 중입니다. 문의: '+recipient,
      disclosureOnline:'* 필수 항목입니다. 작성하신 문의는 와이파인텍 담당자에게 전달됩니다.',
      sending:'문의 내용을 전송하고 있습니다. 잠시만 기다려주세요.',
      success:'문의가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.',
      failed:'전송 완료를 확인하지 못했습니다. 입력 내용은 유지됩니다. 잠시 후 다시 시도하거나 '+recipient+'로 문의해 주세요.'
    },
    en: {
      unavailable:'Online inquiries are being prepared. Nothing has been sent.',
      disclosureOffline:'* Required fields. Online inquiries are being prepared. Contact: '+recipient,
      disclosureOnline:'* Required fields. Your inquiry will be sent to the WI-FINE TECH team.',
      sending:'Sending your inquiry. Please wait.',success:'Your inquiry has been received. Our team will contact you.',
      failed:'We could not confirm submission. Your entries are preserved. Please retry later or email '+recipient+'.'
    },
    cn: {
      unavailable:'在线咨询功能正在准备中，内容尚未发送。',
      disclosureOffline:'* 为必填项。在线咨询功能正在准备中。联系邮箱：'+recipient,
      disclosureOnline:'* 为必填项。您的咨询将发送给WI-FINE TECH负责人。',
      sending:'正在提交咨询，请稍候。',success:'咨询已受理，负责人确认后将与您联系。',
      failed:'未能确认提交成功。填写内容已保留，请稍后重试或发送邮件至'+recipient+'。'
    }
  };
  let statusKey = '', state = '';
  function display(key, type = '') {
    statusKey = key; state = type;
    status.textContent = messages[lang()][key] || '';
    status.dataset.state = type;
  }
  function render() {
    const disclosure = document.getElementById('inquiry-disclosure');
    disclosure.textContent = messages[lang()][ready ? 'disclosureOnline' : 'disclosureOffline'];
    send.disabled = !ready || sending;
    send.setAttribute('aria-disabled', String(!ready || sending));
    if (statusKey) display(statusKey, state);
  }
  function payload() {
    const data = new FormData(form);
    const get = key => String(data.get(key) || '').trim();
    const topic = form.elements.category.selectedOptions[0].textContent;
    const labels = lang() === 'ko' ? ['성함','회사명','이메일','연락처','문의 분야','문의 내용'] : lang() === 'cn' ? ['姓名','公司','邮箱','电话','咨询领域','咨询内容'] : ['Name','Company','Email','Phone','Topic','Message'];
    const values = [get('name'),get('company'),get('email'),get('phone'),topic,get('message')];
    const subject = '[WI-FINE TECH / '+form.dataset.branch+'] '+(get('subject').replace(/[\r\n]+/g,' ') || topic);
    const body = labels.map((label,i) => label+': '+values[i]).join('\n\n');
    return {data,subject,body};
  }
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending) return;
    if (!ready) { display('unavailable','error'); return; }
    if (!form.reportValidity()) return;
    const {data,subject,body} = payload();
    data.set('subject', subject);
    data.set('message', body);
    data.set('branch',form.dataset.branch);
    sending = true; send.disabled = true;
    form.setAttribute('aria-busy','true'); render(); display('sending');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(endpoint, {method:'POST',body:data,headers:{Accept:'application/json'},signal:controller.signal});
      const result = await response.json();
      if (!response.ok || result.errors || result.ok !== true) throw new Error('Unconfirmed submission');
      form.reset(); display('success','success');
    } catch (_) {
      display('failed','error');
    } finally {
      clearTimeout(timeout); sending = false; send.disabled = false;
      form.removeAttribute('aria-busy'); render();
    }
  });
  window.addEventListener('wft:language',render);
  render();
})();
