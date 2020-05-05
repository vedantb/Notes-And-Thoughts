/** TIP 4 */

/** Use Intl.DateTimeFormat() to create nicely formatted date and time strings */
/** */

const now = new Date();

new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(now);
//Tuesday, May 5, 2020
