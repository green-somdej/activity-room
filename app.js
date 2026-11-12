/* Green Somdej — ระบบลงทะเบียนกิจกรรมสิ่งแวดล้อม (PWA) */
(function () {
  'use strict';

  const CONFIG = window.APP_CONFIG || {};
  const DEMO = !CONFIG.API_URL;
  const view = document.getElementById('view');

  /* ============================ ICONS ============================ */
  const ICONS = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="17" rx="3"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>',
    calCheck: '<rect x="3" y="4.5" width="18" height="17" rx="3"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="m9 15 2 2 4-4"/>',
    history: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M14 14h3v3h-3zM20.5 14v.01M14 20.5h.01M17 20.5h3.5V17"/>',
    download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
    logout: '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="m10 17-5-5 5-5"/><path d="M5 12h12"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.2A6.5 6.5 0 0 1 21.5 20"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    share: '<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/>',
    copy: '<rect x="8" y="8" width="13" height="13" rx="2.5"/><path d="M16 8V5.5A2.5 2.5 0 0 0 13.5 3h-8A2.5 2.5 0 0 0 3 5.5v8A2.5 2.5 0 0 0 5.5 16H8"/>',
    monitor: '<rect x="2" y="3.5" width="20" height="13" rx="2.5"/><path d="M8 21h8M12 16.5V21"/>',
    phone: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>',
    chevR: '<path d="m9 6 6 6-6 6"/>',
    chevL: '<path d="m15 6-6 6 6 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    install: '<path d="M12 3v11"/><path d="m7.5 9.5 4.5 4.5 4.5-4.5"/><rect x="3" y="15" width="18" height="6" rx="2"/>',
    book: '<path d="M2 5h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 5h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/>',
    megaphone: '<path d="M3 11v3a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12"/>',
    present: '<path d="M3 4h18M5 4v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4"/><path d="m9 21 3-5 3 5"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M3 3l18 18"/><path d="M10.6 5.1A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.1 4M6.6 6.6A17.6 17.6 0 0 0 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2.5"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14-1.5 8 5-3 5 3-1.5-8"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    alert: '<path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    plusCal: '<rect x="3" y="4.5" width="18" height="17" rx="3"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4M12 13v5M9.5 15.5h5"/>',
    star2: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>'
  };
  const ic = (name, cls) => `<svg class="ic ${cls || ''}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;

  const TYPES = {
    'อบรม': { cls: 't-train', icon: 'book', color: '#4f46e5' },
    'กิจกรรมรณรงค์': { cls: 't-camp', icon: 'megaphone', color: '#f59e0b' },
    'กิจกรรมสิ่งแวดล้อม': { cls: 't-env', icon: 'leaf', color: '#10a37f' },
    'ประชุม/สัมมนา': { cls: 't-meet', icon: 'present', color: '#8b5cf6' }
  };
  const typeInfo = (t) => TYPES[t] || { cls: 't-other', icon: 'star', color: '#0d9488' };

  /* =========================== HELPERS =========================== */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const LS = {
    get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }
  };
  const MON = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const MON_FULL = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
  const DOW = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
  const DOW_S = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
  const parseD = (s) => { if (!s) return null; const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const pad = (n) => String(n).padStart(2, '0');
  const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
  const fmtD = (s) => { const d = parseD(s); return d ? `${d.getDate()} ${MON[d.getMonth()]} ${d.getFullYear() + 543}` : '-'; };
  const fmtDShort = (s) => { const d = parseD(s); return d ? `${DOW_S[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}` : '-'; };
  const fmtDLong = (s) => { const d = parseD(s); return d ? `วัน${DOW[d.getDay()]}ที่ ${d.getDate()} ${MON_FULL[d.getMonth()]} ${d.getFullYear() + 543}` : '-'; };
  const timeLabel = (s) => (s && s.start ? `${s.start}–${s.end} น.` : 'ทั้งวัน');
  const dateRange = (a) => {
    const first = a.slots && a.slots.length ? a.slots[0].date : a.date;
    const last = a.lastDate || first;
    if (!first) return '-';
    if (first === last) return fmtD(first);
    const d1 = parseD(first), d2 = parseD(last);
    if (d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()) return `${d1.getDate()}–${fmtD(last)}`;
    return `${fmtD(first)} – ${fmtD(last)}`;
  };
  const daysUntil = (s) => Math.round((parseD(s) - parseD(todayStr())) / 86400000);
  const relDay = (s) => { const n = daysUntil(s); return n === 0 ? 'วันนี้' : n === 1 ? 'พรุ่งนี้' : n > 1 ? `อีก ${n} วัน` : ''; };
  const initials = (name) => { const p = String(name || '?').trim().split(/\s+/); return (p[0] ? p[0][0] : '?') + (p[1] ? p[1][0] : ''); };
  const firstName = (name) => String(name || '').trim().split(/\s+/)[0] || '';
  const safeFile = (s) => String(s || 'file').replace(/[\\/:*?"<>|]+/g, ' ').replace(/\s+/g, '_').slice(0, 60);
  const actUrl = (id) => `${location.origin}${location.pathname}?act=${encodeURIComponent(id)}`;
  const slotOf = (a, id) => (a.slots || []).find((s) => s.id === id);

  /* ============================ STATE ============================ */
  const state = {
    token: LS.get('gs_token'),
    user: LS.get('gs_user'),
    depts: LS.get('gs_depts'),
    acts: null,
    history: null,
    current: null,
    route: 'home',
    returnTo: null,
    histFilter: 'all',
    typeFilter: 'all',
    search: ''
  };

  /* ============================= API ============================= */
  async function api(action, params) {
    const body = Object.assign({ action }, params || {});
    if (state.token && !('token' in body)) body.token = state.token;
    let res;
    try {
      if (DEMO) {
        res = await window.MockApi.call(action, body);
      } else {
        const r = await fetch(CONFIG.API_URL, { method: 'POST', body: JSON.stringify(body), redirect: 'follow' });
        res = await r.json();
      }
    } catch (e) {
      throw new Error('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่');
    }
    if (!res || !res.ok) {
      const err = new Error((res && res.error) || 'เกิดข้อผิดพลาด');
      err.code = res && res.code;
      if (err.code === 'AUTH') { clearSession(); state.returnTo = location.hash; setTimeout(() => go('login'), 0); }
      throw err;
    }
    return res.data;
  }

  function setSession(token, user) {
    state.token = token; state.user = user;
    LS.set('gs_token', token); LS.set('gs_user', user); LS.set('gs_last_emp', user.employeeId);
    state.acts = null; state.history = null;
  }
  function clearSession() {
    state.token = null; state.user = null; state.history = null; state.acts = null;
    LS.del('gs_token'); LS.del('gs_user');
  }

  async function loadActs(force) {
    if (state.acts && !force) return state.acts;
    state.acts = await api('activities');
    return state.acts;
  }
  async function loadHistory(force) {
    if (!state.token) return null;
    if (state.history && !force) return state.history;
    state.history = await api('history');
    return state.history;
  }
  async function loadDepts() {
    if (state.depts && state.depts.length) return state.depts;
    state.depts = await api('departments');
    LS.set('gs_depts', state.depts);
    return state.depts;
  }
  function putAct(a) {
    if (state.acts) {
      const i = state.acts.findIndex((x) => x.id === a.id);
      if (i >= 0) state.acts[i] = a; else state.acts.push(a);
    }
    if (state.current && state.current.id === a.id) state.current = a;
  }

  /* ============================ ROUTER ============================ */
  const AUTH_ROUTES = { history: 1, profile: 1 };
  const go = (path) => { location.hash = '#/' + path; };

  function route() {
    const parts = (location.hash || '#/home').replace(/^#\/?/, '').split('/');
    let name = parts[0] || 'home';
    const arg = decodeURIComponent(parts.slice(1).join('/') || '');
    if (!ROUTES[name]) name = 'home';
    if (AUTH_ROUTES[name] && !state.token) { state.returnTo = location.hash; go('login'); return; }
    if (name === 'login' && state.token) { go('home'); return; }
    state.route = name;
    renderChrome();
    closeModal();
    view.classList.remove('view-enter'); void view.offsetWidth; view.classList.add('view-enter');
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    ROUTES[name](arg).catch((e) => {
      view.innerHTML = emptyHtml('alert', 'โหลดข้อมูลไม่สำเร็จ', esc(e.message), `<button class="btn btn-primary" data-action="reload">${ic('history')} ลองใหม่</button>`);
    });
  }

  /* ============================ CHROME ============================ */
  const NAV = [
    { id: 'home', label: 'หน้าแรก', icon: 'home' },
    { id: 'activities', label: 'กิจกรรม', icon: 'calendar' },
    { id: 'history', label: 'ประวัติของฉัน', short: 'ประวัติ', icon: 'history' },
    { id: 'profile', label: 'บัญชี', icon: 'user' }
  ];

  function renderChrome() {
    const active = state.route === 'act' ? 'activities' : state.route;
    const links = NAV.map((n) => `<a href="#/${n.id}" class="${active === n.id ? 'active' : ''}">${ic(n.icon)}<span>${n.label}</span></a>`).join('');
    document.getElementById('topnav').innerHTML = links;
    document.getElementById('tabbar').innerHTML = NAV.map((n) =>
      `<a href="#/${n.id}" class="${active === n.id ? 'active' : ''}">${ic(n.icon)}<span>${n.short || n.label}</span></a>`).join('');

    const dark = resolvedTheme() === 'dark';
    let right = '';
    if (!isStandalone()) {
      right += `<button class="icon-btn" data-action="install" title="ติดตั้งแอปลงเครื่อง" aria-label="ติดตั้งแอป">${ic('install')}</button>`;
    }
    right += `<button class="icon-btn" data-action="toggleTheme" title="สลับโหมดสว่าง/มืด" aria-label="สลับธีม">${ic(dark ? 'sun' : 'moon')}</button>`;
    if (state.user) {
      right += `<a class="user-chip" href="#/profile" title="${esc(state.user.name)}"><span class="avatar">${esc(initials(state.user.name))}</span><span>${esc(firstName(state.user.name))}</span></a>`;
    } else {
      right += `<a class="btn btn-primary btn-sm" href="#/login">${ic('user', 'ic-sm')} เข้าสู่ระบบ</a>`;
    }
    document.getElementById('topbar-right').innerHTML = right;
  }

  /* ========================== COMPONENTS ========================== */
  function emptyHtml(icon, title, sub, extra) {
    return `<div class="empty">${ic(icon)}<h3 style="color:var(--ink);font-size:17px">${title}</h3><p style="margin:4px 0 16px">${sub || ''}</p>${extra || ''}</div>`;
  }
  const skeletonGrid = (n) => `<div class="grid">${Array.from({ length: n || 3 }).map(() => '<div class="skeleton" style="height:290px"></div>').join('')}</div>`;

  function statusPill(a, glass) {
    const cls = glass ? 'pill pill-glass' : 'pill';
    if (a.isPast) return `<span class="${cls} ${glass ? '' : 'pill-soft'}">จัดไปแล้ว</span>`;
    if (a.regStatus === 'not_yet') return `<span class="${cls} ${glass ? '' : 'pill-warn'}"><span class="dot"></span>เปิดรับ ${fmtD(a.regStart)}</span>`;
    if (a.regStatus === 'closed') return `<span class="${cls} ${glass ? '' : 'pill-bad'}"><span class="dot"></span>ปิดรับแล้ว</span>`;
    return `<span class="${cls} ${glass ? '' : 'pill-ok'}"><span class="dot"></span>เปิดรับลงทะเบียน</span>`;
  }

  function seatsText(a) {
    const capSum = a.slots.reduce((s, x) => s + (x.cap || 0), 0);
    const allCapped = a.slots.every((x) => x.cap);
    return allCapped && capSum ? `${a.registeredCount}/${capSum} ที่นั่ง` : `${a.registeredCount} คนลงทะเบียน`;
  }

  function cardHtml(a) {
    const t = typeInfo(a.type);
    const first = a.slots[0] || { date: a.date };
    const d = parseD(first.date);
    const rel = relDay(first.date);
    const mine = a.myReg ? slotOf(a, a.myReg.slotId) : null;
    return `
      <article class="act-card" data-action="open" data-id="${esc(a.id)}" tabindex="0" role="link" aria-label="${esc(a.name)}">
        ${a.myReg ? `<span class="mine-ribbon">${ic('check', 'ic-sm')} ลงทะเบียนแล้ว</span>` : ''}
        <div class="act-cover ${t.cls}">
          ${ic(t.icon, 'cover-ic')}
          <div class="cover-top"><span class="pill pill-glass">${esc(a.type || 'กิจกรรม')}</span>${a.myReg ? '' : statusPill(a, true)}</div>
          <div class="cover-date">${d ? `<b>${d.getDate()}</b><span>${MON_FULL[d.getMonth()]} ${d.getFullYear() + 543}${rel ? ' · ' + rel : ''}</span>` : ''}</div>
        </div>
        <div class="act-body">
          <h3>${esc(a.name)}</h3>
          <div class="meta">${ic('calendar', 'ic-sm')}<span>${dateRange(a)} · ${a.slots.length} รอบ</span></div>
          ${mine ? `<div class="meta" style="color:var(--brand-600);font-weight:600">${ic('clock', 'ic-sm')}<span>รอบของคุณ: ${fmtDShort(mine.date)} ${timeLabel(mine)}</span></div>`
                 : (a.slots.length === 1 ? `<div class="meta">${ic('clock', 'ic-sm')}<span>${timeLabel(a.slots[0])}</span></div>` : '')}
          ${a.location ? `<div class="meta">${ic('pin', 'ic-sm')}<span>${esc(a.location)}</span></div>` : ''}
          <div class="act-foot">
            <span class="people">${ic('users', 'ic-sm')} ${seatsText(a)}</span>
            <span style="display:flex;gap:6px">
              <button class="btn btn-ghost btn-sm" data-action="qr" data-id="${esc(a.id)}" title="QR Code ลงทะเบียน (ดาวน์โหลดได้)">${ic('qr', 'ic-sm')} QR</button>
              <span class="btn btn-primary btn-sm">${a.myReg ? 'ดูรายละเอียด' : (a.canRegister ? 'เลือกรอบ' : 'รายละเอียด')} ${ic('chevR', 'ic-sm')}</span>
            </span>
          </div>
        </div>
      </article>`;
  }

  function installCardHtml() {
    if (isStandalone()) return '';
    return `
      <div class="install-card">
        <img src="icons/icon-192.png" alt="" width="64" height="64">
        <div><h3>ติดตั้งแอป Green Somdej</h3><p>ใช้งานได้ทั้งคอมพิวเตอร์และมือถือ เปิดเร็ว ไม่ต้องจำลิงก์ มีไอคอนบนหน้าจอ</p></div>
        <button class="btn btn-primary" data-action="install">${ic('download')} ดาวน์โหลดแอป</button>
      </div>`;
  }

  /* ============================= HOME ============================= */
  const mascotHtml = (say) => `
    <div class="hero-mascot" aria-hidden="true">
      <div class="hero-mascot-say">${esc(say)}</div>
      <img src="mascot/leelawadee-wave.jpg" alt="" width="150" height="150">
      <small>น้องลีลาวดี</small>
    </div>`;

  async function renderHome() {
    const u = state.user;
    const hero = u ? `
      <section class="hero has-mascot">
        <svg class="hero-leaf" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1">${ICONS.leaf}</svg>
        ${mascotHtml('วันนี้มีกิจกรรมอะไรบ้างน้า~')}
        <span class="eyebrow">${ic('leaf', 'ic-sm')} ${esc(u.deptName || '')}</span>
        <h1>สวัสดี คุณ${esc(firstName(u.name))}</h1>
        <p>ร่วมกิจกรรมสิ่งแวดล้อม สะสมประวัติการเข้าร่วมได้ที่นี่ แตะเลือกรอบเวลา = ลงทะเบียนทันที</p>
        <div class="hero-stats" id="hero-stats">
          <div class="hero-stat"><b>–</b><span>เข้าร่วมแล้ว</span></div>
          <div class="hero-stat"><b>–</b><span>ปีนี้</span></div>
          <div class="hero-stat"><b>–</b><span>กำลังจะมาถึง</span></div>
        </div>
        <div class="hero-actions">
          <a class="btn btn-white" href="#/activities">${ic('calendar')} ดูกิจกรรมทั้งหมด</a>
          <a class="btn btn-glass" href="#/history">${ic('history')} ประวัติของฉัน</a>
        </div>
      </section>` : `
      <section class="hero has-mascot">
        <svg class="hero-leaf" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1">${ICONS.leaf}</svg>
        ${mascotHtml('สวัสดีค่ะ! มาร่วมกิจกรรมกันนะคะ')}
        <span class="eyebrow">${ic('leaf', 'ic-sm')} Green Somdej Hospital</span>
        <h1>ร่วมสร้างโรงพยาบาลสีเขียว<br>ไปด้วยกัน</h1>
        <p>เข้าสู่ระบบครั้งเดียว แล้วแตะเลือกวันและเวลาเพื่อลงทะเบียนกิจกรรมได้ทันที พร้อมดูประวัติการเข้าร่วมกิจกรรมสิ่งแวดล้อมของคุณ</p>
        <div class="hero-actions">
          <a class="btn btn-white btn-lg" href="#/login">${ic('user')} เข้าสู่ระบบ / ใช้งานครั้งแรก</a>
          <a class="btn btn-glass btn-lg" href="#/activities">${ic('calendar')} ดูกิจกรรม</a>
        </div>
      </section>`;

    view.innerHTML = `${hero}
      <section class="section" id="my-upcoming"></section>
      <section class="section">
        <div class="section-head"><div><h2>เปิดรับลงทะเบียนตอนนี้</h2><p>กิจกรรมที่กำลังจะจัดขึ้น</p></div>
          <a class="link-more" href="#/activities">ทั้งหมด ${ic('chevR', 'ic-sm')}</a></div>
        <div id="home-acts">${skeletonGrid(3)}</div>
      </section>
      <section class="section">${installCardHtml()}</section>
      <div class="footer">Green Somdej · ระบบลงทะเบียนกิจกรรมสิ่งแวดล้อม</div>`;

    if (u) {
      loadHistory().then((h) => {
        const el = document.getElementById('hero-stats');
        if (el && h) el.innerHTML = `
          <div class="hero-stat"><b>${h.stats.attended}</b><span>เข้าร่วมแล้ว</span></div>
          <div class="hero-stat"><b>${h.stats.thisYear}</b><span>ปีนี้</span></div>
          <div class="hero-stat"><b>${h.stats.upcoming}</b><span>กำลังจะมาถึง</span></div>`;
      }).catch(() => {});
    }

    const acts = await loadActs();
    if (state.route !== 'home') return;
    const mine = acts.filter((a) => a.myReg && !a.isPast);
    const upEl = document.getElementById('my-upcoming');
    if (mine.length) {
      upEl.innerHTML = `<div class="section-head"><div><h2>กิจกรรมที่คุณลงทะเบียนไว้</h2><p>อย่าลืมไปตามวันและเวลาที่เลือกนะ</p></div></div>
        <div class="hscroll">${mine.map((a) => {
          const s = slotOf(a, a.myReg.slotId) || a.slots[0];
          const t = typeInfo(a.type); const d = parseD(s.date);
          return `<div class="mini-reg" data-action="open" data-id="${esc(a.id)}">
            <div class="tl-date ${t.cls}"><b>${d.getDate()}</b><span>${MON[d.getMonth()]}</span></div>
            <div class="tl-main"><h4>${esc(a.name)}</h4>
              <div class="meta">${ic('clock', 'ic-sm')}<span>${fmtDShort(s.date)} · ${timeLabel(s)}</span></div>
              ${relDay(s.date) ? `<span class="pill pill-info" style="margin-top:4px">${relDay(s.date)}</span>` : ''}
            </div></div>`;
        }).join('')}</div>`;
    } else upEl.remove();

    const open = acts.filter((a) => !a.isPast).slice(0, 6);
    document.getElementById('home-acts').innerHTML = open.length
      ? `<div class="grid">${open.map(cardHtml).join('')}</div>`
      : emptyHtml('calendar', 'ยังไม่มีกิจกรรมที่เปิดรับ', 'กลับมาตรวจสอบใหม่เร็วๆ นี้');
  }

  /* ========================== ACTIVITIES ========================== */
  async function renderActivities() {
    view.innerHTML = `
      <div class="section-head" style="align-items:center;flex-wrap:wrap">
        <div><h1 class="page-title">กิจกรรมที่เปิดให้ลงทะเบียน</h1><p class="page-sub">แตะการ์ดเพื่อเลือกวันและเวลา หรือกดไอคอน QR เพื่อดาวน์โหลด QR Code ของกิจกรรม</p></div>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin:8px 0 18px">
        <div class="seg" id="type-seg"></div>
        <div class="input-wrap" style="flex:1;min-width:220px;max-width:360px;margin-left:auto">
          <input class="input" id="act-search" placeholder="ค้นหากิจกรรม / สถานที่" value="${esc(state.search)}" style="padding-left:40px">
          <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--muted)">${ic('search', 'ic-sm')}</span>
        </div>
      </div>
      <div id="act-list">${skeletonGrid(6)}</div>`;

    const acts = await loadActs();
    if (state.route !== 'activities') return;
    const types = Array.from(new Set(acts.map((a) => a.type).filter(Boolean)));
    const draw = () => {
      document.getElementById('type-seg').innerHTML = ['all'].concat(types).map((t) =>
        `<button class="${state.typeFilter === t ? 'on' : ''}" data-action="filterType" data-v="${esc(t)}">${t === 'all' ? 'ทั้งหมด' : esc(t)}</button>`).join('');
      const q = state.search.trim().toLowerCase();
      const list = acts.filter((a) => (state.typeFilter === 'all' || a.type === state.typeFilter) &&
        (!q || (a.name + ' ' + a.location + ' ' + a.description).toLowerCase().includes(q)));
      document.getElementById('act-list').innerHTML = list.length
        ? `<div class="grid">${list.map(cardHtml).join('')}</div>`
        : emptyHtml('search', 'ไม่พบกิจกรรม', 'ลองเปลี่ยนคำค้นหาหรือประเภทกิจกรรม');
    };
    state.redrawActs = draw;
    draw();
    document.getElementById('act-search').addEventListener('input', (e) => { state.search = e.target.value; draw(); });
  }

  /* ============================ DETAIL ============================ */
  async function renderDetail(id) {
    const cached = state.acts && state.acts.find((a) => a.id === id);
    if (cached) drawDetail(cached);
    else view.innerHTML = '<div class="skeleton" style="height:220px"></div><div class="skeleton" style="height:320px;margin-top:20px"></div>';
    const a = await api('activity', { id });
    if (state.route !== 'act') return;
    putAct(a);
    drawDetail(a);
  }

  function drawDetail(a) {
    state.current = a;
    const t = typeInfo(a.type);
    view.innerHTML = `
      <a class="back" href="#/activities">${ic('chevL', 'ic-sm')} กิจกรรมทั้งหมด</a>
      <section class="detail-hero ${t.cls}">
        ${ic(t.icon, 'cover-ic')}
        <div class="chips">
          <span class="pill pill-glass">${ic(t.icon, 'ic-sm')} ${esc(a.type || 'กิจกรรม')}</span>
          ${statusPill(a, true)}
          ${a.requireCheckIn ? `<span class="pill pill-glass">${ic('qr', 'ic-sm')} เช็คอินด้วย QR หน้างาน</span>` : ''}
        </div>
        <h1>${esc(a.name)}</h1>
        <div class="chips" style="gap:16px">
          <span class="meta" style="color:#fff">${ic('calendar', 'ic-sm')} ${dateRange(a)}</span>
          ${a.location ? `<span class="meta" style="color:#fff">${ic('pin', 'ic-sm')} ${esc(a.location)}</span>` : ''}
          <span class="meta" style="color:#fff">${ic('users', 'ic-sm')} ${seatsText(a)}</span>
          <button class="btn btn-glass btn-sm" data-action="scrollQr">${ic('qr', 'ic-sm')} QR Code ลงทะเบียน</button>
        </div>
      </section>
      <div class="detail-grid">
        <div style="display:grid;gap:20px;min-width:0">
          <section class="card card-pad" id="slot-card">${slotCardHtml(a)}</section>
          <section class="card card-pad">
            <h2 class="card-title">${ic('info')} รายละเอียดกิจกรรม</h2>
            <ul class="info-list" style="margin-top:14px">
              <li><span class="ii">${ic('calendar')}</span><div><small>วันที่จัด</small><b>${dateRange(a)}</b> · ${a.slots.length} รอบ</div></li>
              ${a.location ? `<li><span class="ii">${ic('pin')}</span><div><small>สถานที่</small><b>${esc(a.location)}</b></div></li>` : ''}
              <li><span class="ii">${ic('calCheck')}</span><div><small>ช่วงเปิดรับลงทะเบียน</small><b>${regWindow(a)}</b></div></li>
              <li><span class="ii">${ic('users')}</span><div><small>ผู้ลงทะเบียน</small><b>${seatsText(a)}</b></div></li>
            </ul>
            ${a.description ? `<p class="desc">${esc(a.description)}</p>` : ''}
          </section>
        </div>
        <aside class="card card-pad qr-card">${qrPanelHtml(a)}</aside>
      </div>`;
    drawQRInto(document.getElementById('qr-canvas'), actUrl(a.id));
  }

  function regWindow(a) {
    if (!a.regStart && !a.regEnd) return 'เปิดรับตลอดจนถึงวันจัดกิจกรรม';
    if (a.regStart && a.regEnd) return `${fmtD(a.regStart)} – ${fmtD(a.regEnd)}`;
    if (a.regStart) return `ตั้งแต่ ${fmtD(a.regStart)}`;
    return `ถึง ${fmtD(a.regEnd)}`;
  }

  function slotCardHtml(a) {
    const mine = a.myReg;
    const mySlot = mine ? slotOf(a, mine.slotId) : null;
    let notice = '';
    if (mine) {
      const canCancel = !mine.checkedIn && !(mySlot && mySlot.past);
      notice = `<div class="tip ok my-reg">
          <div style="display:flex;gap:10px;align-items:flex-start">${ic('calCheck')}<div>
            <b>คุณลงทะเบียนแล้ว</b><br>${mySlot ? `${fmtDLong(mySlot.date)} · ${timeLabel(mySlot)}` : esc(mine.slotLabel)}
            ${mine.checkedIn ? `<br>${ic('check', 'ic-sm')} เช็คอินแล้ว ${esc(mine.checkedInAt)}` : ''}
          </div></div>
          <span style="display:flex;gap:8px;flex-wrap:wrap">
            ${mySlot ? `<button class="btn btn-ghost btn-sm" data-action="ics">${ic('plusCal', 'ic-sm')} เพิ่มลงปฏิทิน</button>` : ''}
            ${canCancel ? `<button class="btn btn-danger btn-sm" data-action="cancel">${ic('x', 'ic-sm')} ยกเลิก</button>` : ''}
          </span>
        </div>`;
      if (canCancel && a.canRegister && a.slots.length > 1) notice += `<div class="tip">${ic('info')}<div>ต้องการเปลี่ยนรอบ? แตะรอบใหม่ที่ต้องการได้เลย</div></div>`;
    } else if (a.isPast) {
      notice = `<div class="tip warn">${ic('alert')}<div>กิจกรรมนี้จัดไปแล้ว</div></div>`;
    } else if (a.regStatus === 'not_yet') {
      notice = `<div class="tip warn">${ic('clock')}<div>ยังไม่เปิดรับลงทะเบียน — เปิดรับ ${regWindow(a)}</div></div>`;
    } else if (a.regStatus === 'closed') {
      notice = `<div class="tip warn">${ic('alert')}<div>ปิดรับลงทะเบียนแล้ว</div></div>`;
    } else if (!state.token) {
      notice = `<div class="tip my-reg"><div style="display:flex;gap:10px">${ic('lock')}<div>เข้าสู่ระบบก่อน แล้วแตะรอบที่ต้องการเพื่อลงทะเบียนได้ทันที</div></div>
        <button class="btn btn-primary btn-sm" data-action="gotoLogin">เข้าสู่ระบบ</button></div>`;
    }

    const byDate = {};
    a.slots.forEach((s) => { (byDate[s.date] = byDate[s.date] || []).push(s); });
    const days = Object.keys(byDate).sort().map((date) => {
      const d = parseD(date);
      return `<div class="slot-day">
        <h4><span class="day-num">${d ? d.getDate() : '?'}</span>${fmtDLong(date)} ${relDay(date) ? `<span class="pill pill-info">${relDay(date)}</span>` : ''}</h4>
        <div class="slots">${byDate[date].map((s) => slotBtnHtml(a, s)).join('')}</div>
      </div>`;
    }).join('');

    return `<h2 class="card-title">${ic('clock')} เลือกวันและเวลา</h2>
      <p class="muted" style="margin:0;font-size:13.5px">แตะรอบที่ต้องการ = ลงทะเบียนทันที ไม่ต้องกรอกข้อมูลซ้ำ</p>
      ${notice}${days}`;
  }

  function slotBtnHtml(a, s) {
    const isMine = a.myReg && a.myReg.slotId === s.id;
    const locked = a.myReg && a.myReg.checkedIn;
    const disabled = !isMine && (s.past || s.full || !a.canRegister || locked);
    const pct = s.cap ? Math.min(100, Math.round((s.count / s.cap) * 100)) : 0;
    let seats;
    if (s.past) seats = 'รอบนี้ผ่านไปแล้ว';
    else if (s.cap) seats = s.full ? 'เต็มแล้ว' : `เหลือ ${s.cap - s.count} ที่ · ${s.count}/${s.cap}`;
    else seats = `${s.count} คน · ไม่จำกัดจำนวน`;
    return `<button class="slot ${isMine ? 'mine' : ''}" data-action="slot" data-slot="${esc(s.id)}" ${disabled ? 'disabled' : ''} aria-pressed="${isMine ? 'true' : 'false'}">
      ${isMine ? `<span class="check">${ic('check', 'ic-sm')}</span>` : ''}
      <span class="time">${timeLabel(s)}</span>
      <span class="seats">${isMine ? '<b style="color:var(--brand-600)">รอบของคุณ</b> · ' : ''}${seats}</span>
      ${s.cap ? `<span class="bar"><i style="width:${pct}%"></i></span>` : ''}
    </button>`;
  }

  function qrPanelHtml(a) {
    return `<h2 class="card-title" style="justify-content:center">${ic('qr')} QR Code ลงทะเบียน</h2>
      <p class="muted" style="margin:0;font-size:13.5px">สแกนเพื่อเปิดหน้าลงทะเบียนกิจกรรมนี้ เหมาะสำหรับติดประกาศหรือส่งต่อ</p>
      <div class="qr-frame"><canvas id="qr-canvas" width="600" height="600" aria-label="QR Code"></canvas></div>
      <div class="qr-url">${esc(actUrl(a.id))}</div>
      <div class="qr-actions">
        <button class="btn btn-primary full" data-action="downloadQr">${ic('download')} ดาวน์โหลด QR (PNG HD)</button>
        <button class="btn btn-ghost" data-action="poster">${ic('image')} โปสเตอร์</button>
        <button class="btn btn-ghost" data-action="copyLink">${ic('copy')} คัดลอกลิงก์</button>
        ${navigator.share ? `<button class="btn btn-ghost full" data-action="share">${ic('share')} แชร์</button>` : ''}
      </div>`;
  }

  async function onSlot(btn) {
    const a = state.current;
    if (!a) return;
    const slotId = btn.dataset.slot;
    const s = slotOf(a, slotId);
    if (!state.token) { state.returnTo = location.hash; toast('กรุณาเข้าสู่ระบบก่อนลงทะเบียน'); go('login'); return; }
    if (a.myReg && a.myReg.slotId === slotId) return;
    if (a.myReg) {
      const old = slotOf(a, a.myReg.slotId);
      const ok = await confirmModal('เปลี่ยนรอบ?', `ย้ายจาก <b>${old ? fmtDShort(old.date) + ' ' + timeLabel(old) : 'รอบเดิม'}</b><br>ไปเป็น <b>${fmtDShort(s.date)} ${timeLabel(s)}</b>`, 'ยืนยันเปลี่ยนรอบ');
      if (!ok) return;
    }
    btn.classList.add('loading');
    btn.insertAdjacentHTML('beforeend', '<span class="spinner" style="position:absolute;right:12px;bottom:12px;width:18px;height:18px;color:var(--brand-600);z-index:1"></span>');
    try {
      const res = await api('register', { activityId: a.id, slotId });
      putAct(res.activity);
      state.history = null;
      document.getElementById('slot-card').innerHTML = slotCardHtml(res.activity);
      successModal(res.activity, slotOf(res.activity, slotId), res.moved);
    } catch (e) {
      toast(e.message, 'err');
      btn.classList.remove('loading');
      const sp = btn.querySelector('.spinner'); if (sp) sp.remove();
      if (/เต็ม|ผ่านไปแล้ว/.test(e.message)) renderDetail(a.id);
    }
  }

  async function onCancel() {
    const a = state.current;
    const s = slotOf(a, a.myReg.slotId);
    const ok = await confirmModal('ยกเลิกการลงทะเบียน?', `${esc(a.name)}<br><b>${s ? fmtDLong(s.date) + ' · ' + timeLabel(s) : ''}</b>`, 'ยืนยันยกเลิก', true);
    if (!ok) return;
    try {
      const res = await api('cancel', { activityId: a.id });
      putAct(res.activity); state.history = null;
      document.getElementById('slot-card').innerHTML = slotCardHtml(res.activity);
      toast('ยกเลิกการลงทะเบียนแล้ว', 'ok');
    } catch (e) { toast(e.message, 'err'); }
  }

  function successModal(a, s, moved) {
    openModal(`
      <div style="text-align:center">
        <div class="success-ic">${ic('check')}</div>
        <h3>${moved ? 'เปลี่ยนรอบเรียบร้อย' : 'ลงทะเบียนสำเร็จ!'}</h3>
        <p style="margin:6px 0 0"><b>${esc(a.name)}</b></p>
        <p class="muted" style="margin:6px 0 0">${s ? `${fmtDLong(s.date)}<br>${timeLabel(s)}` : ''}${a.location ? `<br>${esc(a.location)}` : ''}</p>
        ${a.requireCheckIn ? `<div class="tip" style="text-align:left">${ic('qr')}<div>วันงานให้สแกน QR เช็คอินที่จุดลงทะเบียน แล้วกรอกรหัสพนักงาน ${esc(state.user.employeeId)}</div></div>` : ''}
        <div style="display:grid;gap:8px;margin-top:20px">
          <button class="btn btn-primary" data-action="ics">${ic('plusCal')} เพิ่มลงปฏิทิน</button>
          <a class="btn btn-ghost" href="#/history">${ic('history')} ดูประวัติของฉัน</a>
          <button class="btn btn-ghost" data-action="closeModal">ปิด</button>
        </div>
      </div>`);
  }

  function downloadIcs() {
    const a = state.current; if (!a || !a.myReg) return;
    const s = slotOf(a, a.myReg.slotId); if (!s) return;
    const d = s.date.replace(/-/g, '');
    const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Green Somdej//Activity//TH', 'BEGIN:VEVENT',
      `UID:${a.id}-${s.id}@green-somdej`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`];
    if (s.start) {
      lines.push(`DTSTART:${d}T${s.start.replace(':', '')}00`, `DTEND:${d}T${s.end.replace(':', '')}00`);
    } else {
      const nd = parseD(s.date); nd.setDate(nd.getDate() + 1);
      lines.push(`DTSTART;VALUE=DATE:${d}`, `DTEND;VALUE=DATE:${nd.getFullYear()}${pad(nd.getMonth() + 1)}${pad(nd.getDate())}`);
    }
    const icsEsc = (v) => String(v || '').replace(/[\\;,]/g, (m) => '\\' + m).replace(/\n/g, '\\n');
    lines.push(`SUMMARY:${icsEsc(a.name)}`, `LOCATION:${icsEsc(a.location)}`, `DESCRIPTION:${icsEsc(actUrl(a.id))}`,
      'BEGIN:VALARM', 'TRIGGER:-PT1H', 'ACTION:DISPLAY', 'DESCRIPTION:Reminder', 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR');
    saveBlob(new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' }), `${safeFile(a.name)}.ics`);
  }

  /* ============================== QR ============================== */
  const logoImg = new Image();
  const logoReady = new Promise((res) => { logoImg.onload = res; logoImg.onerror = res; });
  logoImg.src = 'icons/icon-512.png';

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
  }

  /** วาด QR ลงแคนวาส ความละเอียดสูง (ค่าเริ่มต้น 1200px) พร้อมโลโก้ตรงกลาง */
  function renderQR(canvas, text, size) {
    if (!window.qrcode) throw new Error('โหลดตัวสร้าง QR ไม่สำเร็จ');
    const q = window.qrcode(0, 'H'); q.addData(text); q.make();
    const n = q.getModuleCount(); const quiet = 3;
    const cell = Math.max(2, Math.floor(size / (n + quiet * 2)));
    const dim = cell * (n + quiet * 2);
    canvas.width = dim; canvas.height = dim;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, dim, dim);
    ctx.fillStyle = '#053b33';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
      if (q.isDark(r, c)) ctx.fillRect((c + quiet) * cell, (r + quiet) * cell, cell, cell);
    }
    if (logoImg.naturalWidth) {
      const lg = Math.round(n * 0.2) * cell; const x = Math.round((dim - lg) / 2); const padL = cell;
      ctx.fillStyle = '#fff'; roundRect(ctx, x - padL, x - padL, lg + padL * 2, lg + padL * 2, lg * 0.28); ctx.fill();
      ctx.save(); roundRect(ctx, x, x, lg, lg, lg * 0.24); ctx.clip(); ctx.drawImage(logoImg, x, x, lg, lg); ctx.restore();
    }
    return canvas;
  }
  async function drawQRInto(canvas, text) {
    if (!canvas) return;
    await logoReady;
    try { renderQR(canvas, text, 1200); } catch (e) { toast(e.message, 'err'); }
  }

  function saveBlob(blob, name) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
  }
  const canvasToBlob = (c) => new Promise((res) => c.toBlob(res, 'image/png'));

  async function downloadQr(a) {
    await logoReady;
    const c = renderQR(document.createElement('canvas'), actUrl(a.id), 1600);
    saveBlob(await canvasToBlob(c), `QR_${safeFile(a.name)}.png`);
    toast('ดาวน์โหลด QR Code แล้ว', 'ok');
  }

  function wrapText(ctx, text, maxW) {
    let tokens;
    if (window.Intl && Intl.Segmenter) tokens = Array.from(new Intl.Segmenter('th', { granularity: 'word' }).segment(text), (s) => s.segment);
    else tokens = Array.from(text);
    const lines = []; let line = '';
    tokens.forEach((tk) => {
      const test = line + tk;
      if (ctx.measureText(test).width > maxW && line) { lines.push(line.trim()); line = tk.trimStart(); } else line = test;
    });
    if (line.trim()) lines.push(line.trim());
    return lines;
  }

  /* ===================== โปสเตอร์ประชาสัมพันธ์ ===================== */
  // พรีเซ็นเตอร์: น้องลีลาวดี (เปลี่ยนรูปได้ที่ docs/mascot/)
  const MASCOT_SRC = CONFIG.MASCOT_URL || 'mascot/leelawadee-main.jpg';
  const MASCOT_MSG = 'มาร่วมกิจกรรม\nด้วยกันนะคะ!';
  const mascotImg = new Image();
  const mascotReady = new Promise((res) => { mascotImg.onload = res; mascotImg.onerror = res; });
  mascotImg.src = MASCOT_SRC;
  const PF = '"IBM Plex Sans Thai", "Noto Sans Thai", sans-serif';

  async function posterAssets() {
    await Promise.all([logoReady, mascotReady]);
    try { await Promise.all([400, 500, 600, 700].map((w) => document.fonts.load(`${w} 40px ${PF}`))); } catch (e) { /* ignore */ }
  }

  const circle = (ctx, x, y, r, color) => { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); };

  /** ดอกลีลาวดีเล็กๆ สำหรับตกแต่ง */
  function plumeria(ctx, x, y, r, rot, alpha) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot || 0); ctx.globalAlpha = alpha == null ? 1 : alpha;
    for (let i = 0; i < 5; i++) {
      ctx.save(); ctx.rotate((i * Math.PI * 2) / 5);
      const g = ctx.createLinearGradient(0, 0, 0, -r);
      g.addColorStop(0, '#ffd43b'); g.addColorStop(0.45, '#fff8dc'); g.addColorStop(1, '#ffffff');
      ctx.fillStyle = g; ctx.strokeStyle = 'rgba(214,170,40,.45)'; ctx.lineWidth = Math.max(1, r * 0.03);
      ctx.beginPath(); ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-r * 0.45, -r * 0.2, -r * 0.55, -r * 0.85, -r * 0.1, -r);
      ctx.bezierCurveTo(r * 0.3, -r * 1.05, r * 0.4, -r * 0.45, 0, 0);
      ctx.fill(); ctx.stroke(); ctx.restore();
    }
    circle(ctx, 0, 0, r * 0.14, '#f5b700');
    ctx.restore();
  }

  function leafShape(ctx, x, y, s, rot, color) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(0, 40);
    ctx.bezierCurveTo(-30, 12, -22, -28, 0, -40); ctx.bezierCurveTo(22, -28, 30, 12, 0, 40); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(0, 34); ctx.lineTo(0, -32); ctx.stroke();
    ctx.restore();
  }

  function shadowed(ctx, blur, offY, color, fn) {
    ctx.save(); ctx.shadowColor = color || 'rgba(5,59,51,.22)'; ctx.shadowBlur = blur; ctx.shadowOffsetY = offY; fn(); ctx.restore();
  }

  /** รูปน้องลีลาวดีในกรอบมุมโค้ง พร้อมขอบขาว */
  function drawMascotCard(ctx, x, y, w, h, r) {
    shadowed(ctx, 40, 16, 'rgba(5,59,51,.28)', () => { ctx.fillStyle = '#fff'; roundRect(ctx, x - 10, y - 10, w + 20, h + 20, r + 10); ctx.fill(); });
    ctx.save(); roundRect(ctx, x, y, w, h, r); ctx.clip();
    if (mascotImg.naturalWidth) {
      const ir = mascotImg.naturalWidth / mascotImg.naturalHeight, br = w / h;
      let sw = mascotImg.naturalWidth, sh = mascotImg.naturalHeight, sx = 0, sy = 0;
      if (ir > br) { sw = sh * br; sx = (mascotImg.naturalWidth - sw) / 2; } else { sh = sw / br; }
      ctx.drawImage(mascotImg, sx, sy, sw, sh, x, y, w, h);
    } else {
      const g = ctx.createLinearGradient(x, y, x, y + h); g.addColorStop(0, '#dff7ec'); g.addColorStop(1, '#b8ebd6');
      ctx.fillStyle = g; ctx.fillRect(x, y, w, h); plumeria(ctx, x + w / 2, y + h / 2, Math.min(w, h) * 0.3, 0.2);
    }
    ctx.restore();
  }

  /** กล่องคำพูดของพรีเซ็นเตอร์ (หางชี้ไปที่ tx,ty) */
  function speechBubble(ctx, x, y, w, h, tx, ty, text, size) {
    shadowed(ctx, 24, 10, 'rgba(5,59,51,.22)', () => {
      ctx.fillStyle = '#fff'; roundRect(ctx, x, y, w, h, h * 0.3); ctx.fill();
      const bx = Math.min(Math.max(tx, x + 50), x + w - 50);
      ctx.beginPath(); ctx.moveTo(bx - 26, y + h - 2); ctx.lineTo(tx, ty); ctx.lineTo(bx + 26, y + h - 2); ctx.closePath(); ctx.fill();
    });
    ctx.strokeStyle = '#34c79a'; ctx.lineWidth = 4; roundRect(ctx, x + 8, y + 8, w - 16, h - 16, h * 0.26); ctx.stroke();
    ctx.fillStyle = '#0b6b55'; ctx.font = `700 ${size}px ${PF}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const lines = [];
    String(text || '').split('\n').forEach((ln) => wrapText(ctx, ln, w - 60).forEach((l) => lines.push(l)));
    const shown = lines.slice(0, 3); const lh = size * 1.3;
    shown.forEach((l, i) => ctx.fillText(l, x + w / 2, y + h / 2 + (i - (shown.length - 1) / 2) * lh));
    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  }

  function pill(ctx, x, y, text, size, bg, fg) {
    ctx.font = `600 ${size}px ${PF}`;
    const w = ctx.measureText(text).width + size * 1.6, h = size * 1.9;
    ctx.fillStyle = bg; roundRect(ctx, x, y, w, h, h / 2); ctx.fill();
    ctx.fillStyle = fg; ctx.textBaseline = 'middle'; ctx.fillText(text, x + size * 0.8, y + h / 2 + 1); ctx.textBaseline = 'alphabetic';
    return w;
  }

  function inviteText(a) {
    const t = (a.type || '').trim();
    if (!t || t === 'อื่นๆ') return 'ขอเชิญร่วมกิจกรรม';
    return 'ขอเชิญร่วม' + (t.startsWith('กิจกรรม') ? t : 'กิจกรรม' + t);
  }

  function slotLines(a, max) {
    if (a.slots.length <= max) return a.slots.map((s) => `${fmtDShort(s.date)} · ${timeLabel(s)}`);
    const days = new Set(a.slots.map((s) => s.date)).size;
    return [`${a.slots.length} รอบ ใน ${days} วัน — เลือกรอบที่สะดวกได้`];
  }

  function drawLogoHeader(ctx, x, y, s, dark) {
    if (logoImg.naturalWidth) { ctx.save(); roundRect(ctx, x, y, s, s, s * 0.26); ctx.clip(); ctx.drawImage(logoImg, x, y, s, s); ctx.restore(); }
    ctx.fillStyle = dark ? '#053b33' : '#fff';
    ctx.font = `700 ${s * 0.5}px ${PF}`; ctx.fillText('Green Somdej', x + s * 1.22, y + s * 0.5);
    ctx.fillStyle = dark ? '#5b6b66' : 'rgba(255,255,255,.85)';
    ctx.font = `500 ${s * 0.27}px ${PF}`; ctx.fillText('ร่วมสร้างโรงพยาบาลสีเขียวไปด้วยกัน', x + s * 1.22, y + s * 0.92);
  }

  /** โปสเตอร์แนวตั้ง A4 (1240×1754 ≈ 150dpi) สำหรับพิมพ์ติดบอร์ด */
  function posterA4(a, msg) {
    const W = 1240, H = 1754;
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const ctx = c.getContext('2d');
    const bg = ctx.createLinearGradient(0, 0, W * 0.4, H);
    bg.addColorStop(0, '#e6fbf1'); bg.addColorStop(0.5, '#f4fcff'); bg.addColorStop(1, '#e3f7ec');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    circle(ctx, W - 60, 120, 300, 'rgba(52,199,154,.16)');
    circle(ctx, 40, 1080, 220, 'rgba(14,165,233,.08)');
    circle(ctx, W - 40, 1180, 170, 'rgba(245,183,0,.10)');
    leafShape(ctx, 1150, 420, 1.3, 0.6, 'rgba(16,163,127,.18)');
    leafShape(ctx, 60, 760, 1.1, -0.5, 'rgba(16,163,127,.14)');
    plumeria(ctx, 1150, 300, 46, 0.3, 0.9);
    plumeria(ctx, 1080, 360, 28, 1.1, 0.8);
    plumeria(ctx, 90, 1180, 34, 0.7, 0.75);

    drawLogoHeader(ctx, 70, 60, 92, true);
    pill(ctx, 70, 196, inviteText(a), 30, '#0e8a6a', '#fff');

    ctx.fillStyle = '#053b33'; ctx.font = `700 76px ${PF}`;
    const title = wrapText(ctx, a.name, W - 160).slice(0, 3);
    title.forEach((l, i) => ctx.fillText(l, 70, 360 + i * 96));
    const titleEnd = 360 + (title.length - 1) * 96 + 30;

    // แถวพรีเซ็นเตอร์ + รายละเอียด
    const bottomY = 1236, heroH = 600;
    const heroY = Math.round(titleEnd + Math.max(30, (bottomY - titleEnd - heroH) / 2));
    const mW = 430, mH = 520, mX = W - 70 - mW, mY = heroY + 80;
    drawMascotCard(ctx, mX, mY, mW, mH, 40);
    speechBubble(ctx, mX - 120, heroY - 30, 400, 120, mX + 120, mY + 40, msg, 36);
    ctx.font = `600 22px ${PF}`;
    pill(ctx, mX + 20, mY + mH - 64, 'น้องลีลาวดี ชวนมาร่วมกิจกรรม', 22, 'rgba(5,59,51,.78)', '#fff');

    // การ์ดรายละเอียด
    const cX = 70, cY = heroY + 110, cW = mX - 120 - 40 - cX + 80, cH = heroH - 110;
    shadowed(ctx, 40, 14, 'rgba(5,59,51,.14)', () => { ctx.fillStyle = '#fff'; roundRect(ctx, cX, cY, cW, cH, 36); ctx.fill(); });
    let y = cY + 74;
    const row = (label, lines, color) => {
      circle(ctx, cX + 48, y - 10, 12, color);
      ctx.fillStyle = '#5b6b66'; ctx.font = `600 26px ${PF}`; ctx.fillText(label, cX + 76, y);
      y += 46; ctx.fillStyle = '#0d1f1a'; ctx.font = `600 32px ${PF}`;
      lines.forEach((l) => wrapText(ctx, l, cW - 110).slice(0, 2).forEach((ln) => { ctx.fillText(ln, cX + 76, y); y += 44; }));
      y += 18;
    };
    row('วันที่จัดกิจกรรม', [dateRange(a)], '#10a37f');
    row('รอบเวลา', slotLines(a, 3), '#0ea5e9');
    if (a.location && y < cY + cH - 90) row('สถานที่', [a.location], '#f59e0b');
    if (a.description && y < cY + cH - 60) {
      ctx.strokeStyle = '#e3ece8'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cX + 40, y - 14); ctx.lineTo(cX + cW - 40, y - 14); ctx.stroke();
      y += 22; ctx.fillStyle = '#5b6b66'; ctx.font = `400 26px ${PF}`;
      const maxL = Math.max(1, Math.floor((cY + cH - 30 - y) / 38) + 1);
      const dl = wrapText(ctx, a.description.replace(/\s+/g, ' '), cW - 80);
      dl.slice(0, maxL).forEach((l, i) => ctx.fillText(i === maxL - 1 && dl.length > maxL ? l.replace(/.{0,2}$/, '…') : l, cX + 40, y + i * 38));
    }

    // กล่อง QR + 3 ขั้นตอน
    const qX = 70, qY = bottomY + 10, qW = W - 140, qH = 390;
    shadowed(ctx, 50, 18, 'rgba(5,59,51,.18)', () => { ctx.fillStyle = '#fff'; roundRect(ctx, qX, qY, qW, qH, 40); ctx.fill(); });
    ctx.fillStyle = '#053b33'; ctx.font = `700 40px ${PF}`; ctx.fillText('ลงทะเบียนง่ายๆ ใน 3 ขั้นตอน', qX + 50, qY + 82);
    ['สแกน QR Code ด้วยกล้องมือถือ', 'เข้าสู่ระบบด้วยรหัสพนักงาน', 'แตะเลือกวันและเวลา = เสร็จเรียบร้อย!'].forEach((t, i) => {
      const sy = qY + 160 + i * 74;
      circle(ctx, qX + 76, sy - 11, 26, ['#10a37f', '#0ea5e9', '#f59e0b'][i]);
      ctx.fillStyle = '#fff'; ctx.font = `700 28px ${PF}`; ctx.textAlign = 'center'; ctx.fillText(String(i + 1), qX + 76, sy - 1); ctx.textAlign = 'left';
      ctx.fillStyle = '#0d1f1a'; ctx.font = `500 31px ${PF}`; ctx.fillText(t, qX + 122, sy);
    });
    const qs = 320, qx = qX + qW - qs - 40, qy = qY + 36;
    const g2 = ctx.createLinearGradient(qx, qy, qx + qs, qy + qs); g2.addColorStop(0, '#34c79a'); g2.addColorStop(1, '#0e8a6a');
    ctx.fillStyle = g2; roundRect(ctx, qx - 14, qy - 14, qs + 28, qs + 28, 30); ctx.fill();
    ctx.fillStyle = '#fff'; roundRect(ctx, qx - 4, qy - 4, qs + 8, qs + 8, 22); ctx.fill();
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(renderQR(document.createElement('canvas'), actUrl(a.id), 1200), qx, qy, qs, qs);
    ctx.imageSmoothingEnabled = true;
    pill(ctx, qx + qs / 2 - 92, qY - 30, 'สแกนเลย!', 30, '#f59e0b', '#fff');

    // แถบท้าย
    const fg = ctx.createLinearGradient(0, H - 100, W, H); fg.addColorStop(0, '#053b33'); fg.addColorStop(1, '#0e8a6a');
    ctx.fillStyle = fg; ctx.fillRect(0, H - 96, W, 96);
    ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.font = `600 26px ${PF}`;
    ctx.fillText('Green Somdej · ลงทะเบียนและดูประวัติกิจกรรมสิ่งแวดล้อมของคุณ', W / 2, H - 54);
    ctx.globalAlpha = 0.7; ctx.font = `400 19px ${PF}`; ctx.fillText(actUrl(a.id), W / 2, H - 22); ctx.globalAlpha = 1; ctx.textAlign = 'left';
    return c;
  }

  /** โปสเตอร์สี่เหลี่ยมจัตุรัส (1080×1080) สำหรับ LINE / Facebook */
  function posterSquare(a, msg) {
    const W = 1080, H = 1080;
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const ctx = c.getContext('2d');
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#053b33'); bg.addColorStop(0.55, '#0e8a6a'); bg.addColorStop(1, '#0891b2');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    circle(ctx, W - 40, 60, 260, 'rgba(255,255,255,.08)');
    circle(ctx, 120, H - 40, 220, 'rgba(255,255,255,.06)');
    plumeria(ctx, W - 110, 120, 50, 0.4, 0.95);
    plumeria(ctx, W - 190, 190, 26, 1.2, 0.85);
    leafShape(ctx, W - 60, 300, 1, 0.5, 'rgba(255,255,255,.14)');

    drawLogoHeader(ctx, 56, 48, 76, false);
    pill(ctx, 56, 156, inviteText(a), 26, 'rgba(255,255,255,.18)', '#fff');

    ctx.fillStyle = '#fff'; ctx.font = `700 62px ${PF}`;
    const title = wrapText(ctx, a.name, W - 112).slice(0, 2);
    title.forEach((l, i) => ctx.fillText(l, 56, 290 + i * 78));
    let y = 290 + (title.length - 1) * 78 + 66;
    ctx.font = `500 30px ${PF}`; ctx.fillStyle = 'rgba(255,255,255,.95)';
    const info = [`วันที่  ${dateRange(a)}`].concat(slotLines(a, 2).map((s) => `เวลา  ${s}`));
    if (a.location) info.push(`สถานที่  ${a.location}`);
    info.slice(0, 4).forEach((t) => { ctx.fillText(wrapText(ctx, t, W - 112)[0], 56, y); y += 46; });

    const mW = 330, mH = 400, mX = 56, mY = H - mH - 56;
    drawMascotCard(ctx, mX, mY, mW, mH, 34);
    speechBubble(ctx, mX + mW - 20, mY - 10, 300, 112, mX + mW - 40, mY + 110, msg, 30);

    const qs = 300, qx = W - qs - 76, qy = H - qs - 116;
    shadowed(ctx, 40, 14, 'rgba(0,0,0,.25)', () => { ctx.fillStyle = '#fff'; roundRect(ctx, qx - 24, qy - 24, qs + 48, qs + 104, 32); ctx.fill(); });
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(renderQR(document.createElement('canvas'), actUrl(a.id), 1200), qx, qy, qs, qs);
    ctx.imageSmoothingEnabled = true;
    ctx.fillStyle = '#0b6b55'; ctx.font = `700 30px ${PF}`; ctx.textAlign = 'center';
    ctx.fillText('สแกนลงทะเบียน', qx + qs / 2, qy + qs + 54); ctx.textAlign = 'left';
    return c;
  }

  const POSTER_FORMATS = {
    a4: { label: 'A4 แนวตั้ง', sub: 'พิมพ์ติดบอร์ด', build: posterA4, suffix: 'A4' },
    square: { label: 'สี่เหลี่ยม', sub: 'LINE / Facebook', build: posterSquare, suffix: 'โซเชียล' }
  };
  const poster = { a: null, fmt: 'a4', msg: MASCOT_MSG, blob: null, url: null, timer: null };

  async function openPosterModal(a) {
    poster.a = a; poster.blob = null;
    openModal(`
      <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
        <div style="display:flex;gap:12px;align-items:center">
          <img src="mascot/leelawadee-wave.jpg" alt="" width="52" height="52" style="border-radius:50%;object-fit:cover;box-shadow:0 0 0 3px var(--brand-100)">
          <div><h3>โปสเตอร์ประชาสัมพันธ์</h3><p class="muted" style="margin:0;font-size:13.5px">พรีเซ็นเตอร์: น้องลีลาวดี · ${esc(a.name)}</p></div>
        </div>
        <button class="icon-btn" data-action="closeModal" aria-label="ปิด">${ic('x')}</button>
      </div>
      <div class="poster-tools">
        <div class="seg" id="poster-seg">${Object.entries(POSTER_FORMATS).map(([k, f]) =>
          `<button class="${poster.fmt === k ? 'on' : ''}" data-action="posterFmt" data-v="${k}">${f.label} <span class="muted">· ${f.sub}</span></button>`).join('')}</div>
        <div class="field" style="margin:0">
          <label for="poster-msg">คำพูดของน้องลีลาวดี</label>
          <textarea class="input" id="poster-msg" rows="2" maxlength="60" style="resize:none">${esc(poster.msg)}</textarea>
        </div>
      </div>
      <div class="poster-preview" id="poster-preview"><span class="spinner" style="color:var(--brand-500)"></span></div>
      <div class="qr-actions" style="margin-top:14px">
        <button class="btn btn-primary ${navigator.canShare ? '' : 'full'}" data-action="posterDownload">${ic('download')} ดาวน์โหลดโปสเตอร์ (PNG)</button>
        ${navigator.canShare ? `<button class="btn btn-ghost" data-action="posterShare">${ic('share')} แชร์ไป LINE / อื่นๆ</button>` : ''}
      </div>`, 'wide');
    document.getElementById('poster-msg').addEventListener('input', (e) => {
      poster.msg = e.target.value;
      clearTimeout(poster.timer); poster.timer = setTimeout(renderPosterPreview, 450);
    });
    renderPosterPreview();
  }

  async function renderPosterPreview() {
    const box = document.getElementById('poster-preview');
    if (!box || !poster.a) return;
    box.classList.add('busy');
    await posterAssets();
    try {
      const canvas = POSTER_FORMATS[poster.fmt].build(poster.a, poster.msg.trim() || MASCOT_MSG);
      poster.blob = await canvasToBlob(canvas);
      if (poster.url) URL.revokeObjectURL(poster.url);
      poster.url = URL.createObjectURL(poster.blob);
      if (!document.body.contains(box)) return;
      box.innerHTML = `<img src="${poster.url}" alt="ตัวอย่างโปสเตอร์" class="${poster.fmt}">`;
    } catch (e) {
      box.innerHTML = `<p class="muted">${esc(e.message)}</p>`;
    }
    box.classList.remove('busy');
  }

  const posterFileName = () => `โปสเตอร์_${POSTER_FORMATS[poster.fmt].suffix}_${safeFile(poster.a.name)}.png`;

  function openQrModal(a) {
    openModal(`
      <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
        <div><h3>QR Code ลงทะเบียน</h3><p class="muted" style="margin:2px 0 0;font-size:14px">${esc(a.name)}</p></div>
        <button class="icon-btn" data-action="closeModal" aria-label="ปิด">${ic('x')}</button>
      </div>
      <div class="qr-frame"><canvas id="qr-modal-canvas" width="600" height="600"></canvas></div>
      <div class="qr-url" style="text-align:center">${esc(actUrl(a.id))}</div>
      <div class="qr-actions">
        <button class="btn btn-primary full" data-action="downloadQr" data-id="${esc(a.id)}">${ic('download')} ดาวน์โหลด QR (PNG HD)</button>
        <button class="btn btn-ghost" data-action="poster" data-id="${esc(a.id)}">${ic('image')} โปสเตอร์</button>
        <button class="btn btn-ghost" data-action="copyLink" data-id="${esc(a.id)}">${ic('copy')} คัดลอกลิงก์</button>
      </div>`);
    drawQRInto(document.getElementById('qr-modal-canvas'), actUrl(a.id));
  }

  /* ============================ HISTORY ============================ */
  async function renderHistory() {
    view.innerHTML = `<h1 class="page-title">ประวัติการเข้าร่วมกิจกรรม</h1><p class="page-sub">${esc(state.user.name)} · ${esc(state.user.deptName || '')}</p>
      <div class="stats" style="margin-top:20px">${Array.from({ length: 4 }).map(() => '<div class="skeleton" style="height:86px"></div>').join('')}</div>
      <div class="skeleton" style="height:300px;margin-top:20px"></div>`;
    const h = await loadHistory(true);
    if (state.route !== 'history') return;
    const st = h.stats;
    const counts = { all: h.items.length, upcoming: 0, attended: 0, missed: 0 };
    h.items.forEach((i) => { counts[i.status] = (counts[i.status] || 0) + 1; });
    const typeEntries = Object.entries(st.byType || {}).sort((x, y) => y[1] - x[1]);
    const maxType = Math.max(1, ...typeEntries.map((e) => e[1]));

    const draw = () => {
      const f = state.histFilter;
      const list = h.items.filter((i) => f === 'all' || i.status === f);
      document.getElementById('hist-seg').innerHTML = [['all', 'ทั้งหมด'], ['upcoming', 'กำลังจะมาถึง'], ['attended', 'เข้าร่วมแล้ว'], ['missed', 'ไม่ได้เช็คอิน']]
        .filter(([k]) => k === 'all' || counts[k])
        .map(([k, l]) => `<button class="${f === k ? 'on' : ''}" data-action="filterHist" data-v="${k}">${l} <span class="muted">${counts[k] || 0}</span></button>`).join('');
      document.getElementById('hist-list').innerHTML = list.length ? list.map(tlItemHtml).join('')
        : emptyHtml('history', 'ยังไม่มีประวัติในหมวดนี้', 'เริ่มลงทะเบียนกิจกรรมแรกของคุณได้เลย', '<a class="btn btn-primary" href="#/activities">ดูกิจกรรม</a>');
    };

    view.innerHTML = `
      <div class="section-head" style="align-items:center;flex-wrap:wrap">
        <div><h1 class="page-title">ประวัติการเข้าร่วมกิจกรรม</h1><p class="page-sub">${esc(h.user.name)} · ${esc(h.user.deptName || '')} · รหัส ${esc(h.user.employeeId)}</p></div>
        <a class="btn btn-primary" href="#/activities">${ic('calendar')} ลงทะเบียนกิจกรรมเพิ่ม</a>
      </div>
      <div class="stats" style="margin-top:12px">
        <div class="stat"><span class="si si-green">${ic('award')}</span><div><b>${st.attended}</b><span>เข้าร่วมแล้ว</span></div></div>
        <div class="stat"><span class="si si-blue">${ic('calCheck')}</span><div><b>${st.thisYear}</b><span>เข้าร่วมปี ${new Date().getFullYear() + 543}</span></div></div>
        <div class="stat"><span class="si si-amber">${ic('clock')}</span><div><b>${st.upcoming}</b><span>กำลังจะมาถึง</span></div></div>
        <div class="stat"><span class="si si-violet">${ic('history')}</span><div><b>${st.total}</b><span>ลงทะเบียนทั้งหมด</span></div></div>
      </div>
      <div class="detail-grid hist-grid">
        <section>
          <div class="seg" id="hist-seg"></div>
          <div class="timeline" id="hist-list"></div>
        </section>
        <aside class="card card-pad">
          <h2 class="card-title">${ic('leaf')} ตามประเภทกิจกรรม</h2>
          ${typeEntries.length ? `<div class="type-bars">${typeEntries.map(([t, n]) => `
            <div class="type-bar"><span>${esc(t)}</span><span class="track"><i style="width:${Math.round(n / maxType * 100)}%;background:${typeInfo(t).color}"></i></span><b>${n}</b></div>`).join('')}</div>`
            : '<p class="muted" style="font-size:13.5px">ยังไม่มีกิจกรรมที่เข้าร่วมแล้ว</p>'}
          <div class="tip" style="margin-top:18px">${ic('info')}<div>รวมกิจกรรมที่ลงทะเบียนผ่านแอปนี้ หน้าเว็บเดิม และการลงทะเบียนหน้างาน โดยอ้างอิงรหัสพนักงาน</div></div>
        </aside>
      </div>`;
    draw();
    state.redrawHist = draw;
  }

  function tlItemHtml(i) {
    const t = typeInfo(i.type); const d = parseD(i.date);
    const pill = i.status === 'upcoming' ? `<span class="pill pill-info">${relDay(i.date) || 'ลงทะเบียนแล้ว'}</span>`
      : i.status === 'missed' ? '<span class="pill pill-bad">ไม่ได้เช็คอิน</span>'
      : `<span class="pill pill-ok">${ic('check', 'ic-sm')} ${i.checkedIn ? 'เช็คอินแล้ว' : 'เข้าร่วมแล้ว'}</span>`;
    const time = i.start ? `${i.start}–${i.end} น.` : (i.slotLabel && /\d{2}:\d{2}/.test(i.slotLabel) ? i.slotLabel.replace(/^\S+\s/, '') : '');
    return `<div class="tl-item" data-action="open" data-id="${esc(i.activityId)}">
      <div class="tl-date ${t.cls}"><b>${d ? d.getDate() : '-'}</b><span>${d ? MON[d.getMonth()] + ' ' + String(d.getFullYear() + 543).slice(2) : ''}</span></div>
      <div class="tl-main"><h4>${esc(i.activityName)}</h4>
        <div class="meta">${ic(t.icon, 'ic-sm')}<span>${esc(i.type || 'กิจกรรม')}</span>${time ? ` · ${ic('clock', 'ic-sm')}<span>${esc(time)}</span>` : ''}${i.location ? ` · ${ic('pin', 'ic-sm')}<span>${esc(i.location)}</span>` : ''}</div>
      </div>
      <div class="tl-side">${pill}
        ${i.evalUrl && i.status === 'attended' ? `<a class="btn btn-ghost btn-sm" href="${esc(i.evalUrl)}" target="_blank" rel="noopener" data-stop="1">${ic('star', 'ic-sm')} ประเมิน</a>` : ''}
      </div>
    </div>`;
  }

  /* ============================ PROFILE ============================ */
  async function renderProfile() {
    const u = state.user;
    const theme = LS.get('gs_theme') || 'auto';
    view.innerHTML = `
      <section class="card card-pad">
        <div class="profile-head">
          <span class="avatar xl">${esc(initials(u.name))}</span>
          <div style="flex:1;min-width:200px">
            <h1 style="font-size:24px">${esc(u.name)}</h1>
            <p class="muted" style="margin:2px 0 8px">${esc(u.deptName || '')}</p>
            <span class="pill pill-soft">รหัสพนักงาน ${esc(u.employeeId)}</span>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn btn-ghost" data-action="editProfile">${ic('edit')} แก้ไขข้อมูล</button>
            <button class="btn btn-ghost" data-action="changePw">${ic('lock')} เปลี่ยนรหัสผ่าน</button>
            <button class="btn btn-danger" data-action="logout">${ic('logout')} ออกจากระบบ</button>
          </div>
        </div>
        <dl class="kv">
          <dt>หน่วยงาน</dt><dd>${esc(u.deptName || '-')}</dd>
          <dt>อีเมล</dt><dd>${esc(u.email || '-')}</dd>
        </dl>
      </section>

      <section class="section">
        <div class="section-head"><div><h2>ดาวน์โหลดแอปลงเครื่อง</h2><p>ติดตั้งได้ทั้งคอมพิวเตอร์ (Windows / Mac) และมือถือ (Android / iPhone) ไม่ต้องผ่าน App Store</p></div></div>
        ${isStandalone() ? `<div class="tip ok">${ic('check')}<div>คุณกำลังใช้งานแอปที่ติดตั้งแล้ว</div></div>` : installCardHtml()}
        ${platformsHtml()}
      </section>

      <section class="section">
        <div class="section-head"><div><h2>การแสดงผล</h2></div></div>
        <div class="seg">
          ${[['auto', 'ตามระบบ'], ['light', 'สว่าง'], ['dark', 'มืด']].map(([k, l]) => `<button class="${theme === k ? 'on' : ''}" data-action="setTheme" data-v="${k}">${l}</button>`).join('')}
        </div>
        ${DEMO ? `<div style="margin-top:16px"><button class="btn btn-ghost btn-sm" data-action="resetDemo">ล้างข้อมูลโหมดสาธิต</button></div>` : ''}
      </section>
      <div class="footer">Green Somdej · เวอร์ชันเว็บแอป 2.0</div>`;
  }

  function platformsHtml() {
    return `<div class="platforms">
      <div class="platform"><h4>${ic('monitor')} คอมพิวเตอร์</h4><ol>
        <li>เปิดเว็บนี้ด้วย <b>Chrome</b> หรือ <b>Microsoft Edge</b></li>
        <li>กดปุ่ม <b>ดาวน์โหลดแอป</b> ด้านบน หรือไอคอน ${ic('install', 'ic-sm')} ในแถบที่อยู่</li>
        <li>กด <b>ติดตั้ง</b> — ไอคอนจะอยู่บนเดสก์ท็อปและเมนู Start</li></ol></div>
      <div class="platform"><h4>${ic('phone')} Android</h4><ol>
        <li>เปิดด้วย <b>Chrome</b></li>
        <li>กดปุ่ม <b>ดาวน์โหลดแอป</b> หรือเมนู ⋮ → <b>ติดตั้งแอป</b> / <b>เพิ่มลงในหน้าจอหลัก</b></li>
        <li>ไอคอนแอปจะอยู่บนหน้าจอหลัก</li></ol></div>
      <div class="platform"><h4>${ic('phone')} iPhone / iPad</h4><ol>
        <li>เปิดด้วย <b>Safari</b></li>
        <li>แตะปุ่ม <b>แชร์</b> ${ic('share', 'ic-sm')} ด้านล่าง</li>
        <li>เลือก <b>เพิ่มไปยังหน้าจอโฮม</b> แล้วแตะ <b>เพิ่ม</b></li></ol></div>
    </div>`;
  }

  function deptOptions(depts, selected) {
    return '<option value="">— เลือกหน่วยงาน —</option>' +
      depts.map((d) => `<option value="${esc(d.id)}" ${d.id === selected ? 'selected' : ''}>${esc(d.name)}</option>`).join('');
  }

  async function editProfile() {
    const depts = await loadDepts();
    const u = state.user;
    openModal(`<h3>แก้ไขข้อมูลส่วนตัว</h3>
      <form id="pf-form" style="margin-top:16px">
        <div class="form-error" id="pf-err"></div>
        <div class="field"><label>ชื่อ-นามสกุล</label><input class="input" name="name" value="${esc(u.name)}" required></div>
        <div class="field"><label>หน่วยงาน</label><select class="input" name="deptId">${deptOptions(depts, u.deptId)}</select></div>
        <div class="field"><label>อีเมล (ไม่บังคับ)</label><input class="input" name="email" type="email" value="${esc(u.email)}" placeholder="ใช้รับลิงก์แบบประเมิน"></div>
        <div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="closeModal">ยกเลิก</button><button class="btn btn-primary">บันทึก</button></div>
      </form>`);
    bindForm('pf-form', 'pf-err', async (f) => {
      const user = await api('updateProfile', { name: f.name.value, deptId: f.deptId.value, email: f.email.value });
      state.user = user; LS.set('gs_user', user); state.history = null;
      closeModal(); toast('บันทึกข้อมูลแล้ว', 'ok'); route();
    });
  }

  function changePw() {
    openModal(`<h3>เปลี่ยนรหัสผ่าน</h3>
      <form id="pw-form" style="margin-top:16px">
        <div class="form-error" id="pw-err"></div>
        <div class="field"><label>รหัสผ่านเดิม</label>${pwInput('oldPassword', 'current-password')}</div>
        <div class="field"><label>รหัสผ่านใหม่ (อย่างน้อย 6 ตัวอักษร)</label>${pwInput('newPassword', 'new-password')}</div>
        <div class="field"><label>ยืนยันรหัสผ่านใหม่</label>${pwInput('confirm', 'new-password')}</div>
        <div class="modal-actions"><button type="button" class="btn btn-ghost" data-action="closeModal">ยกเลิก</button><button class="btn btn-primary">เปลี่ยนรหัสผ่าน</button></div>
      </form>`);
    bindForm('pw-form', 'pw-err', async (f) => {
      if (f.newPassword.value !== f.confirm.value) throw new Error('รหัสผ่านใหม่ทั้งสองช่องไม่ตรงกัน');
      const r = await api('changePassword', { oldPassword: f.oldPassword.value, newPassword: f.newPassword.value });
      state.token = r.token; LS.set('gs_token', r.token);
      closeModal(); toast('เปลี่ยนรหัสผ่านแล้ว', 'ok');
    });
  }

  /* ============================= AUTH ============================= */
  const pwInput = (name, ac) => `<div class="input-wrap"><input class="input" type="password" name="${name}" autocomplete="${ac}" required>
    <button type="button" class="eye" data-action="togglePw" aria-label="แสดงรหัสผ่าน">${ic('eye', 'ic-sm')}</button></div>`;

  async function renderLogin(mode) {
    mode = mode === 'signup' ? 'signup' : 'login';
    const lastEmp = LS.get('gs_last_emp') || '';
    view.innerHTML = `
      <div class="auth">
        <div class="auth-art">
          <svg class="leaf-bg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width=".8">${ICONS.leaf}</svg>
          <div>
            <span class="pill pill-glass">${ic('leaf', 'ic-sm')} Green Somdej Hospital</span>
            <h1>ลงทะเบียนกิจกรรม<br>สิ่งแวดล้อม ง่ายในคลิกเดียว</h1>
            <p>เข้าสู่ระบบด้วยรหัสพนักงาน ระบบจำข้อมูลของคุณไว้ ไม่ต้องกรอกชื่อซ้ำทุกครั้ง</p>
            <div class="features">
              <div class="feat"><i>${ic('clock', 'ic-sm')}</i> แตะเลือกวันและเวลา = ลงทะเบียนทันที</div>
              <div class="feat"><i>${ic('history', 'ic-sm')}</i> ดูประวัติการเข้าร่วมกิจกรรมของตนเอง</div>
              <div class="feat"><i>${ic('qr', 'ic-sm')}</i> QR Code ประจำกิจกรรม ดาวน์โหลดได้</div>
              <div class="feat"><i>${ic('install', 'ic-sm')}</i> ติดตั้งเป็นแอปบนคอมพิวเตอร์และมือถือ</div>
            </div>
          </div>
          <small style="opacity:.7;position:relative">© Green Somdej</small>
        </div>
        <div class="auth-form">
          <h2>${mode === 'login' ? 'ยินดีต้อนรับกลับมา' : 'เริ่มใช้งานครั้งแรก'}</h2>
          <p class="muted" style="margin:4px 0 0">${mode === 'login' ? 'เข้าสู่ระบบด้วยรหัสพนักงาน 7 หลัก' : 'ตั้งรหัสผ่านครั้งเดียว ใช้ได้ทุกกิจกรรม'}</p>
          <div class="tabs2">
            <button class="${mode === 'login' ? 'on' : ''}" data-action="authMode" data-v="login">เข้าสู่ระบบ</button>
            <button class="${mode === 'signup' ? 'on' : ''}" data-action="authMode" data-v="signup">ใช้งานครั้งแรก</button>
          </div>
          ${mode === 'login' ? `
          <form id="login-form" novalidate>
            <div class="form-error" id="auth-err"></div>
            <div class="field"><label for="lg-id">รหัสพนักงาน</label>
              <input class="input code" id="lg-id" name="employeeId" inputmode="numeric" maxlength="7" placeholder="0000000" autocomplete="username" value="${esc(lastEmp)}" required></div>
            <div class="field"><label>รหัสผ่าน</label>${pwInput('password', 'current-password')}</div>
            <button class="btn btn-primary btn-lg btn-block" style="margin-top:6px">${ic('user')} เข้าสู่ระบบ</button>
            <p class="muted" style="font-size:13px;text-align:center;margin-top:14px">ลืมรหัสผ่าน? ติดต่อผู้ดูแลระบบเพื่อรีเซ็ต แล้วเลือก "ใช้งานครั้งแรก"</p>
          </form>` : `
          <form id="signup-form" novalidate>
            <div class="form-error" id="auth-err"></div>
            <div class="field"><label for="su-id">รหัสพนักงาน (7 หลัก)</label>
              <input class="input code" id="su-id" name="employeeId" inputmode="numeric" maxlength="7" placeholder="0000000" autocomplete="username" required>
              <span class="hint" id="su-hint">กรอกรหัสแล้ว ระบบจะดึงชื่อ-หน่วยงานที่เคยลงทะเบียนไว้ให้อัตโนมัติ</span></div>
            <div id="su-note"></div>
            <div class="field"><label>ชื่อ-นามสกุล</label><input class="input" name="name" autocomplete="name" placeholder="เช่น สมชาย ใจดี" required></div>
            <div class="field"><label>หน่วยงาน</label><select class="input" name="deptId" id="su-dept"><option value="">กำลังโหลด...</option></select></div>
            <div class="field"><label>อีเมล (ไม่บังคับ)</label><input class="input" name="email" type="email" autocomplete="email" placeholder="ใช้รับลิงก์แบบประเมินหลังจบกิจกรรม"></div>
            <div class="row2">
              <div class="field"><label>ตั้งรหัสผ่าน</label>${pwInput('password', 'new-password')}</div>
              <div class="field"><label>ยืนยันรหัสผ่าน</label>${pwInput('confirm', 'new-password')}</div>
            </div>
            <span class="hint" style="display:block;margin:-6px 0 14px;font-size:12.5px;color:var(--muted)">อย่างน้อย 6 ตัวอักษร</span>
            <button class="btn btn-primary btn-lg btn-block">${ic('check')} สร้างบัญชีและเข้าสู่ระบบ</button>
          </form>`}
        </div>
      </div>`;

    view.querySelectorAll('input[inputmode="numeric"]').forEach((el) => el.addEventListener('input', () => { el.value = el.value.replace(/\D/g, '').slice(0, 7); }));

    if (mode === 'login') {
      const f = document.getElementById('login-form');
      (lastEmp ? f.password : f.employeeId).focus();
      bindForm('login-form', 'auth-err', async (f) => {
        if (!/^\d{7}$/.test(f.employeeId.value)) throw new Error('กรุณากรอกรหัสพนักงานให้ครบ 7 หลัก');
        if (!f.password.value) throw new Error('กรุณากรอกรหัสผ่าน');
        try {
          const r = await api('login', { employeeId: f.employeeId.value, password: f.password.value });
          afterLogin(r);
        } catch (e) {
          if (e.code === 'NO_ACCOUNT') { LS.set('gs_last_emp', f.employeeId.value); go('login/signup'); toast(e.message); return; }
          throw e;
        }
      });
    } else {
      const f = document.getElementById('signup-form');
      f.employeeId.focus();
      loadDepts().then((d) => { const sel = document.getElementById('su-dept'); if (sel) { const v = sel.value; sel.innerHTML = deptOptions(d, v || sel.dataset.want); } })
        .catch((e) => toast(e.message, 'err'));
      let lastLookup = '';
      const lookup = async () => {
        const id = f.employeeId.value;
        const note = document.getElementById('su-note');
        if (id.length !== 7) { lastLookup = ''; note.innerHTML = ''; return; }
        if (id === lastLookup) return;
        lastLookup = id;
        note.innerHTML = `<div class="autofill-note" style="background:var(--bg-soft);color:var(--muted)"><span class="spinner" style="width:16px;height:16px"></span> กำลังค้นหาข้อมูล...</div>`;
        try {
          const r = await api('lookupEmployee', { employeeId: id });
          if (f.employeeId.value !== id) return;
          if (r.hasAccount) {
            note.innerHTML = `<div class="tip warn" style="margin:0 0 14px">${ic('info')}<div>รหัสนี้มีบัญชีแล้ว (${esc(r.name)}) <a href="#/login" data-action="authMode" data-v="login"><b>เข้าสู่ระบบที่นี่</b></a></div></div>`;
            LS.set('gs_last_emp', id);
          } else if (r.found) {
            f.name.value = r.name || '';
            const sel = document.getElementById('su-dept');
            sel.dataset.want = r.deptId || '';
            if (sel.querySelector(`option[value="${CSS.escape(r.deptId || '')}"]`)) sel.value = r.deptId;
            note.innerHTML = `<div class="autofill-note">${ic('check', 'ic-sm')} พบข้อมูลจากการลงทะเบียนครั้งก่อน — เติมชื่อและหน่วยงานให้อัตโนมัติแล้ว</div>`;
            f.password.focus();
          } else {
            note.innerHTML = '';
            f.name.focus();
          }
        } catch (e) { note.innerHTML = ''; lastLookup = ''; }
      };
      f.employeeId.addEventListener('input', lookup);
      const pre = LS.get('gs_last_emp');
      if (pre && !state.token) { f.employeeId.value = pre; lookup(); }
      bindForm('signup-form', 'auth-err', async (f) => {
        if (!/^\d{7}$/.test(f.employeeId.value)) throw new Error('กรุณากรอกรหัสพนักงานให้ครบ 7 หลัก');
        if (!f.name.value.trim()) throw new Error('กรุณากรอกชื่อ-นามสกุล');
        if (!f.deptId.value) throw new Error('กรุณาเลือกหน่วยงาน');
        if (f.password.value.length < 6) throw new Error('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
        if (f.password.value !== f.confirm.value) throw new Error('รหัสผ่านทั้งสองช่องไม่ตรงกัน');
        const r = await api('signup', { employeeId: f.employeeId.value, name: f.name.value, deptId: f.deptId.value, email: f.email.value, password: f.password.value });
        afterLogin(r, true);
      });
    }
  }

  function afterLogin(r, isNew) {
    setSession(r.token, r.user);
    toast(isNew ? `ยินดีต้อนรับ คุณ${firstName(r.user.name)} — สร้างบัญชีเรียบร้อย` : `ยินดีต้อนรับกลับ คุณ${firstName(r.user.name)}`, 'ok');
    const back = state.returnTo && !/login/.test(state.returnTo) ? state.returnTo : '#/home';
    state.returnTo = null;
    location.hash = back;
  }

  function bindForm(formId, errId, handler) {
    const f = document.getElementById(formId);
    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      const err = document.getElementById(errId);
      err.classList.remove('show');
      const btn = f.querySelector('button:not([type="button"])');
      const html = btn.innerHTML;
      btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> กำลังดำเนินการ...';
      try { await handler(f); } catch (ex) {
        err.textContent = ex.message; void err.offsetWidth; err.classList.add('show');
      } finally { if (document.body.contains(btn)) { btn.disabled = false; btn.innerHTML = html; } }
    });
  }

  /* ========================= MODAL / TOAST ========================= */
  let modalResolve = null;
  function openModal(html, cls) {
    document.getElementById('modal-root').innerHTML = `<div class="modal-back" data-action="backdrop"><div class="modal ${cls || ''}" role="dialog" aria-modal="true">${html}</div></div>`;
  }
  function closeModal() {
    document.getElementById('modal-root').innerHTML = '';
    if (modalResolve) { modalResolve(false); modalResolve = null; }
  }
  function confirmModal(title, body, okText, danger) {
    return new Promise((resolve) => {
      openModal(`<h3>${title}</h3><p style="margin-top:10px">${body}</p>
        <div class="modal-actions"><button class="btn btn-ghost" data-action="closeModal">ไม่ใช่ตอนนี้</button>
        <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" data-action="confirmOk">${okText}</button></div>`);
      modalResolve = resolve;
    });
  }
  function toast(msg, kind) {
    const root = document.getElementById('toast-root');
    const el = document.createElement('div');
    el.className = 'toast ' + (kind || '');
    el.innerHTML = `${ic(kind === 'err' ? 'alert' : kind === 'ok' ? 'check' : 'info')}<span>${esc(msg)}</span>`;
    root.appendChild(el);
    setTimeout(() => { el.style.transition = 'opacity .3s'; el.style.opacity = '0'; setTimeout(() => el.remove(), 320); }, kind === 'err' ? 5000 : 3200);
  }

  /* =========================== INSTALL =========================== */
  let deferredPrompt = null;
  const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; });
  window.addEventListener('appinstalled', () => { deferredPrompt = null; toast('ติดตั้งแอปเรียบร้อยแล้ว', 'ok'); renderChrome(); });

  async function doInstall() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      try { await deferredPrompt.userChoice; } catch (e) { /* ignore */ }
      deferredPrompt = null;
      return;
    }
    openModal(`<div style="display:flex;justify-content:space-between;gap:10px">
        <div style="display:flex;gap:14px;align-items:center"><img src="icons/icon-192.png" width="56" height="56" style="border-radius:16px" alt="">
        <div><h3>ติดตั้งแอป Green Somdej</h3><p class="muted" style="margin:0;font-size:13.5px">${isIOS() ? 'สำหรับ iPhone / iPad' : 'ทำตามขั้นตอนตามอุปกรณ์ของคุณ'}</p></div></div>
        <button class="icon-btn" data-action="closeModal" aria-label="ปิด">${ic('x')}</button></div>
      ${isIOS() ? `<ol style="margin-top:18px;display:grid;gap:8px;padding-left:20px">
          <li>เปิดหน้านี้ด้วย <b>Safari</b></li>
          <li>แตะปุ่ม <b>แชร์</b> ${ic('share', 'ic-sm')} ที่แถบด้านล่าง</li>
          <li>เลื่อนหา <b>เพิ่มไปยังหน้าจอโฮม</b> แล้วแตะ <b>เพิ่ม</b></li></ol>`
        : `<div style="margin-top:6px">${platformsHtml().replace('class="platforms"', 'class="platforms" style="grid-template-columns:1fr"')}</div>`}`);
  }

  /* ============================ THEME ============================ */
  function resolvedTheme() {
    const t = LS.get('gs_theme') || 'auto';
    if (t !== 'auto') return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function applyTheme() {
    const t = LS.get('gs_theme') || 'auto';
    if (t === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
  }

  /* ============================ ACTIONS ============================ */
  const findAct = (id) => (state.current && state.current.id === id ? state.current : (state.acts || []).find((a) => a.id === id));
  const ACTIONS = {
    open: (el) => go('act/' + encodeURIComponent(el.dataset.id)),
    qr: (el) => { const a = findAct(el.dataset.id); if (a) openQrModal(a); },
    slot: (el) => onSlot(el),
    cancel: () => onCancel(),
    ics: () => downloadIcs(),
    downloadQr: (el) => { const a = findAct(el.dataset.id) || state.current; if (a) downloadQr(a).catch((e) => toast(e.message, 'err')); },
    poster: (el) => { const a = findAct(el.dataset.id) || state.current; if (a) openPosterModal(a); },
    posterFmt: (el) => {
      poster.fmt = el.dataset.v;
      document.querySelectorAll('#poster-seg button').forEach((b) => b.classList.toggle('on', b.dataset.v === poster.fmt));
      renderPosterPreview();
    },
    posterDownload: async () => {
      if (!poster.blob) await renderPosterPreview();
      if (!poster.blob) return;
      saveBlob(poster.blob, posterFileName());
      toast('ดาวน์โหลดโปสเตอร์แล้ว', 'ok');
    },
    posterShare: async () => {
      if (!poster.blob) await renderPosterPreview();
      const file = new File([poster.blob], posterFileName(), { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], title: poster.a.name, text: `ร่วมกิจกรรม: ${poster.a.name}\nลงทะเบียน: ${actUrl(poster.a.id)}` }).catch(() => {});
      } else {
        saveBlob(poster.blob, posterFileName());
        toast('อุปกรณ์นี้แชร์ไฟล์ไม่ได้ — ดาวน์โหลดให้แทนแล้ว');
      }
    },
    copyLink: async (el) => {
      const a = findAct(el.dataset.id) || state.current; if (!a) return;
      try { await navigator.clipboard.writeText(actUrl(a.id)); toast('คัดลอกลิงก์แล้ว', 'ok'); }
      catch (e) { window.prompt('คัดลอกลิงก์นี้', actUrl(a.id)); }
    },
    share: () => { const a = state.current; if (a && navigator.share) navigator.share({ title: a.name, text: `ลงทะเบียนกิจกรรม: ${a.name}`, url: actUrl(a.id) }).catch(() => {}); },
    gotoLogin: () => { state.returnTo = location.hash; go('login'); },
    authMode: (el) => go(el.dataset.v === 'signup' ? 'login/signup' : 'login'),
    togglePw: (el) => {
      const input = el.parentElement.querySelector('input');
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      el.innerHTML = ic(show ? 'eyeOff' : 'eye', 'ic-sm');
    },
    filterHist: (el) => { state.histFilter = el.dataset.v; if (state.redrawHist) state.redrawHist(); },
    filterType: (el) => { state.typeFilter = el.dataset.v; if (state.redrawActs) state.redrawActs(); },
    install: () => doInstall(),
    toggleTheme: () => { LS.set('gs_theme', resolvedTheme() === 'dark' ? 'light' : 'dark'); applyTheme(); renderChrome(); },
    setTheme: (el) => { LS.set('gs_theme', el.dataset.v); applyTheme(); renderChrome(); renderProfile(); },
    editProfile: () => editProfile().catch((e) => toast(e.message, 'err')),
    changePw: () => changePw(),
    logout: async () => {
      const ok = await confirmModal('ออกจากระบบ?', 'คุณสามารถเข้าสู่ระบบใหม่ได้ทุกเมื่อด้วยรหัสพนักงาน', 'ออกจากระบบ', true);
      if (!ok) return;
      clearSession(); toast('ออกจากระบบแล้ว'); go('home');
    },
    resetDemo: () => { window.MockApi.reset(); clearSession(); LS.del('gs_last_emp'); LS.del('gs_depts'); state.depts = null; toast('ล้างข้อมูลสาธิตแล้ว', 'ok'); go('home'); },
    closeModal: () => closeModal(),
    confirmOk: () => { const r = modalResolve; modalResolve = null; closeModal(); if (r) r(true); },
    backdrop: (el, e) => { if (e.target === el) closeModal(); },
    scrollQr: () => { const q = document.querySelector('.qr-card'); if (q) q.scrollIntoView({ behavior: 'smooth', block: 'start' }); },
    reload: () => route()
  };

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-stop]')) return;
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const fn = ACTIONS[el.dataset.action];
    if (!fn) return;
    if (el.dataset.action === 'backdrop') { fn(el, e); return; }
    e.preventDefault(); e.stopPropagation();
    fn(el, e);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.act-card')) { e.preventDefault(); e.target.click(); }
  });

  /* ============================= BOOT ============================= */
  const ROUTES = { home: renderHome, activities: renderActivities, act: renderDetail, history: renderHistory, profile: renderProfile, login: renderLogin };

  applyTheme();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => renderChrome());

  if (DEMO) {
    document.getElementById('demo-bar').innerHTML = `<div class="demo-bar">โหมดสาธิต — ข้อมูลตัวอย่างเก็บในเบราว์เซอร์นี้เท่านั้น · ลองรหัส <b>1234567</b> ที่ "ใช้งานครั้งแรก" เพื่อดูการเติมชื่ออัตโนมัติ</div>`;
  }

  // ลิงก์จาก QR: ?act=ID → เปิดหน้ากิจกรรมนั้น
  const qs = new URLSearchParams(location.search);
  if (qs.get('act')) {
    history.replaceState(null, '', location.pathname + '#/act/' + encodeURIComponent(qs.get('act')));
  }

  window.addEventListener('hashchange', route);
  route();

  if (state.token) {
    api('me').then((u) => { state.user = u; LS.set('gs_user', u); renderChrome(); }).catch(() => {});
  }

  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
})();
