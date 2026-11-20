/* Monthly capacity: show places left, and switch the application to a waitlist when the
   month is full or paused. Set in Soforth Ops. If the check fails, the site stays open. */
(function () {
  var URL_ = window.SOFORTH_CAPACITY_URL || 'https://ops.asksoforth.com/api/public/capacity';
  var words = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

  function lineFor(s) {
    if (s.paused) return 'Applications are paused for now. Join the waitlist and we’ll write when a place opens.';
    if (!s.open) return s.month + ' is full. New applications join the ' + s.nextMonth + ' waitlist.';
    var n = s.remaining;
    var count = n < words.length ? words[n] : String(n);
    return 'We take a few founders each month. ' + count + (n === 1 ? ' place' : ' places') + ' left in ' + s.month + '.';
  }

  function apply(s) {
    window.SOFORTH_CAPACITY = s;
    document.querySelectorAll('[data-capacity-line]').forEach(function (el) {
      el.textContent = lineFor(s);
      el.hidden = false;
    });
    if (s.open) return;
    document.querySelectorAll('[data-capacity-waitlist]').forEach(function (el) {
      var text = el.getAttribute('data-capacity-waitlist');
      if (text) el.textContent = text;
    });
  }

  fetch(URL_, { mode: 'cors', credentials: 'omit' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (s) { if (s && !s.unknown && typeof s.open === 'boolean' && s.month) apply(s); })
    .catch(function () { /* stay open */ });
})();
