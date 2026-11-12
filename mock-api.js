/**
 * โหมดสาธิต — จำลอง API ของ Apps Script ไว้ในเบราว์เซอร์ (localStorage)
 * ใช้เมื่อยังไม่ได้ใส่ API_URL ใน config.js เท่านั้น
 * ตัวอย่าง: รหัสพนักงาน 1234567 เคยลงทะเบียนมาก่อน (ยังไม่มีบัญชี) → ลอง "ใช้งานครั้งแรก" จะเห็นชื่อขึ้นอัตโนมัติ
 */
(function () {
  const KEY = 'gs_demo_db_v1';
  const pad = (n) => String(n).padStart(2, '0');
  const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return ymd(d); };
  const today = () => ymd(new Date());
  const nowText = () => { const d = new Date(); return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`; };
  const slotId = (date, start) => date.replace(/-/g, '') + (start ? '-' + start.replace(':', '') : '');
  const mkSlot = (date, start, end, cap) => ({ id: slotId(date, start), date, start: start || '', end: end || '', cap: cap || 0 });
  const label = (s) => s.date + (s.start ? ` ${s.start}-${s.end} น.` : ' (ทั้งวัน)');

  function seed() {
    const depts = ['หอผู้ป่วยอายุรกรรม', 'หอผู้ป่วยศัลยกรรม', 'ห้องฉุกเฉิน', 'งานเภสัชกรรม', 'งานโภชนาการ',
      'งานซ่อมบำรุง', 'งานบริหารทั่วไป', 'งานเทคโนโลยีสารสนเทศ', 'งานการพยาบาลผู้ป่วยนอก', 'งานรังสีวิทยา']
      .map((name, i) => ({ id: 'D' + String(i + 1).padStart(3, '0'), name }));
    const acts = [
      { id: 'A1001', name: 'อบรมการคัดแยกขยะติดเชื้อและขยะอันตราย', type: 'อบรม', location: 'ห้องประชุมใหญ่ อาคาร 1 ชั้น 5',
        description: 'เรียนรู้หลักการคัดแยกขยะติดเชื้อ ขยะอันตราย และขยะรีไซเคิลอย่างถูกวิธีตามมาตรฐานโรงพยาบาล', requireCheckIn: true,
        slots: [mkSlot(addDays(3), '09:00', '12:00', 40), mkSlot(addDays(3), '13:00', '16:00', 40), mkSlot(addDays(5), '09:00', '12:00', 2)] },
      { id: 'A1002', name: 'Big Cleaning Day ทำความสะอาดรอบโรงพยาบาล', type: 'กิจกรรมสิ่งแวดล้อม', location: 'ลานหน้าอาคารผู้ป่วยนอก',
        description: 'ร่วมกันทำความสะอาดพื้นที่สีเขียว เก็บขยะ และปลูกต้นไม้รอบโรงพยาบาล', requireCheckIn: true,
        slots: [mkSlot(addDays(7), '07:30', '10:00', 0)] },
      { id: 'A1003', name: 'รณรงค์ลดใช้ถุงพลาสติก “Green Bag”', type: 'กิจกรรมรณรงค์', location: 'โรงอาหาร',
        description: 'รับถุงผ้าฟรีและร่วมลงชื่อลดการใช้ถุงพลาสติกในโรงพยาบาล', requireCheckIn: false,
        slots: [mkSlot(addDays(1)), mkSlot(addDays(2))] },
      { id: 'A1004', name: 'สัมมนา Green & Clean Hospital ประจำปี', type: 'ประชุม/สัมมนา', location: 'หอประชุม',
        description: 'สรุปผลการดำเนินงานด้านสิ่งแวดล้อมประจำปี', requireCheckIn: true, regStart: addDays(10),
        slots: [mkSlot(addDays(21), '13:00', '16:30', 200)] },
      { id: 'A0901', name: 'อบรมการประหยัดพลังงานในหน่วยงาน', type: 'อบรม', location: 'ห้องประชุม 2',
        description: '', requireCheckIn: true, slots: [mkSlot(addDays(-20), '09:00', '12:00', 50)] },
      { id: 'A0902', name: 'ปลูกต้นไม้วันสิ่งแวดล้อมโลก', type: 'กิจกรรมสิ่งแวดล้อม', location: 'สวนสุขภาพ',
        description: '', requireCheckIn: false, slots: [mkSlot(addDays(-60), '08:00', '11:00', 0)] }
    ];
    const regs = [
      { activityId: 'A0901', employeeId: '1234567', name: 'สมชาย ใจดี', deptId: 'D006', deptName: depts[5].name,
        date: acts[4].slots[0].date, slotId: acts[4].slots[0].id, slotLabel: label(acts[4].slots[0]), registeredAt: '01/01/2026 09:00', checkedInAt: '01/01/2026 08:55' },
      { activityId: 'A0902', employeeId: '1234567', name: 'สมชาย ใจดี', deptId: 'D006', deptName: depts[5].name,
        date: acts[5].slots[0].date, slotId: acts[5].slots[0].id, slotLabel: label(acts[5].slots[0]), registeredAt: '01/01/2026 09:00', checkedInAt: '' }
    ];
    // ผู้ลงทะเบียนตัวอย่าง ให้เห็นจำนวนคนในการ์ด
    for (let i = 0; i < 18; i++) {
      const a = acts[i % 3]; const s = a.slots[i % a.slots.length];
      if (s.cap && regs.filter(r => r.slotId === s.id).length >= s.cap) continue;
      regs.push({ activityId: a.id, employeeId: String(2000000 + i), name: 'ผู้ร่วมกิจกรรม ' + (i + 1), deptId: depts[i % 10].id,
        deptName: depts[i % 10].name, date: s.date, slotId: s.id, slotLabel: label(s), registeredAt: nowText(), checkedInAt: '' });
    }
    return { depts, acts, regs, users: [] };
  }

  function load() {
    try { const v = JSON.parse(localStorage.getItem(KEY)); if (v && v.acts) return v; } catch (e) { /* ignore */ }
    const db = seed(); save(db); return db;
  }
  function save(db) { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { /* ignore */ } }

  const fail = (message, code) => { const e = new Error(message); e.code = code || 'ERROR'; throw e; };
  const pub = (u) => ({ employeeId: u.employeeId, name: u.name, deptId: u.deptId, deptName: u.deptName, email: u.email || '' });
  const userByToken = (db, token) => {
    if (!token || !String(token).startsWith('demo.')) return null;
    const [, id, pw] = String(token).split('.');
    const u = db.users.find(x => x.employeeId === id);
    return u && u.password && btoa(unescape(encodeURIComponent(u.password))).slice(0, 6) === pw ? u : null;
  };
  const mkToken = (u) => `demo.${u.employeeId}.${btoa(unescape(encodeURIComponent(u.password))).slice(0, 6)}`;
  const need = (db, token) => userByToken(db, token) || fail('กรุณาเข้าสู่ระบบใหม่อีกครั้ง', 'AUTH');
  const checkId = (id) => (/^\d{7}$/.test(String(id || '').trim()) ? String(id).trim() : fail('รหัสพนักงานต้องเป็นตัวเลข 7 หลัก'));

  function regStatus(a) {
    const t = today();
    if (a.regStart && t < a.regStart) return 'not_yet';
    if (a.regEnd && t > a.regEnd) return 'closed';
    return 'open';
  }

  function build(db, a, empId) {
    const t = today();
    const regs = db.regs.filter(r => r.activityId === a.id);
    const mine = empId ? regs.find(r => r.employeeId === empId) : null;
    const lastDate = a.slots.reduce((m, s) => (s.date > m ? s.date : m), '');
    const st = regStatus(a);
    return {
      id: a.id, name: a.name, date: a.slots[0].date, lastDate, type: a.type, description: a.description, location: a.location,
      regStart: a.regStart || '', regEnd: a.regEnd || '', regStatus: st, isPast: lastDate < t,
      canRegister: st === 'open' && lastDate >= t, requireCheckIn: a.requireCheckIn, registeredCount: regs.length,
      slots: a.slots.map(s => {
        const count = regs.filter(r => r.slotId === s.id).length;
        return { ...s, count, full: !!s.cap && count >= s.cap, past: s.date < t };
      }),
      myReg: mine ? { slotId: mine.slotId, slotLabel: mine.slotLabel, registeredAt: mine.registeredAt, checkedIn: !!mine.checkedInAt, checkedInAt: mine.checkedInAt } : null
    };
  }

  const handlers = {
    ping: () => ({ name: 'Demo API', time: new Date().toISOString() }),
    departments: (db) => db.depts.slice().sort((a, b) => a.name.localeCompare(b.name, 'th')),
    lookupEmployee: (db, r) => {
      const id = checkId(r.employeeId);
      const u = db.users.find(x => x.employeeId === id);
      if (u) return { found: true, hasAccount: !!u.password, name: u.name, deptId: u.deptId, deptName: u.deptName };
      const prev = db.regs.filter(x => x.employeeId === id).pop();
      return prev ? { found: true, hasAccount: false, name: prev.name, deptId: prev.deptId, deptName: prev.deptName } : { found: false, hasAccount: false };
    },
    signup: (db, r) => {
      const id = checkId(r.employeeId);
      if (!String(r.name || '').trim()) fail('กรุณากรอกชื่อ-นามสกุล');
      if (String(r.password || '').length < 6) fail('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      const dept = db.depts.find(d => d.id === r.deptId) || fail('กรุณาเลือกหน่วยงาน');
      let u = db.users.find(x => x.employeeId === id);
      if (u && u.password) fail('รหัสพนักงานนี้มีบัญชีแล้ว กรุณาเข้าสู่ระบบ', 'HAS_ACCOUNT');
      if (!u) { u = { employeeId: id }; db.users.push(u); }
      Object.assign(u, { name: r.name.trim(), deptId: dept.id, deptName: dept.name, email: r.email || '', password: r.password });
      return { token: mkToken(u), user: pub(u) };
    },
    login: (db, r) => {
      const id = checkId(r.employeeId);
      const u = db.users.find(x => x.employeeId === id);
      if (!u || !u.password) fail('ยังไม่มีบัญชีสำหรับรหัสพนักงานนี้ กรุณาเลือก "ใช้งานครั้งแรก"', 'NO_ACCOUNT');
      if (u.password !== r.password) fail('รหัสผ่านไม่ถูกต้อง', 'BAD_PASSWORD');
      return { token: mkToken(u), user: pub(u) };
    },
    me: (db, r) => pub(need(db, r.token)),
    updateProfile: (db, r) => {
      const u = need(db, r.token);
      const dept = db.depts.find(d => d.id === r.deptId) || fail('กรุณาเลือกหน่วยงาน');
      if (!String(r.name || '').trim()) fail('กรุณากรอกชื่อ-นามสกุล');
      Object.assign(u, { name: r.name.trim(), deptId: dept.id, deptName: dept.name, email: r.email || '' });
      return pub(u);
    },
    changePassword: (db, r) => {
      const u = need(db, r.token);
      if (u.password !== r.oldPassword) fail('รหัสผ่านเดิมไม่ถูกต้อง');
      if (String(r.newPassword || '').length < 6) fail('รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร');
      u.password = r.newPassword;
      return { token: mkToken(u) };
    },
    activities: (db, r) => {
      const u = userByToken(db, r.token);
      return db.acts.map(a => build(db, a, u && u.employeeId)).filter(a => a.lastDate >= today()).sort((a, b) => (a.date < b.date ? -1 : 1));
    },
    activity: (db, r) => {
      const a = db.acts.find(x => x.id === r.id) || fail('ไม่พบกิจกรรมนี้ในระบบ', 'NOT_FOUND');
      const u = userByToken(db, r.token);
      return build(db, a, u && u.employeeId);
    },
    register: (db, r) => {
      const u = need(db, r.token);
      const a = db.acts.find(x => x.id === r.activityId) || fail('ไม่พบกิจกรรมนี้ในระบบ');
      const st = regStatus(a);
      if (st === 'not_yet') fail('ยังไม่ถึงช่วงเปิดรับลงทะเบียนของกิจกรรมนี้');
      if (st === 'closed') fail('หมดเขตรับลงทะเบียนกิจกรรมนี้แล้ว');
      const s = a.slots.find(x => x.id === r.slotId) || fail('ไม่พบรอบวันที่/เวลาที่เลือก');
      if (s.date < today()) fail('รอบนี้ผ่านไปแล้ว กรุณาเลือกรอบอื่น');
      const mine = db.regs.find(x => x.activityId === a.id && x.employeeId === u.employeeId);
      if (mine && mine.slotId === s.id) fail('คุณลงทะเบียนรอบนี้ไว้แล้ว');
      if (s.cap && db.regs.filter(x => x.slotId === s.id && x.activityId === a.id).length >= s.cap) fail('รอบนี้เต็มแล้ว กรุณาเลือกรอบอื่น');
      if (mine) {
        if (mine.checkedInAt) fail('คุณเช็คอินกิจกรรมนี้แล้ว ไม่สามารถเปลี่ยนรอบได้');
        Object.assign(mine, { slotId: s.id, slotLabel: label(s), date: s.date });
      } else {
        db.regs.push({ activityId: a.id, employeeId: u.employeeId, name: u.name, deptId: u.deptId, deptName: u.deptName,
          date: s.date, slotId: s.id, slotLabel: label(s), registeredAt: nowText(), checkedInAt: '' });
      }
      return { moved: !!mine, activity: build(db, a, u.employeeId) };
    },
    cancel: (db, r) => {
      const u = need(db, r.token);
      const a = db.acts.find(x => x.id === r.activityId) || fail('ไม่พบกิจกรรมนี้ในระบบ');
      const i = db.regs.findIndex(x => x.activityId === a.id && x.employeeId === u.employeeId);
      if (i < 0) fail('คุณยังไม่ได้ลงทะเบียนกิจกรรมนี้');
      if (db.regs[i].checkedInAt) fail('เช็คอินแล้ว ไม่สามารถยกเลิกได้');
      db.regs.splice(i, 1);
      return { activity: build(db, a, u.employeeId) };
    },
    history: (db, r) => {
      const u = need(db, r.token);
      const t = today();
      const items = db.regs.filter(x => x.employeeId === u.employeeId).map(x => {
        const a = db.acts.find(y => y.id === x.activityId) || {};
        const s = (a.slots || []).find(y => y.id === x.slotId) || {};
        const status = x.checkedInAt ? 'attended' : (x.date >= t ? 'upcoming' : (a.requireCheckIn ? 'missed' : 'attended'));
        return { activityId: x.activityId, activityName: a.name, type: a.type, location: a.location, date: x.date,
          start: s.start || '', end: s.end || '', slotLabel: x.slotLabel, deptName: x.deptName, registeredAt: x.registeredAt,
          checkedIn: !!x.checkedInAt, checkedInAt: x.checkedInAt, walkIn: false, status, evalUrl: x.date <= t ? '#demo-evaluate' : '' };
      }).sort((a, b) => (a.date < b.date ? 1 : -1));
      const byType = {};
      items.filter(i => i.status === 'attended').forEach(i => { byType[i.type] = (byType[i.type] || 0) + 1; });
      return { user: pub(u), items, stats: { total: items.length, attended: items.filter(i => i.status === 'attended').length,
        upcoming: items.filter(i => i.status === 'upcoming').length,
        thisYear: items.filter(i => i.status === 'attended' && i.date.slice(0, 4) === t.slice(0, 4)).length, byType } };
    }
  };

  window.MockApi = {
    call(action, params) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const db = load();
          const h = handlers[action];
          try {
            if (!h) fail('ไม่รู้จักคำสั่ง: ' + action);
            const data = h(db, params || {});
            save(db);
            resolve({ ok: true, data: JSON.parse(JSON.stringify(data)) });
          } catch (e) {
            resolve({ ok: false, error: e.message, code: e.code });
          }
        }, 250);
      });
    },
    reset() { localStorage.removeItem(KEY); }
  };
})();
