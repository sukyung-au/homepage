/* @ds-bundle: {"format":4,"namespace":"OilGasDevelopmentDesignSystem_dcb6ae","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"TextLink","sourcePath":"components/buttons/TextLink.jsx"},{"name":"OptionChip","sourcePath":"components/cards/OptionChip.jsx"},{"name":"UtilityCard","sourcePath":"components/cards/UtilityCard.jsx"},{"name":"ArrowCTA","sourcePath":"components/explorer/ArrowCTA.jsx"},{"name":"DepthRuler","sourcePath":"components/explorer/DepthRuler.jsx"},{"name":"SiteHeader","sourcePath":"components/explorer/SiteHeader.jsx"},{"name":"StageNav","sourcePath":"components/explorer/StageNav.jsx"},{"name":"TechNav","sourcePath":"components/explorer/TechNav.jsx"},{"name":"TechViz","sourcePath":"components/explorer/TechViz.jsx"},{"name":"Footer","sourcePath":"components/footer/Footer.jsx"},{"name":"SearchInput","sourcePath":"components/forms/SearchInput.jsx"},{"name":"GlobalNav","sourcePath":"components/navigation/GlobalNav.jsx"},{"name":"SubNav","sourcePath":"components/navigation/SubNav.jsx"},{"name":"MediaFrame","sourcePath":"components/surfaces/MediaFrame.jsx"},{"name":"ProductTile","sourcePath":"components/surfaces/ProductTile.jsx"},{"name":"QuoteCard","sourcePath":"components/surfaces/QuoteCard.jsx"},{"name":"StickyBar","sourcePath":"components/surfaces/StickyBar.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"4f9290c97801","components/buttons/IconButton.jsx":"d5393363d7d9","components/buttons/TextLink.jsx":"55ba35850437","components/cards/OptionChip.jsx":"701dbf8aa7bb","components/cards/UtilityCard.jsx":"03fb6ee1e103","components/explorer/ArrowCTA.jsx":"16ed24ecbefb","components/explorer/DepthRuler.jsx":"3fd23135481b","components/explorer/SiteHeader.jsx":"796df9b4b4dd","components/explorer/StageNav.jsx":"6a3c406ea0b6","components/explorer/TechNav.jsx":"ed42b6e73d2c","components/explorer/TechViz.jsx":"e9e951de79b1","components/footer/Footer.jsx":"5443013f509c","components/forms/SearchInput.jsx":"d80216c78457","components/navigation/GlobalNav.jsx":"31a9196f5bc3","components/navigation/SubNav.jsx":"70abb5efa7d2","components/surfaces/MediaFrame.jsx":"a9e42015da88","components/surfaces/ProductTile.jsx":"1f1ae20e0e72","components/surfaces/QuoteCard.jsx":"045259dd124a","components/surfaces/StickyBar.jsx":"c1ff86c86648","ui_kits/explorer/DesignSystem.jsx":"46562470a39b","ui_kits/explorer/JourneyHome.jsx":"ee9d4c9bbcf7","ui_kits/explorer/Scenes.jsx":"9ec9a25ed2b9","ui_kits/explorer/Storyboard.jsx":"8c7a006b3cbe","ui_kits/explorer/Technical.jsx":"7634015548db","ui_kits/explorer/ds-standalone.js":"f2e16399b1fc","ui_kits/explorer/image-slot.js":"fff26d081c8d","ui_kits/explorer/stages.js":"cf8582d34c4c","ui_kits/website/App.jsx":"b283f9aa8765","ui_kits/website/Home.jsx":"6bda70731b1c","ui_kits/website/Operations.jsx":"7e09d5f29ebc","ui_kits/website/Sustainability.jsx":"eafa5242f42d","versions/v1/ui_kits/explorer/ds-standalone.js":"f2e16399b1fc","versions/v1/ui_kits/explorer/stages.js":"6127cc9ef92b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.OilGasDevelopmentDesignSystem_dcb6ae = window.OilGasDevelopmentDesignSystem_dcb6ae || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function usePress() {
  const [p, setP] = React.useState(false);
  return [p, {
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false),
    onMouseLeave: () => setP(false),
    onTouchStart: () => setP(true),
    onTouchEnd: () => setP(false)
  }];
}
const base = {
  fontFamily: 'var(--font-text)',
  border: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  whiteSpace: 'nowrap',
  transition: 'transform var(--dur-fast) var(--ease-standard)',
  textDecoration: 'none'
};
const variants = {
  primary: {
    background: 'var(--color-primary)',
    color: 'var(--color-on-primary)',
    borderRadius: 'var(--radius-pill)',
    padding: '11px 22px',
    fontSize: 17,
    fontWeight: 400,
    lineHeight: 1.18,
    letterSpacing: '-0.374px'
  },
  secondary: {
    background: 'transparent',
    color: 'var(--color-primary)',
    border: '1px solid var(--color-primary)',
    borderRadius: 'var(--radius-pill)',
    padding: '10px 21px',
    fontSize: 17,
    fontWeight: 400,
    lineHeight: 1.18,
    letterSpacing: '-0.374px'
  },
  'dark-utility': {
    background: 'var(--color-ink)',
    color: 'var(--color-on-dark)',
    borderRadius: 'var(--radius-sm)',
    padding: '8px 15px',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.29,
    letterSpacing: '-0.224px'
  },
  pearl: {
    background: 'var(--color-surface-pearl)',
    color: 'var(--color-ink-muted-80)',
    border: '3px solid var(--color-divider-soft)',
    borderRadius: 'var(--radius-md)',
    padding: '8px 14px',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.29,
    letterSpacing: '-0.224px'
  },
  'store-hero': {
    background: 'var(--color-primary)',
    color: 'var(--color-on-primary)',
    borderRadius: 'var(--radius-pill)',
    padding: '14px 28px',
    fontSize: 18,
    fontWeight: 300,
    lineHeight: 1
  }
};
function Button({
  variant = 'primary',
  onDark = false,
  disabled = false,
  href,
  children,
  style,
  onClick,
  type = 'button',
  ...rest
}) {
  const [pressed, h] = usePress();
  const [focus, setFocus] = React.useState(false);
  const v = {
    ...variants[variant]
  };
  if (variant === 'secondary' && onDark) {
    v.color = 'var(--color-primary-on-dark)';
    v.borderColor = 'var(--color-primary-on-dark)';
  }
  const s = {
    ...base,
    ...v,
    transform: pressed && !disabled ? 'var(--press-scale)' : 'none',
    outline: focus ? '2px solid var(--color-primary-focus)' : 'none',
    outlineOffset: 2,
    ...(disabled ? {
      opacity: 1,
      cursor: 'default',
      color: 'var(--color-ink-muted-48)',
      background: variant === 'secondary' ? 'transparent' : 'var(--color-divider-soft)',
      borderColor: 'var(--color-hairline)'
    } : {}),
    ...style
  };
  const props = {
    ...h,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: s,
    onClick: disabled ? undefined : onClick,
    ...rest
  };
  return href && !disabled ? /*#__PURE__*/React.createElement("a", _extends({
    href: href
  }, props), children) : /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled
  }, props), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function usePress() {
  const [p, setP] = React.useState(false);
  return [p, {
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false),
    onMouseLeave: () => setP(false),
    onTouchStart: () => setP(true),
    onTouchEnd: () => setP(false)
  }];
}
function IconButton({
  icon = 'x',
  label,
  size = 44,
  onDark = false,
  onClick,
  style
}) {
  const [p, h] = usePress();
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label || icon,
    onClick: onClick
  }, h, {
    style: {
      width: size,
      height: size,
      borderRadius: 'var(--radius-full)',
      border: 'none',
      background: onDark ? 'rgba(66,66,69,0.72)' : 'var(--color-surface-chip-translucent-a)',
      color: onDark ? 'var(--color-on-dark)' : 'var(--color-ink)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      backdropFilter: 'var(--blur-frosted)',
      WebkitBackdropFilter: 'var(--blur-frosted)',
      transform: p ? 'var(--press-scale)' : 'none',
      transition: 'transform var(--dur-fast) var(--ease-standard)',
      fontSize: Math.round(size * 0.41),
      ...style
    }
  }), /*#__PURE__*/React.createElement("i", {
    className: 'icon-' + icon,
    "aria-hidden": "true"
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/buttons/TextLink.jsx
try { (() => {
function TextLink({
  href = '#',
  onDark = false,
  chevron = false,
  underline = false,
  children,
  style,
  onClick
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onClick: onClick,
    style: {
      color: onDark ? 'var(--color-primary-on-dark)' : 'var(--color-primary)',
      textDecoration: underline ? 'underline' : 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      ...style
    }
  }, children, chevron && /*#__PURE__*/React.createElement("i", {
    className: "icon-chevron-right",
    "aria-hidden": "true",
    style: {
      fontSize: '0.85em'
    }
  }));
}
Object.assign(__ds_scope, { TextLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/TextLink.jsx", error: String((e && e.message) || e) }); }

// components/cards/OptionChip.jsx
try { (() => {
function OptionChip({
  label,
  detail,
  selected = false,
  thumb,
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      background: 'var(--color-canvas)',
      color: 'var(--color-ink)',
      border: selected ? '2px solid var(--color-primary-focus)' : '1px solid var(--color-hairline)',
      borderRadius: 'var(--radius-pill)',
      padding: selected ? '11px 15px' : '12px 16px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-text)',
      fontSize: 14,
      lineHeight: 1.43,
      letterSpacing: '-0.224px',
      cursor: 'pointer',
      textAlign: 'left',
      ...style
    }
  }, thumb && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: thumb,
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, label), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-ink-muted-48)'
    }
  }, detail));
}
Object.assign(__ds_scope, { OptionChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/OptionChip.jsx", error: String((e && e.message) || e) }); }

// components/explorer/ArrowCTA.jsx
try { (() => {
function ArrowCTA({
  children = 'Explore the Journey',
  onClick,
  href,
  tone = 'navy',
  direction = 'right',
  style
}) {
  const [p, setP] = React.useState(false);
  const bg = tone === 'blue' ? 'var(--ex-blue)' : tone === 'white' ? '#fff' : 'var(--ex-navy)';
  const fg = tone === 'white' ? 'var(--ex-navy)' : '#fff';
  const lbl = tone === 'white' ? '#fff' : 'var(--ex-navy)';
  const Tag = href ? 'a' : 'button';
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: onClick,
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false),
    onMouseLeave: () => setP(false),
    style: {
      all: 'unset',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 16,
      fontFamily: 'var(--font-editorial)',
      fontSize: 14,
      fontWeight: 600,
      color: lbl,
      transform: p ? 'scale(0.97)' : 'none',
      transition: 'transform 200ms',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: bg,
      color: fg,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: 'icon-arrow-' + direction,
    style: {
      fontSize: 18
    }
  })), children);
}
Object.assign(__ds_scope, { ArrowCTA });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/explorer/ArrowCTA.jsx", error: String((e && e.message) || e) }); }

// components/explorer/DepthRuler.jsx
try { (() => {
function DepthRuler({
  marks = ['0 m', '1,000', '2,000', '3,000 m'],
  tone = 'light',
  label = 'Depth',
  style
}) {
  const c = tone === 'dark' ? 'rgba(255,255,255,0.85)' : 'var(--ex-navy)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      gap: 10,
      fontFamily: 'var(--font-editorial)',
      color: c,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      writingMode: 'vertical-rl'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1,
      width: 24,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: '50%',
      width: 1,
      background: c,
      opacity: 0.5
    }
  }), marks.map(m => /*#__PURE__*/React.createElement("span", {
    key: m,
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 1,
      background: c
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 14,
      fontSize: 10,
      whiteSpace: 'nowrap',
      fontVariantNumeric: 'tabular-nums'
    }
  }, m)))), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      border: '1px solid ' + c
    }
  }));
}
Object.assign(__ds_scope, { DepthRuler });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/explorer/DepthRuler.jsx", error: String((e && e.message) || e) }); }

// components/explorer/SiteHeader.jsx
try { (() => {
function SiteHeader({
  links = [],
  active,
  onNavigate,
  tone = 'light',
  position = 'absolute',
  style
}) {
  const dark = tone === 'dark',
    ink = dark ? '#fff' : 'var(--ex-navy)';
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 20,
      height: 72,
      padding: '0 var(--gutter-page)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24,
      fontFamily: 'var(--font-editorial)',
      color: ink,
      ...style
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNavigate && onNavigate('home'),
    style: {
      cursor: 'pointer',
      display: 'flex',
      gap: 6,
      alignItems: 'baseline',
      fontSize: 14,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: ink,
      textDecoration: 'none',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 700
    }
  }, "Oil & Gas"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 300
    }
  }, "Development")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 32,
      alignItems: 'center'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    onClick: () => onNavigate && onNavigate(l.id),
    style: {
      fontSize: 13,
      cursor: 'pointer',
      color: active === l.id ? dark ? '#4DA3FF' : 'var(--ex-blue)' : ink,
      fontWeight: active === l.id ? 600 : 400,
      textDecoration: 'none',
      whiteSpace: 'nowrap'
    }
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon-search",
    style: {
      fontSize: 16
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      letterSpacing: '0.06em',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600
    }
  }, "KR"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.5
    }
  }, "/ EN"))));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/explorer/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// components/explorer/StageNav.jsx
try { (() => {
function StageNav({
  stages = [],
  current = 0,
  onSelect,
  cta = 'Explore the Journey',
  onCta,
  position = 'fixed',
  windowSize = 5,
  style
}) {
  const box = React.useRef(null);
  const [ws, setWs] = React.useState(windowSize);
  React.useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      setWs(Math.max(1, Math.min(windowSize, Math.floor(w / 150))));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [windowSize]);
  const cur = stages[current] || {};
  const n = stages.length;
  let start = Math.max(0, Math.min(current - (ws > 2 ? 1 : 0), n - ws));
  const vis = stages.slice(start, start + ws);
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Development stages",
    style: {
      position,
      left: 0,
      right: 0,
      bottom: position === 'fixed' ? 16 : undefined,
      zIndex: 30,
      padding: '0 var(--gutter-page)',
      pointerEvents: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      pointerEvents: 'auto',
      maxWidth: 1360,
      margin: '0 auto',
      height: 'var(--stage-nav-h)',
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'saturate(180%) blur(20px)',
      WebkitBackdropFilter: 'saturate(180%) blur(20px)',
      border: '1px solid var(--ex-line)',
      borderRadius: 20,
      boxShadow: 'var(--shadow-float)',
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      padding: '0 24px',
      fontFamily: 'var(--font-editorial)',
      color: 'var(--ex-navy)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      flex: 'none',
      minWidth: 220
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'var(--ex-blue)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: '#fff'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--ex-faint)',
      letterSpacing: '0.02em'
    }
  }, "Current Stage"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: 'var(--ex-blue)',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums'
    }
  }, cur.num), cur.label, /*#__PURE__*/React.createElement("i", {
    className: "icon-arrow-right",
    style: {
      fontSize: 14
    }
  })))), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 36,
      background: 'var(--ex-line)',
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    ref: box,
    style: {
      flex: 1,
      minWidth: 0,
      display: 'grid',
      gridTemplateColumns: 'repeat(' + vis.length + ',minmax(0,1fr))',
      gap: 16,
      overflow: 'hidden'
    }
  }, vis.map(s => {
    const i = stages.indexOf(s),
      on = i === current,
      past = i < current;
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      onClick: () => onSelect && onSelect(i),
      style: {
        all: 'unset',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        paddingTop: 10,
        borderTop: '2px solid ' + (on ? 'var(--ex-blue)' : past ? 'rgba(10,92,219,0.35)' : 'var(--ex-line)'),
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontVariantNumeric: 'tabular-nums',
        color: on ? 'var(--ex-blue)' : 'var(--ex-faint)'
      }
    }, s.num), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: on ? 600 : 400,
        color: on ? 'var(--ex-blue)' : 'var(--ex-navy)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, s.label));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    },
    "aria-hidden": "true"
  }, stages.map((s, i) => /*#__PURE__*/React.createElement("span", {
    key: s.id,
    style: {
      width: i === current ? 18 : 6,
      height: 6,
      borderRadius: 3,
      background: i <= current ? 'var(--ex-blue)' : 'var(--ex-line-strong)',
      opacity: i < current ? 0.45 : 1
    }
  }))), /*#__PURE__*/React.createElement("a", {
    onClick: onCta,
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--ex-navy)',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      textDecoration: 'none'
    }
  }, cta, /*#__PURE__*/React.createElement("i", {
    className: "icon-arrow-right",
    style: {
      fontSize: 14
    }
  })))));
}
Object.assign(__ds_scope, { StageNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/explorer/StageNav.jsx", error: String((e && e.message) || e) }); }

// components/explorer/TechNav.jsx
try { (() => {
function TechNav({
  categories = [],
  topic,
  onNavigate,
  position = 'fixed',
  defaultOpen = false,
  label = 'Technology',
  style
}) {
  const flat = [];
  categories.forEach((c, ci) => c.topics.forEach(t => flat.push({
    ...t,
    ci
  })));
  const fi = Math.max(0, flat.findIndex(t => t.id === topic));
  const curT = flat[fi] || {};
  const current = curT.ci || 0;
  const cat = categories[current] || {
    topics: []
  };
  const prev = flat[fi - 1],
    next = flat[fi + 1];
  const [open, setOpen] = React.useState(defaultOpen);
  const [view, setView] = React.useState(current);
  const vc = categories[view] || cat;
  const ti = cat.topics.findIndex(t => t.id === topic);
  const go = t => t && onNavigate && onNavigate(t);
  const circle = on => ({
    all: 'unset',
    cursor: on ? 'pointer' : 'default',
    width: 36,
    height: 36,
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 'none',
    border: '1px solid var(--ex-line)',
    color: on ? 'var(--ex-navy)' : 'var(--ex-line-strong)',
    fontSize: 15
  });
  const shell = {
    background: 'rgba(255,255,255,0.94)',
    backdropFilter: 'saturate(180%) blur(20px)',
    WebkitBackdropFilter: 'saturate(180%) blur(20px)',
    border: '1px solid var(--ex-line)',
    borderRadius: 20,
    boxShadow: 'var(--shadow-float)',
    fontFamily: 'var(--font-editorial)',
    color: 'var(--ex-navy)'
  };
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Technology categories",
    style: {
      position,
      left: 0,
      right: 0,
      bottom: position === 'fixed' ? 16 : undefined,
      zIndex: 30,
      padding: '0 var(--gutter-page)',
      pointerEvents: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 1360,
      margin: '0 auto',
      pointerEvents: 'auto'
    }
  }, open && /*#__PURE__*/React.createElement("div", {
    style: {
      ...shell,
      position: position === 'fixed' ? 'absolute' : 'relative',
      left: 0,
      right: 0,
      bottom: position === 'fixed' ? 'calc(100% + 10px)' : undefined,
      marginBottom: position === 'fixed' ? 0 : 10,
      padding: '28px 32px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 32,
      flexWrap: 'wrap',
      paddingBottom: 20,
      borderBottom: '1px solid var(--ex-line)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--ex-faint)'
    }
  }, label, " \xB7 ", vc.num, " / ", String(categories.length).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28,
      fontWeight: 300,
      letterSpacing: '-0.02em',
      lineHeight: 1.05
    }
  }, vc.label), vc.kr && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-kr)',
      fontSize: 14,
      color: 'var(--ex-muted)',
      lineHeight: 1.6
    }
  }, vc.kr)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--ex-muted)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, vc.topics.length, " topics"), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Close",
    onClick: () => setOpen(false),
    style: circle(true)
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon-x"
  })))), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
      columnGap: 32,
      maxHeight: '42vh',
      overflowY: 'auto'
    }
  }, vc.topics.map(t => {
    const on = t.id === topic;
    return /*#__PURE__*/React.createElement("li", {
      key: t.id,
      style: {
        borderBottom: '1px solid var(--ex-line)'
      }
    }, /*#__PURE__*/React.createElement("a", {
      onClick: () => go(t),
      style: {
        display: 'grid',
        gridTemplateColumns: '44px 1fr auto',
        gap: 12,
        alignItems: 'baseline',
        padding: '16px 0',
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'inherit'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontVariantNumeric: 'tabular-nums',
        color: on ? 'var(--ex-blue)' : 'var(--ex-faint)'
      }
    }, t.num), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: on ? 600 : 400,
        lineHeight: 1.35,
        color: on ? 'var(--ex-blue)' : 'var(--ex-navy)'
      }
    }, t.title), on ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: 'var(--ex-blue)',
        background: 'var(--ex-tint)',
        borderRadius: 999,
        padding: '3px 9px',
        whiteSpace: 'nowrap'
      }
    }, "Reading") : /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--ex-faint)',
        whiteSpace: 'nowrap'
      }
    }, t.read)));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...shell,
      height: 'var(--stage-nav-h)',
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      flex: 'none',
      minWidth: 230
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'var(--ex-blue)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: '#fff'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--ex-faint)',
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap'
    }
  }, label, " \xB7 Topic ", curT.num, " of ", cat.topics.length), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: 'var(--ex-blue)',
      whiteSpace: 'nowrap',
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums'
    }
  }, cat.num), cat.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      height: 36,
      background: 'var(--ex-line)',
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'grid',
      gridTemplateColumns: 'repeat(' + categories.length + ',minmax(0,1fr))',
      gap: 16
    }
  }, categories.map((c, i) => {
    const on = i === current,
      viewing = open && i === view && !on;
    return /*#__PURE__*/React.createElement("button", {
      key: c.id,
      onClick: () => {
        setView(i);
        setOpen(o => !(o && view === i));
      },
      "aria-current": on ? 'page' : undefined,
      style: {
        all: 'unset',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        paddingTop: 10,
        borderTop: '2px solid ' + (on ? 'var(--ex-blue)' : viewing ? 'var(--ex-navy)' : 'var(--ex-line)'),
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontVariantNumeric: 'tabular-nums',
        color: on ? 'var(--ex-blue)' : 'var(--ex-faint)',
        whiteSpace: 'nowrap'
      }
    }, c.num, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 4
      }
    }, c.topics.length, " topics")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: on || viewing ? 600 : 400,
        color: on ? 'var(--ex-blue)' : 'var(--ex-navy)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, c.label));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("button", {
    "aria-label": prev ? 'Previous topic: ' + prev.title : 'No previous topic',
    title: prev && prev.num + ' ' + prev.title,
    onClick: () => go(prev),
    style: circle(!!prev)
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon-arrow-left"
  })), /*#__PURE__*/React.createElement("button", {
    "aria-label": next ? 'Next topic: ' + next.title : 'No next topic',
    title: next && next.num + ' ' + next.title,
    onClick: () => go(next),
    style: {
      ...circle(!!next),
      background: next ? 'var(--ex-navy)' : 'transparent',
      borderColor: next ? 'var(--ex-navy)' : 'var(--ex-line)',
      color: next ? '#fff' : 'var(--ex-line-strong)'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon-arrow-right"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setView(current);
      setOpen(o => !(o && view === current));
    },
    "aria-expanded": open,
    style: {
      all: 'unset',
      cursor: 'pointer',
      marginLeft: 10,
      fontSize: 13,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      whiteSpace: 'nowrap'
    }
  }, "All topics", /*#__PURE__*/React.createElement("i", {
    className: open ? 'icon-chevron-down' : 'icon-chevron-up',
    style: {
      fontSize: 14
    }
  }))))));
}
Object.assign(__ds_scope, { TechNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/explorer/TechNav.jsx", error: String((e && e.message) || e) }); }

// components/explorer/TechViz.jsx
try { (() => {
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const RAMP = ['#0B1F6B', '#1F4FD1', '#16A3D8', '#3CC48C', '#E9D43A', '#F29A1F', '#D6402B'].map(hex);
const SEIS = ['#1C3F9E', '#6F8FD0', '#F4F1EA', '#D88A70', '#B8322A'].map(hex);
function ramp(stops, t) {
  t = Math.max(0, Math.min(0.9999, t));
  const p = t * (stops.length - 1),
    i = Math.floor(p),
    f = p - i,
    a = stops[i],
    b = stops[i + 1];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}
function waves(r, n, amp) {
  const w = [];
  for (let i = 0; i < n; i++) w.push([amp * (r() * 0.6 + 0.4) / (i + 1), (i + 1) * (1.5 + r() * 2), r() * 6.28]);
  return u => w.reduce((s, [a, f, p]) => s + a * Math.sin(u * f + p), 0);
}
function pixels(ctx, W, H, fn) {
  const img = ctx.createImageData(W, H),
    d = img.data;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const c = fn(x / W, y / H),
      i = (y * W + x) * 4;
    d[i] = c[0];
    d[i + 1] = c[1];
    d[i + 2] = c[2];
    d[i + 3] = c[3] == null ? 255 : c[3];
  }
  ctx.putImageData(img, 0, 0);
}
function seismic(ctx, W, H, r, opt) {
  const st = waves(r, 4, 0.05),
    fq = waves(r, 3, 4),
    fx = 0.58 + r() * 0.1,
    nz = () => r() * 0.16 - 0.08;
  pixels(ctx, W, H, (u, v) => {
    const bump = 0.13 * Math.exp(-(((u - 0.42) / 0.2) ** 2));
    let t = v + st(u) * 0.8 + bump * (0.4 + v * 0.6);
    if (opt.fault && u > fx + 0.22 * (v - 0.2)) t += 0.045;
    const f = 22 + fq(t * 3);
    let a = Math.sin(t * f * 6.28) * (0.55 + 0.45 * Math.sin(t * 41 + u * 2.1)) * (0.7 + 0.3 * Math.sin(t * 9));
    a += nz();
    const c = ramp(SEIS, (a + 1) / 2);
    return c;
  });
}
function strata(ctx, W, H, r, opt) {
  const st = waves(r, 3, 0.025),
    fx = 0.66;
  const L = [[0, '#CFE5F1'], [0.1, '#E8DFCB'], [0.22, '#D5CDBE'], [0.33, '#E3D3AE'], [0.45, '#9DAFC2'], [0.53, 'RES'], [0.63, '#7E8C9C'], [0.76, '#4A5160'], [0.9, '#363A44']];
  const cols = L.map(l => l[1] === 'RES' ? null : hex(l[1])),
    oil = hex('#F29A1F'),
    oil2 = hex('#D6402B'),
    wat = hex('#7FA6C9');
  pixels(ctx, W, H, (u, v) => {
    const bump = 0.16 * Math.exp(-(((u - 0.4) / 0.22) ** 2));
    let t = v;
    if (v > 0.1) t = v + (bump + st(u)) * Math.min(1, (v - 0.1) * 4);
    if (opt.fault && u > fx + 0.18 * (v - 0.3) && v > 0.12) t -= 0.05;
    let k = 0;
    for (let i = 0; i < L.length; i++) if (t >= L[i][0]) k = i;
    if (v < 0.1) return cols[0];
    let c;
    if (L[k][1] === 'RES') {
      const crest = v;
      c = crest < 0.47 ? ramp([oil2, oil], (crest - 0.32) / 0.15) : wat;
    } else c = cols[k];
    const lam = 0.94 + 0.06 * Math.sin(t * 620 + Math.sin(u * 9) * 2);
    return [c[0] * lam, c[1] * lam, c[2] * lam];
  });
}
function field(r, n) {
  const b = [];
  for (let i = 0; i < n; i++) b.push([r() * 0.8 + 0.1, r() * 0.8 + 0.1, 0.08 + r() * 0.18, r() * 1.4 - 0.4]);
  return (u, v) => b.reduce((s, [x, y, w, a]) => s + a * Math.exp(-((u - x) ** 2 + (v - y) ** 2) / (w * w)), 0);
}
function reservoir(ctx, W, H, r, opt) {
  const fn = field(r, 9),
    edge = waves(r, 5, 0.06);
  let mn = 1e9,
    mx = -1e9;
  for (let i = 0; i < 400; i++) {
    const q = fn(i % 20 / 20, Math.floor(i / 20) / 20);
    mn = Math.min(mn, q);
    mx = Math.max(mx, q);
  }
  const asp = W / H;
  pixels(ctx, W, H, (u, v) => {
    const dx = (u - 0.5) * asp,
      dy = v - 0.5,
      ang = Math.atan2(dy, dx),
      rad = Math.hypot(dx / (asp * 0.46), dy / 0.42);
    const lim = 1 + edge(ang);
    if (opt.mask !== false && rad > lim) return [0, 0, 0, 0];
    let q = (fn(u, v) - mn) / (mx - mn);
    const c = ramp(RAMP, q);
    const con = Math.abs(q * 12 % 1 - 0.5) < 0.035 ? 0.72 : 1;
    const gx = u * W % 14 < 1 || v * H % 14 < 1 ? 0.93 : 1;
    return [c[0] * con * gx, c[1] * con * gx, c[2] * con * gx];
  });
}
function structure(ctx, W, H, r) {
  const fn = field(r, 7);
  let mn = 1e9,
    mx = -1e9;
  for (let i = 0; i < 400; i++) {
    const q = fn(i % 20 / 20, Math.floor(i / 20) / 20);
    mn = Math.min(mn, q);
    mx = Math.max(mx, q);
  }
  const S = ['#0B1F6B', '#1F4FD1', '#16A3D8', '#9AD7EA', '#EEF4F8'].map(hex);
  pixels(ctx, W, H, (u, v) => {
    const q = (fn(u, v) - mn) / (mx - mn);
    const c = ramp(S, q);
    const con = Math.abs(q * 16 % 1 - 0.5) < 0.04 ? 0.8 : 1;
    return [c[0] * con, c[1] * con, c[2] * con];
  });
}
function wellLog(ctx, w, h, r) {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, w, h);
  const sand = waves(r, 6, 1),
    N = Math.floor(h / 2);
  const tr = [[0, 0.12], [0.12, 0.34], [0.34, 0.56], [0.56, 0.78], [0.78, 1]].map(([a, b]) => [a * w, b * w]);
  ctx.strokeStyle = '#DCE3EC';
  ctx.lineWidth = 1;
  tr.forEach(([a]) => {
    ctx.beginPath();
    ctx.moveTo(a + 0.5, 0);
    ctx.lineTo(a + 0.5, h);
    ctx.stroke();
  });
  for (let y = 0; y < h; y += h / 12) {
    ctx.beginPath();
    ctx.moveTo(tr[1][0], y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  const z = [],
    gr = [],
    rs = [],
    rh = [],
    nph = [],
    hc = [];
  for (let i = 0; i <= N; i++) {
    const d = i / N,
      s = sand(d * 8) + 0.25 * Math.sin(d * 90 + r() * 0.3) + (r() - 0.5) * 0.35;
    const isS = s > 0.15,
      isHC = isS && d > 0.38 && d < 0.62;
    z.push(d * h);
    gr.push(isS ? 0.18 + r() * 0.1 : 0.7 + r() * 0.18);
    rs.push(isHC ? 0.75 + r() * 0.15 : isS ? 0.3 + r() * 0.08 : 0.2 + r() * 0.08);
    rh.push(isS ? 0.4 + r() * 0.06 : 0.62 + r() * 0.06);
    nph.push(isS ? (isHC ? 0.25 : 0.38) + r() * 0.05 : 0.7 + r() * 0.06);
    hc.push(isHC);
  }
  const X = (t, v) => t[0] + 8 + v * (t[1] - t[0] - 16);
  ctx.fillStyle = 'rgba(242,154,31,0.22)';
  ctx.beginPath();
  ctx.moveTo(tr[1][0], 0);
  z.forEach((y, i) => ctx.lineTo(X(tr[1], gr[i]), y));
  ctx.lineTo(tr[1][0], h);
  ctx.fill();
  const line = (t, arr, col, dash) => {
    ctx.strokeStyle = col;
    ctx.lineWidth = 1.4;
    ctx.setLineDash(dash || []);
    ctx.beginPath();
    z.forEach((y, i) => i ? ctx.lineTo(X(t, arr[i]), y) : ctx.moveTo(X(t, arr[i]), y));
    ctx.stroke();
    ctx.setLineDash([]);
  };
  line(tr[1], gr, '#C77A10');
  line(tr[2], rs, '#0A5CDB');
  ctx.fillStyle = 'rgba(214,64,43,0.16)';
  z.forEach((y, i) => {
    if (hc[i]) {
      ctx.fillRect(X(tr[3], rh[i]), y, X(tr[3], nph[i]) - X(tr[3], rh[i]), h / N + 0.5);
    }
  });
  line(tr[3], rh, '#D6402B');
  line(tr[3], nph, '#12A4D9', [4, 3]);
  z.forEach((y, i) => {
    ctx.fillStyle = hc[i] ? '#F29A1F' : gr[i] < 0.4 ? '#E3D3AE' : '#9DAFC2';
    ctx.fillRect(tr[4][0] + 8, y, tr[4][1] - tr[4][0] - 16, h / N + 0.5);
  });
  ctx.fillStyle = '#8A98A8';
  ctx.font = '10px Inter, sans-serif';
  for (let k = 1; k < 12; k++) ctx.fillText(String(2400 + k * 25), 6, k * h / 12 + 3);
}
function decline(ctx, w, h, r) {
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.clearRect(0, 0, w, h);
  const p = {
      l: 44,
      r: 16,
      t: 16,
      b: 28
    },
    W = w - p.l - p.r,
    H = h - p.t - p.b;
  ctx.strokeStyle = '#DCE3EC';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = p.t + H * i / 4;
    ctx.beginPath();
    ctx.moveTo(p.l, y);
    ctx.lineTo(w - p.r, y);
    ctx.stroke();
  }
  const N = 120,
    s = (fn, col, width, dash) => {
      ctx.strokeStyle = col;
      ctx.lineWidth = width;
      ctx.setLineDash(dash || []);
      ctx.beginPath();
      for (let i = 0; i <= N; i++) {
        const x = i / N,
          y = fn(x);
        const X = p.l + x * W,
          Y = p.t + H * (1 - y);
        i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    };
  const noise = () => (r() - 0.5) * 0.025;
  s(x => Math.min(0.92, x * 12) * 0.92 / (1 + 3.2 * x) ** 0.9 + noise(), '#0A5CDB', 2);
  s(x => Math.max(0, (x - 0.2) * 1.05) ** 0.8 * 0.85, '#12A4D9', 1.6);
  s(x => 0.88 - 0.42 * x - 0.08 * Math.sin(x * 3), '#0B1A2C', 1.2, [5, 4]);
  ctx.fillStyle = '#8A98A8';
  ctx.font = '10px Inter, sans-serif';
  ['0', '5', '10', '15', '20 yr'].forEach((t, i) => ctx.fillText(t, p.l + W * i / 4 - (i ? 8 : 0), h - 8));
}
const R = {
  seismic,
  strata,
  reservoir,
  structure,
  log: wellLog,
  decline
};
function TechViz({
  kind = 'seismic',
  seed = 7,
  fault = true,
  mask = true,
  resolution = 0.5,
  label,
  style
}) {
  const wrap = React.useRef(null),
    cv = React.useRef(null);
  React.useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let raf;
    const draw = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      if (!w || !h) return;
      const c = cv.current,
        dpr = Math.min(2, window.devicePixelRatio || 1);
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      const ctx = c.getContext('2d');
      const r = rng(seed);
      if (kind === 'log' || kind === 'decline') {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        R[kind](ctx, w, h, r);
        return;
      }
      const W = Math.max(80, Math.round(w * resolution)),
        H = Math.max(60, Math.round(h * resolution));
      const off = document.createElement('canvas');
      off.width = W;
      off.height = H;
      R[kind](off.getContext('2d'), W, H, r, {
        fault,
        mask
      });
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.drawImage(off, 0, 0, c.width, c.height);
    };
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    });
    ro.observe(el);
    draw();
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [kind, seed, fault, mask, resolution]);
  return /*#__PURE__*/React.createElement("div", {
    ref: wrap,
    role: "img",
    "aria-label": label || kind + ' visualization',
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: 80,
      ...style
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: cv,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      display: 'block'
    }
  }));
}
Object.assign(__ds_scope, { TechViz });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/explorer/TechViz.jsx", error: String((e && e.message) || e) }); }

// components/footer/Footer.jsx
try { (() => {
function Footer({
  columns = [],
  note,
  legal,
  style
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--color-canvas-parchment)',
      color: 'var(--color-ink-muted-80)',
      padding: '64px 22px',
      fontFamily: 'var(--font-text)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: '0 auto'
    }
  }, note && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      lineHeight: 1.33,
      letterSpacing: '-0.12px',
      color: 'var(--color-ink-muted-48)',
      margin: '0 0 24px',
      paddingBottom: 16,
      borderBottom: '1px solid var(--color-hairline)'
    }
  }, note), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
      gap: 24
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.title
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.29,
      letterSpacing: '-0.224px',
      color: 'var(--color-ink)',
      marginBottom: 6
    }
  }, c.title), c.links.map(l => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      fontSize: 12,
      lineHeight: 2.41,
      letterSpacing: '-0.12px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--color-ink-muted-80)',
      textDecoration: 'none'
    }
  }, l)))))), legal && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      paddingTop: 16,
      borderTop: '1px solid var(--color-hairline)',
      fontSize: 12,
      lineHeight: 1,
      letterSpacing: '-0.12px',
      color: 'var(--color-ink-muted-48)'
    }
  }, legal)));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/footer/Footer.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchInput.jsx
try { (() => {
function SearchInput({
  value,
  onChange,
  placeholder = 'Search',
  style
}) {
  const [f, setF] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 44,
      padding: '0 20px',
      background: 'var(--color-canvas)',
      border: '1px solid var(--color-hairline-a)',
      borderRadius: 'var(--radius-pill)',
      outline: f ? '2px solid var(--color-primary-focus)' : 'none',
      outlineOffset: 1,
      fontFamily: 'var(--font-text)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon-search",
    style: {
      fontSize: 14,
      color: 'var(--color-ink-muted-48)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => onChange && onChange(e.target.value),
    placeholder: placeholder,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    style: {
      border: 'none',
      outline: 'none',
      background: 'transparent',
      flex: 1,
      fontSize: 17,
      letterSpacing: '-0.374px',
      color: 'var(--color-ink)',
      fontFamily: 'inherit'
    }
  }));
}
Object.assign(__ds_scope, { SearchInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchInput.jsx", error: String((e && e.message) || e) }); }

// components/navigation/GlobalNav.jsx
try { (() => {
function GlobalNav({
  brand = 'Oil & Gas Development',
  links = [],
  active,
  onNavigate,
  style
}) {
  const ls = {
    color: 'var(--color-on-dark)',
    opacity: 0.8,
    fontSize: 12,
    letterSpacing: '-0.12px',
    lineHeight: 1,
    textDecoration: 'none',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  };
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      background: 'var(--color-surface-black)',
      height: 'var(--nav-global-h)',
      color: 'var(--color-on-dark)',
      fontFamily: 'var(--font-text)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1024,
      margin: '0 auto',
      height: '100%',
      padding: '0 22px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => onNavigate && onNavigate('home'),
    style: {
      ...ls,
      opacity: 1,
      fontWeight: 600,
      fontSize: 13
    }
  }, brand), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center',
      overflow: 'hidden'
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id || l.label,
    onClick: () => onNavigate && onNavigate(l.id),
    style: {
      ...ls,
      opacity: active === l.id ? 1 : 0.8
    }
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon-search",
    style: {
      fontSize: 15,
      opacity: 0.8
    }
  }), /*#__PURE__*/React.createElement("i", {
    className: "icon-globe",
    style: {
      fontSize: 15,
      opacity: 0.8
    }
  }))));
}
Object.assign(__ds_scope, { GlobalNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/GlobalNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SubNav.jsx
try { (() => {
function SubNav({
  title,
  links = [],
  active,
  onNavigate,
  cta,
  onCta,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 10,
      height: 'var(--nav-sub-h)',
      background: 'var(--color-surface-frosted)',
      backdropFilter: 'var(--blur-frosted)',
      WebkitBackdropFilter: 'var(--blur-frosted)',
      borderBottom: '1px solid var(--color-hairline-a)',
      fontFamily: 'var(--font-text)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1024,
      margin: '0 auto',
      height: '100%',
      padding: '0 22px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 21,
      fontWeight: 600,
      letterSpacing: '0.231px',
      lineHeight: 1.19,
      color: 'var(--color-ink)',
      whiteSpace: 'nowrap'
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id || l.label,
    onClick: () => onNavigate && onNavigate(l.id),
    style: {
      fontSize: 12,
      letterSpacing: '-0.12px',
      color: active === l.id ? 'var(--color-ink-muted-48)' : 'var(--color-ink)',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      textDecoration: 'none'
    }
  }, l.label)), cta && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    onClick: onCta,
    style: {
      padding: '4px 11px',
      fontSize: 12,
      letterSpacing: '-0.12px',
      lineHeight: 1.33
    }
  }, cta))));
}
Object.assign(__ds_scope, { SubNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SubNav.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/MediaFrame.jsx
try { (() => {
function MediaFrame({
  src,
  alt = '',
  label = 'Image',
  ratio = '16/9',
  radius = 0,
  shadow = false,
  tone = 'light',
  fit = 'cover',
  style
}) {
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      width: '100%',
      borderRadius: radius,
      overflow: 'hidden',
      boxShadow: shadow ? 'var(--shadow-product)' : 'none',
      background: dark ? '#3a3a3c' : '#e8e8ed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: fit,
      display: 'block'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      letterSpacing: '-0.12px',
      color: dark ? '#a1a1a6' : 'var(--color-ink-muted-48)',
      fontFamily: 'var(--font-text)'
    }
  }, label));
}
Object.assign(__ds_scope, { MediaFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/MediaFrame.jsx", error: String((e && e.message) || e) }); }

// components/cards/UtilityCard.jsx
try { (() => {
function UtilityCard({
  src,
  imageLabel = 'Image',
  ratio = '1/1',
  eyebrow,
  title,
  meta,
  link,
  href = '#',
  onClick,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      background: 'var(--color-canvas)',
      border: '1px solid var(--color-hairline)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      fontFamily: 'var(--font-text)',
      cursor: onClick ? 'pointer' : 'default',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.MediaFrame, {
    src: src,
    label: imageLabel,
    ratio: ratio,
    radius: 8
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      letterSpacing: '-0.12px',
      color: 'var(--color-ink-muted-48)',
      marginBottom: 4
    }
  }, eyebrow), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 600,
      lineHeight: 1.24,
      letterSpacing: '-0.374px',
      color: 'var(--color-ink)'
    }
  }, title), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      lineHeight: 1.47,
      letterSpacing: '-0.374px',
      color: 'var(--color-ink)'
    }
  }, meta), link && /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      fontSize: 14,
      letterSpacing: '-0.224px',
      color: 'var(--color-primary)',
      marginTop: 8,
      textDecoration: 'none'
    }
  }, link, " ", /*#__PURE__*/React.createElement("i", {
    className: "icon-chevron-right",
    style: {
      fontSize: 11
    }
  }))));
}
Object.assign(__ds_scope, { UtilityCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/UtilityCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/ProductTile.jsx
try { (() => {
const tones = {
  light: 'var(--color-canvas)',
  parchment: 'var(--color-canvas-parchment)',
  dark: 'var(--color-surface-tile-1)',
  'dark-2': 'var(--color-surface-tile-2)',
  'dark-3': 'var(--color-surface-tile-3)',
  black: 'var(--color-surface-black)'
};
function ProductTile({
  tone = 'light',
  eyebrow,
  title,
  tagline,
  actions,
  children,
  hero = false,
  style
}) {
  const dark = tone.startsWith('dark') || tone === 'black';
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: tones[tone],
      color: dark ? 'var(--color-on-dark)' : 'var(--color-ink)',
      padding: 'var(--space-section) 22px 0',
      textAlign: 'center',
      overflow: 'hidden',
      fontFamily: 'var(--font-text)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: '0 auto'
    }
  }, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 21,
      fontWeight: 600,
      letterSpacing: '0.231px',
      lineHeight: 1.19,
      marginBottom: 8,
      color: dark ? 'var(--color-body-muted)' : 'var(--color-ink)'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: hero ? 56 : 40,
      lineHeight: hero ? 1.07 : 1.1,
      letterSpacing: hero ? '-0.28px' : 0,
      textWrap: 'balance'
    }
  }, title), tagline && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 28,
      fontWeight: 400,
      lineHeight: 1.14,
      letterSpacing: '0.196px',
      textWrap: 'balance'
    }
  }, tagline), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: 24
    }
  }, actions)), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      paddingTop: children ? 48 : 0,
      paddingBottom: children ? 0 : 'var(--space-section)'
    }
  }, children));
}
Object.assign(__ds_scope, { ProductTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/ProductTile.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/QuoteCard.jsx
try { (() => {
function QuoteCard({
  src,
  label = 'Landscape photograph',
  kicker,
  title,
  body,
  action,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      background: 'var(--color-surface-tile-1)',
      color: 'var(--color-on-dark)',
      padding: 'var(--space-section) 22px',
      textAlign: 'center',
      minHeight: 520,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      fontFamily: 'var(--font-text)',
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 16,
      bottom: 12,
      fontSize: 12,
      color: '#86868b'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 760
    }
  }, kicker && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: '-0.224px',
      marginBottom: 16,
      color: 'var(--color-body-muted)'
    }
  }, kicker), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 40,
      fontWeight: 600,
      lineHeight: 1.1,
      textWrap: 'balance'
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '16px auto 0',
      fontSize: 24,
      fontWeight: 300,
      lineHeight: 1.5,
      maxWidth: 640,
      color: 'var(--color-body-muted)'
    }
  }, body), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, action)));
}
Object.assign(__ds_scope, { QuoteCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/QuoteCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/StickyBar.jsx
try { (() => {
function StickyBar({
  label,
  value,
  cta = 'Continue',
  onCta,
  position = 'fixed',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 20,
      height: 'var(--sticky-bar-h)',
      background: 'var(--color-surface-frosted)',
      backdropFilter: 'var(--blur-frosted)',
      WebkitBackdropFilter: 'var(--blur-frosted)',
      borderTop: '1px solid var(--color-hairline-a)',
      padding: '12px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      fontFamily: 'var(--font-text)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      letterSpacing: '-0.374px',
      color: 'var(--color-ink)'
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--color-ink-muted-48)',
      marginRight: 8
    }
  }, label), value), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    onClick: onCta
  }, cta));
}
Object.assign(__ds_scope, { StickyBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/StickyBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/explorer/DesignSystem.jsx
try { (() => {
const {
  TechViz,
  TechNav,
  StageNav,
  SiteHeader,
  ArrowCTA,
  DepthRuler,
  TextLink,
  Button,
  SearchInput
} = window.OilGasDevelopmentDesignSystem_dcb6ae;
const dsT = {
  label: {
    fontFamily: 'var(--font-editorial)',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--ex-faint)'
  },
  mono: {
    fontFamily: 'ui-monospace,Menlo,monospace',
    fontSize: 11,
    color: 'var(--ex-muted)'
  }
};
function Block({
  num,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(200px,1fr) minmax(0,3fr)',
      gap: 48,
      padding: '64px 0',
      borderTop: '1px solid var(--ex-line)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: dsT.label
  }, num), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: '12px 0 0',
      fontFamily: 'var(--font-editorial)',
      fontSize: 28,
      fontWeight: 300,
      letterSpacing: '-0.02em',
      color: 'var(--ex-navy)'
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, children));
}
function Sw({
  c,
  n,
  u,
  ring
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 72,
      height: 72,
      borderRadius: '50%',
      background: c,
      boxShadow: ring ? 'inset 0 0 0 1px var(--ex-line)' : 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-editorial)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--ex-navy)'
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    style: dsT.mono
  }, c), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-kr)',
      fontSize: 12,
      color: 'var(--ex-muted)',
      lineHeight: 1.5
    }
  }, u));
}
function TypeRow({
  spec,
  st,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '180px 1fr',
      gap: 24,
      alignItems: 'baseline',
      padding: '18px 0',
      borderBottom: '1px solid var(--ex-line)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: dsT.mono
  }, spec), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--ex-navy)',
      ...st
    }
  }, children));
}
function DSApp() {
  const [q, setQ] = React.useState('');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ex-bg)'
    }
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    links: window.OGD_LINKS,
    active: "system",
    onNavigate: window.OGD_GO,
    position: "relative"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '64px var(--gutter-page) 160px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1360,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...sceneType.eyebrow,
      color: 'var(--ex-faint)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "Design System")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '24px 0 64px',
      fontFamily: 'var(--font-editorial)',
      fontSize: 'var(--type-editorial-lg)',
      fontWeight: 300,
      letterSpacing: '-0.02em',
      lineHeight: 1,
      color: 'var(--ex-navy)'
    }
  }, "Scientific, bright, exact."), /*#__PURE__*/React.createElement(Block, {
    num: "01",
    title: "Principles"
  }, /*#__PURE__*/React.createElement("ol", {
    style: {
      margin: 0,
      paddingLeft: 20,
      fontFamily: 'var(--font-kr)',
      fontSize: 16,
      lineHeight: 1.9,
      color: 'var(--ex-navy)'
    }
  }, /*#__PURE__*/React.createElement("li", null, "\uD55C \uC139\uC158\uC740 \uD558\uB098\uC758 \uC7A5\uBA74 \u2014 \uCE74\uB4DC \uADF8\uB9AC\uB4DC \uB300\uC2E0 \uB300\uD615 \uC774\uBBF8\uC9C0\xB7\uC2DC\uAC01\uD654 \uD558\uB098\uC640 \uC9E7\uC740 \uD14D\uC2A4\uD2B8."), /*#__PURE__*/React.createElement("li", null, "\uBE44\uB300\uCE6D \uBD84\uD560(1 : 2). \uC2DC\uAC01\uD654\uB294 \uD654\uBA74 \uAC00\uC7A5\uC790\uB9AC\uAE4C\uC9C0 bleed."), /*#__PURE__*/React.createElement("li", null, "\uAE4A\uC774\uC5D0 \uB530\uB77C \uBC30\uACBD \uBA85\uB3C4\uAC00 \uB0B4\uB824\uAC14\uB2E4 \uB2E4\uC2DC \uC62C\uB77C\uC635\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("li", null, "\uBE14\uB8E8\uB294 \uD589\uB3D9\uACFC \uD604\uC7AC \uC704\uCE58\uC5D0\uB9CC. \uC570\uBC84\uB294 \uB370\uC774\uD130 \uC18D \uD0C4\uD654\uC218\uC18C\uC5D0\uB9CC."), /*#__PURE__*/React.createElement("li", null, "\uC7A5\uC2DD\uC6A9 \uADF8\uB77C\uB370\uC774\uC158 \uC5C6\uC74C. \uC0C9 \uB7A8\uD504\uB294 \uB370\uC774\uD130 \uBC94\uB840\uC5D0\uC11C\uB9CC \uC0AC\uC6A9."))), /*#__PURE__*/React.createElement(Block, {
    num: "02",
    title: "Color"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement(Sw, {
    c: "#0A5CDB",
    n: "Primary",
    u: "CTA \xB7 \uD604\uC7AC \uB2E8\uACC4 \xB7 \uB9C1\uD06C"
  }), /*#__PURE__*/React.createElement(Sw, {
    c: "#12A4D9",
    n: "Secondary",
    u: "\uBB3C \xB7 \uD574\uC218\uBA74 \xB7 \uBCF4\uC870 \uB370\uC774\uD130"
  }), /*#__PURE__*/React.createElement(Sw, {
    c: "#F29A1F",
    n: "Accent",
    u: "\uD0C4\uD654\uC218\uC18C \uD558\uC774\uB77C\uC774\uD2B8 (\uB370\uC774\uD130 \uC804\uC6A9)"
  }), /*#__PURE__*/React.createElement(Sw, {
    c: "#0B1A2C",
    n: "Neutral",
    u: "\uBCF8\uBB38 \xB7 \uD5E4\uB4DC\uB77C\uC778 \xB7 \uAE4A\uC740 \uC7A5\uBA74"
  }), /*#__PURE__*/React.createElement(Sw, {
    c: "#F6F8FB",
    n: "Background",
    u: "\uAE30\uBCF8 \uD398\uC774\uC9C0 \uBC30\uACBD",
    ring: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...dsT.label,
      margin: '48px 0 12px'
    }
  }, "Depth tones \xB7 scene backgrounds"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: 48,
      borderRadius: 4,
      overflow: 'hidden'
    }
  }, window.OGD_STAGES.map(s => /*#__PURE__*/React.createElement("span", {
    key: s.id,
    title: s.label,
    style: {
      flex: 1,
      background: s.bg,
      boxShadow: 'inset -1px 0 0 rgba(11,26,44,0.06)',
      display: 'flex',
      alignItems: 'flex-end',
      padding: 6,
      fontFamily: 'var(--font-editorial)',
      fontSize: 10,
      color: s.dark ? '#fff' : 'var(--ex-faint)'
    }
  }, s.num))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...dsT.label,
      margin: '32px 0 12px'
    }
  }, "Data ramps"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: 20
    }
  }, [1, 2, 3, 4, 5, 6, 7].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      background: 'var(--viz-' + i + ')'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: 20
    }
  }, ['#1C3F9E', '#6F8FD0', '#F4F1EA', '#D88A70', '#B8322A'].map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      flex: 1,
      background: c
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      ...dsT.mono
    }
  }, /*#__PURE__*/React.createElement("span", null, "Property: low \u2192 high (--viz-1\u20267)"), /*#__PURE__*/React.createElement("span", null, "Seismic polarity: \u2212 / 0 / +")))), /*#__PURE__*/React.createElement(Block, {
    num: "03",
    title: "Typography"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 16px',
      fontFamily: 'var(--font-kr)',
      fontSize: 14,
      color: 'var(--ex-muted)'
    }
  }, "Inter (English) \xB7 Pretendard (Korean). \uD5E4\uB4DC\uB77C\uC778\uC740 Light 300, \uBCF8\uBB38\uC740 Regular 400, \uB77C\uBCA8\uC740 SemiBold 600."), /*#__PURE__*/React.createElement(TypeRow, {
    spec: "Display XL \xB7 300 \xB7 128/0.92 \xB7 UPPER",
    st: {
      fontFamily: 'var(--font-editorial)',
      fontSize: 88,
      fontWeight: 300,
      lineHeight: 0.92,
      letterSpacing: '-0.025em',
      textTransform: 'uppercase'
    }
  }, "Development"), /*#__PURE__*/React.createElement(TypeRow, {
    spec: "Scene title \xB7 300 \xB7 84/1.0",
    st: {
      fontFamily: 'var(--font-editorial)',
      fontSize: 56,
      fontWeight: 300,
      lineHeight: 1,
      letterSpacing: '-0.02em'
    }
  }, "Imaging the invisible."), /*#__PURE__*/React.createElement(TypeRow, {
    spec: "Page H1 \xB7 400 \xB7 52/1.08",
    st: {
      fontFamily: 'var(--font-editorial)',
      fontSize: 40,
      fontWeight: 400,
      lineHeight: 1.08,
      letterSpacing: '-0.02em'
    }
  }, "How Hydrocarbons Are Trapped"), /*#__PURE__*/React.createElement(TypeRow, {
    spec: "Subtitle \xB7 400 \xB7 30/1.2",
    st: {
      fontFamily: 'var(--font-editorial)',
      fontSize: 30,
      lineHeight: 1.2
    }
  }, "From Subsurface to Field Development"), /*#__PURE__*/React.createElement(TypeRow, {
    spec: "Body KR \xB7 400 \xB7 17/1.75",
    st: {
      fontFamily: 'var(--font-kr)',
      fontSize: 17,
      lineHeight: 1.75,
      color: 'var(--ex-muted)',
      maxWidth: 560
    }
  }, "\uAC80\uCE35\uACFC \uD0C4\uC131\uD30C \uC790\uB8CC\uB97C \uACB0\uD569\uD574 \uACF5\uADF9\uB960\xB7\uD22C\uACFC\uB3C4\xB7\uD3EC\uD654\uB3C4\uC758 3\uCC28\uC6D0 \uBD84\uD3EC\uB97C \uBAA8\uB378\uB9C1\uD569\uB2C8\uB2E4."), /*#__PURE__*/React.createElement(TypeRow, {
    spec: "Eyebrow \xB7 600 \xB7 12 \xB7 +0.16em",
    st: {
      fontFamily: 'var(--font-editorial)',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'var(--ex-blue)'
    }
  }, "05 \u2014 Seismic"), /*#__PURE__*/React.createElement(TypeRow, {
    spec: "Data figure \xB7 300 \xB7 36 \xB7 tabular",
    st: {
      fontFamily: 'var(--font-editorial)',
      fontSize: 36,
      fontWeight: 300,
      fontVariantNumeric: 'tabular-nums'
    }
  }, "1,240 km\xB2")), /*#__PURE__*/React.createElement(Block, {
    num: "04",
    title: "Controls"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 16,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, null, "Primary"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Secondary"), /*#__PURE__*/React.createElement(TextLink, {
    chevron: true
  }, "Text link")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 32,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(ArrowCTA, null, "Explore the Journey"), /*#__PURE__*/React.createElement(ArrowCTA, {
    tone: "blue"
  }, "Continue"), /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--ex-navy)',
      padding: '12px 16px',
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement(ArrowCTA, {
    tone: "white",
    direction: "down"
  }, "Descend"))), /*#__PURE__*/React.createElement(SearchInput, {
    value: q,
    onChange: setQ,
    placeholder: "Search technologies, basins, terms",
    style: {
      maxWidth: 420
    }
  }))), /*#__PURE__*/React.createElement(Block, {
    num: "05",
    title: "Visualization"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))',
      gap: 24
    }
  }, [['seismic', 'Seismic section'], ['strata', 'Cross-section'], ['structure', 'Structure map'], ['reservoir', 'Property model'], ['log', 'Well log'], ['decline', 'Production curves']].map(([k, l]) => /*#__PURE__*/React.createElement("figure", {
    key: k,
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 150,
      borderRadius: 4,
      overflow: 'hidden',
      background: k === 'reservoir' ? '#13263D' : '#fff',
      padding: k === 'reservoir' ? 8 : 0
    }
  }, /*#__PURE__*/React.createElement(TechViz, {
    kind: k,
    seed: k === 'structure' ? 21 : 5
  })), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 10,
      fontFamily: 'var(--font-editorial)',
      fontSize: 13,
      color: 'var(--ex-navy)'
    }
  }, l, " ", /*#__PURE__*/React.createElement("span", {
    style: dsT.mono
  }, "kind=\"", k, "\""))))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-kr)',
      fontSize: 13,
      color: 'var(--ex-muted)',
      marginTop: 20
    }
  }, "\uC808\uCC28\uC801\uC73C\uB85C \uC0DD\uC131\uD55C \uB300\uCCB4 \uC2DC\uAC01\uD654\uC785\uB2C8\uB2E4. \uC2E4\uC81C \uD0C4\uC131\uD30C\xB7\uAC80\uCE35\xB7\uBAA8\uB378 \uC774\uBBF8\uC9C0\uB85C \uAD50\uCCB4\uD558\uC138\uC694. \uB77C\uBCA8\uC740 \uD770\uC0C9 6px \uB77C\uC6B4\uB4DC \uD0DC\uADF8 + \uB9AC\uB354 \uB77C\uC778.")), /*#__PURE__*/React.createElement(Block, {
    num: "06",
    title: "Navigation"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#E6ECF3',
      padding: '32px 0',
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement(StageNav, {
    stages: window.OGD_STAGES,
    current: 2,
    position: "relative",
    style: {
      padding: '0 24px'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 48,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 220
    }
  }, /*#__PURE__*/React.createElement(DepthRuler, null)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-kr)',
      fontSize: 14,
      lineHeight: 1.7,
      color: 'var(--ex-muted)',
      maxWidth: 480,
      margin: 0
    }
  }, "StageNav\uB294 \uD558\uB2E8 16px \uC704\uC5D0 \uB5A0 \uC788\uB294 \uC720\uC77C\uD55C \uADF8\uB9BC\uC790 \uC694\uC18C\uC785\uB2C8\uB2E4(--shadow-float). \uD604\uC7AC \uB2E8\uACC4\uB294 \uBE14\uB8E8 \uB77C\uC778\uACFC \uAD75\uAE30\uB85C \uD45C\uC2DC\uD558\uACE0, \uC624\uB978\uCABD \uC810\uC740 9\uB2E8\uACC4 \uC804\uCCB4 \uC9C4\uD589\uB960\uC785\uB2C8\uB2E4. Depth ruler\uB294 \uC2DC\uAC01\uD654 \uC624\uB978\uCABD \uAC00\uC7A5\uC790\uB9AC\uC5D0 \uBD99\uB294 \uAE4A\uC774 \uAE30\uC900\uC785\uB2C8\uB2E4.")))), /*#__PURE__*/React.createElement(Block, {
    num: "06b",
    title: "Technology navigation"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
      gap: 24,
      fontFamily: 'var(--font-kr)',
      fontSize: 14,
      lineHeight: 1.65,
      color: 'var(--ex-muted)'
    }
  }, [['Journey ≠ Technology', '홈페이지 StageNav는 9단계 여정, Technology 페이지 TechNav는 5개 상위 카테고리입니다.'], ['Category → Topic', '카테고리는 고정, 토픽은 계속 추가됩니다. 토픽 번호는 카테고리 번호를 따릅니다 (1.1, 1.2 …).'], ['Current state', '현재 카테고리는 블루 라인, 다른 카테고리를 누르면 트레이에서 미리보기(네이비 라인).'], ['Prev / Next', '토픽 순서대로 이동하며 카테고리 마지막 토픽 다음은 다음 카테고리의 첫 토픽입니다.']].map(([a, b]) => /*#__PURE__*/React.createElement("div", {
    key: a,
    style: {
      borderTop: '2px solid var(--ex-blue)',
      paddingTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-editorial)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--ex-navy)',
      marginBottom: 6
    }
  }, a), b))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#E6ECF3',
      padding: '32px 0',
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement(TechNav, {
    categories: window.OGD_TECH,
    topic: "pt-generation",
    position: "relative",
    defaultOpen: true,
    style: {
      padding: '0 24px'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px 40px',
      fontFamily: 'var(--font-editorial)',
      fontSize: 13,
      color: 'var(--ex-navy)'
    }
  }, window.OGD_TECH.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.id,
    style: {
      flex: '1 1 200px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ex-blue)',
      padding: '10px 0',
      borderBottom: '1px solid var(--ex-navy)'
    }
  }, c.num, " ", c.label), c.topics.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    style: {
      display: 'flex',
      gap: 10,
      padding: '8px 0',
      borderBottom: '1px solid var(--ex-line)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ex-faint)',
      fontVariantNumeric: 'tabular-nums',
      width: 28,
      flex: 'none'
    }
  }, t.num), /*#__PURE__*/React.createElement("span", null, t.title)))))))), /*#__PURE__*/React.createElement(Block, {
    num: "07",
    title: "Layout"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12,1fr)',
      gap: 12,
      height: 120,
      marginBottom: 20
    }
  }, Array.from({
    length: 12
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      background: i < 4 ? 'rgba(10,92,219,0.14)' : 'rgba(18,164,217,0.10)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
      gap: 24,
      fontFamily: 'var(--font-kr)',
      fontSize: 14,
      color: 'var(--ex-navy)'
    }
  }, [['Container', '최대 1360px'], ['Gutter', 'clamp(20px, 4.4vw, 72px)'], ['Scene', 'min-height 880px · 상하 140px'], ['Split', '텍스트 4 : 시각화 8, 시각화는 bleed']].map(([a, b]) => /*#__PURE__*/React.createElement("div", {
    key: a
  }, /*#__PURE__*/React.createElement("div", {
    style: dsT.label
  }, a), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, b))))))), /*#__PURE__*/React.createElement(StageNav, {
    stages: window.OGD_STAGES,
    current: 0,
    onSelect: i => location.href = 'index.html#scene-' + window.OGD_STAGES[i].id,
    cta: "Open homepage",
    onCta: () => location.href = 'index.html'
  }));
}
{
  const __el = document.getElementById('root');
  if (__el && __el.dataset.app === 'system' && !__el.__mounted && window.OilGasDevelopmentDesignSystem_dcb6ae && window.OilGasDevelopmentDesignSystem_dcb6ae.TechViz !== undefined && window.OilGasDevelopmentDesignSystem_dcb6ae.TechNav !== undefined && (__el.__mounted = true)) ReactDOM.createRoot(__el).render(/*#__PURE__*/React.createElement(DSApp, null));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/explorer/DesignSystem.jsx", error: String((e && e.message) || e) }); }

// ui_kits/explorer/JourneyHome.jsx
try { (() => {
const {
  TechViz,
  StageNav,
  SiteHeader,
  ArrowCTA,
  DepthRuler,
  TextLink,
  Button,
  SearchInput
} = window.OilGasDevelopmentDesignSystem_dcb6ae;
function HomeApp() {
  const [cur, setCur] = React.useState(0);
  React.useEffect(() => {
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          const i = window.OGD_STAGES.findIndex(s => s.id === e.target.dataset.stage);
          if (i >= 0) setCur(i);
        }
      });
    }, {
      rootMargin: '-45% 0px -45% 0px'
    });
    document.querySelectorAll('[data-stage]').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  const go = i => {
    const el = document.getElementById('scene-' + window.OGD_STAGES[i].id);
    if (el) window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY,
      behavior: 'smooth'
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ex-bg)'
    }
  }, /*#__PURE__*/React.createElement(Hero, {
    go: go
  }), /*#__PURE__*/React.createElement(StageIndex, {
    go: go
  }), /*#__PURE__*/React.createElement(SurfaceScene, null), /*#__PURE__*/React.createElement(PetroleumScene, null), /*#__PURE__*/React.createElement(SubsurfaceScene, null), /*#__PURE__*/React.createElement(WellScene, null), /*#__PURE__*/React.createElement(SeismicScene, null), /*#__PURE__*/React.createElement(ReservoirScene, null), /*#__PURE__*/React.createElement(EngineeringScene, null), /*#__PURE__*/React.createElement(ProductionScene, null), /*#__PURE__*/React.createElement(FieldScene, {
    onTech: () => window.OGD_GO('technology')
  }), /*#__PURE__*/React.createElement(SiteFooter, null), /*#__PURE__*/React.createElement(StageNav, {
    stages: window.OGD_STAGES,
    current: cur,
    onSelect: go,
    onCta: () => go(Math.min(cur + 1, 8)),
    cta: cur < 8 ? 'Next stage' : 'Explore the Journey'
  }));
}
{
  const __el = document.getElementById('root');
  if (__el && __el.dataset.app === 'home' && !__el.__mounted && window.OilGasDevelopmentDesignSystem_dcb6ae && window.OilGasDevelopmentDesignSystem_dcb6ae.TechViz !== undefined && (__el.__mounted = true)) ReactDOM.createRoot(__el).render(/*#__PURE__*/React.createElement(HomeApp, null));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/explorer/JourneyHome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/explorer/Scenes.jsx
try { (() => {
const {
  TechViz,
  StageNav,
  SiteHeader,
  ArrowCTA,
  DepthRuler,
  TextLink,
  Button,
  SearchInput
} = window.OilGasDevelopmentDesignSystem_dcb6ae;
const S = window.OGD_STAGES;
const sceneType = {
  eyebrow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontFamily: 'var(--font-editorial)',
    fontSize: 12,
    letterSpacing: '0.16em',
    textTransform: 'uppercase'
  },
  title: {
    fontFamily: 'var(--font-editorial)',
    fontSize: 'var(--type-editorial-lg)',
    fontWeight: 300,
    lineHeight: 1,
    letterSpacing: '-0.02em',
    margin: '28px 0 0',
    textWrap: 'balance'
  },
  body: {
    fontFamily: 'var(--font-kr)',
    fontSize: 17,
    lineHeight: 1.75,
    letterSpacing: '-0.01em',
    margin: '28px 0 0',
    maxWidth: 460,
    textWrap: 'pretty'
  },
  wrap: {
    maxWidth: 1360,
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '48px 64px',
    alignItems: 'center'
  }
};
function SceneHead({
  s,
  children
}) {
  const d = s.dark;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...sceneType.eyebrow,
      color: d ? 'rgba(255,255,255,0.6)' : 'var(--ex-faint)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums'
    }
  }, s.num), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 1,
      background: 'currentColor'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: d ? '#4DA3FF' : 'var(--ex-blue)'
    }
  }, s.label)), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...sceneType.title,
      color: d ? '#fff' : 'var(--ex-navy)'
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      ...sceneType.body,
      color: d ? 'rgba(255,255,255,0.72)' : 'var(--ex-muted)'
    }
  }, s.kr), children);
}
function Scene({
  s,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: 'scene-' + s.id,
    "data-stage": s.id,
    "data-scene": s.num,
    "data-depth": s.depth,
    "data-transition-in": s.t.in,
    "data-transition-out": s.t.out,
    "data-persist": s.t.persist,
    style: {
      position: 'relative',
      background: s.bg,
      color: s.dark ? '#fff' : 'var(--ex-navy)',
      minHeight: 'var(--scene-min-h)',
      padding: '140px var(--gutter-page)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      ...style
    }
  }, children);
}
function Fact({
  v,
  l,
  dark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      paddingTop: 16,
      borderTop: '1px solid ' + (dark ? 'rgba(255,255,255,0.18)' : 'var(--ex-line)')
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-editorial)',
      fontSize: 36,
      fontWeight: 300,
      letterSpacing: '-0.02em',
      lineHeight: 1,
      fontVariantNumeric: 'tabular-nums'
    }
  }, v), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-kr)',
      fontSize: 13,
      color: dark ? 'rgba(255,255,255,0.6)' : 'var(--ex-muted)'
    }
  }, l));
}
function Callout({
  x,
  y,
  label,
  sub,
  side = 'right',
  dark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexDirection: side === 'left' ? 'row-reverse' : 'row',
      transform: side === 'left' ? 'translate(-100%,-50%)' : 'translateY(-50%)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: '#fff',
      border: '2px solid var(--ex-navy)',
      flex: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 1,
      background: dark ? '#fff' : 'var(--ex-navy)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'rgba(255,255,255,0.94)',
      padding: '6px 10px',
      borderRadius: 6,
      fontFamily: 'var(--font-editorial)',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--ex-navy)',
      whiteSpace: 'nowrap'
    }
  }, label, sub && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontWeight: 400,
      color: 'var(--ex-muted)',
      fontSize: 11
    }
  }, sub)));
}
function Hero({
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    "data-stage": "surface",
    "data-scene": "00",
    "data-transition-out": "Sea level seam moves to viewport center; descent begins",
    style: {
      position: 'relative',
      minHeight: 940,
      background: 'var(--ex-bg)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    links: window.OGD_LINKS,
    active: "journey",
    onNavigate: window.OGD_GO
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: '64%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '60%'
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "hero-surface",
    shape: "rect",
    placeholder: "Hero photo \u2014 offshore platform, open sea, bright sky"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: '60%',
      bottom: 0
    }
  }, /*#__PURE__*/React.createElement(TechViz, {
    kind: "strata",
    seed: 11
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 24,
      top: '60%',
      transform: 'translateY(-50%)',
      background: '#fff',
      borderRadius: 999,
      padding: '6px 12px',
      fontFamily: 'var(--font-editorial)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--ex-navy)',
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--ex-cyan)'
    }
  }), "Sea level \xB7 \xB10 m"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 36,
      top: '64%',
      bottom: '6%'
    }
  }, /*#__PURE__*/React.createElement(DepthRuler, {
    marks: ['0 m', '1,000', '2,000', '3,000 m']
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2,
      padding: '200px var(--gutter-page) 120px',
      maxWidth: 900
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...sceneType.eyebrow,
      color: 'var(--ex-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "A scientific exploration in nine stages")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-editorial)',
      fontSize: 'var(--type-editorial-xl)',
      fontWeight: 300,
      lineHeight: 0.92,
      letterSpacing: '-0.025em',
      textTransform: 'uppercase',
      margin: '32px 0 0',
      color: 'var(--ex-navy)'
    }
  }, "Oil & Gas", /*#__PURE__*/React.createElement("br", null), "Development"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-editorial)',
      fontSize: 30,
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      margin: '36px 0 0',
      color: 'var(--ex-navy)'
    }
  }, "From Subsurface", /*#__PURE__*/React.createElement("br", null), "to Field Development"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...sceneType.body,
      color: 'var(--ex-muted)',
      maxWidth: 380
    }
  }, "\uC9C0\uD45C\uC5D0\uC11C \uC800\uB958\uCE35\uAE4C\uC9C0, \uADF8\uB9AC\uACE0 \uC0DD\uC0B0\uACFC \uAC1C\uBC1C\uAE4C\uC9C0. \uC11D\uC720\uAC1C\uBC1C\uC758 \uC804 \uACFC\uC815\uC744 \uD558\uB098\uC758 \uACFC\uD559\uC801 \uC5EC\uC815\uC73C\uB85C \uD0D0\uC0C9\uD569\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44
    }
  }, /*#__PURE__*/React.createElement(ArrowCTA, {
    onClick: () => go(0)
  }, "Explore the Journey"))));
}
function StageIndex({
  go
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#fff',
      padding: '40px var(--gutter-page) 48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1360,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(132px,1fr))',
      gap: '28px 20px'
    }
  }, S.map((s, i) => /*#__PURE__*/React.createElement("a", {
    key: s.id,
    onClick: () => go(i),
    style: {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      paddingTop: 14,
      borderTop: '1px solid var(--ex-line)',
      textDecoration: 'none',
      fontFamily: 'var(--font-editorial)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--ex-blue)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, s.num), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--ex-navy)'
    }
  }, s.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      lineHeight: 1.45,
      color: 'var(--ex-faint)'
    }
  }, s.sub)))));
}
function SurfaceScene() {
  const s = S[0];
  return /*#__PURE__*/React.createElement(Scene, {
    s: s,
    style: {
      paddingBottom: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...sceneType.wrap,
      alignItems: 'flex-end',
      marginBottom: 72
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 520px'
    }
  }, /*#__PURE__*/React.createElement(SceneHead, {
    s: s
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 360px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Fact, {
    v: "12,400",
    l: "\uBD84\uC9C0 \uBA74\uC801 (km\xB2)"
  }), /*#__PURE__*/React.createElement(Fact, {
    v: "3",
    l: "\uC6D0\uACA9\uD0D0\uC0AC \uB370\uC774\uD130\uC14B"
  }), /*#__PURE__*/React.createElement(Fact, {
    v: "7",
    l: "\uC720\uB9DD \uC9C0\uC5ED \uC120\uBCC4"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      margin: '0 calc(-1 * var(--gutter-page))',
      height: 620
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "scene-surface",
    shape: "rect",
    placeholder: "Full-bleed photo \u2014 coastline / offshore acreage from above (21:9)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 1,
      background: 'var(--ex-cyan)'
    }
  })));
}
function PetroleumScene() {
  const s = S[1];
  const el = [['Source rock', '근원암 — 유기물이 열과 압력으로 탄화수소가 됩니다.'], ['Migration', '이동 — 부력으로 투수성 지층을 따라 위로 이동합니다.'], ['Reservoir', '저류암 — 공극이 많은 사암·탄산염암이 유체를 담습니다.'], ['Trap & Seal', '트랩·덮개암 — 불투수층이 이동을 멈추고 보존합니다.']];
  return /*#__PURE__*/React.createElement(Scene, {
    s: s
  }, /*#__PURE__*/React.createElement("div", {
    style: sceneType.wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 380px',
      maxWidth: 480
    }
  }, /*#__PURE__*/React.createElement(SceneHead, {
    s: s
  }, /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: '40px 0 0',
      display: 'flex',
      flexDirection: 'column'
    }
  }, el.map(([a, b], i) => /*#__PURE__*/React.createElement("li", {
    key: a,
    style: {
      display: 'grid',
      gridTemplateColumns: '36px 1fr',
      gap: 12,
      padding: '16px 0',
      borderTop: '1px solid var(--ex-line)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-editorial)',
      fontSize: 12,
      color: 'var(--ex-blue)',
      paddingTop: 2
    }
  }, '0' + (i + 1)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-editorial)',
      fontSize: 15,
      fontWeight: 600
    }
  }, a), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-kr)',
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--ex-muted)',
      marginTop: 2
    }
  }, b))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '2 1 560px',
      position: 'relative',
      height: 680,
      marginRight: 'calc(-1 * var(--gutter-page))'
    }
  }, /*#__PURE__*/React.createElement(TechViz, {
    kind: "strata",
    seed: 5
  }), /*#__PURE__*/React.createElement(Callout, {
    x: "40%",
    y: "27%",
    label: "Seal",
    sub: "Shale cap rock"
  }), /*#__PURE__*/React.createElement(Callout, {
    x: "40%",
    y: "40%",
    label: "Trapped hydrocarbons",
    sub: "Anticline crest"
  }), /*#__PURE__*/React.createElement(Callout, {
    x: "72%",
    y: "58%",
    label: "Normal fault"
  }), /*#__PURE__*/React.createElement(Callout, {
    x: "22%",
    y: "84%",
    label: "Source rock",
    sub: "Kitchen \xB7 Ro 0.9%"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: '10%',
      height: 1,
      background: 'var(--ex-cyan)'
    }
  }))));
}
function SubsurfaceScene() {
  const s = S[2];
  return /*#__PURE__*/React.createElement(Scene, {
    s: s
  }, /*#__PURE__*/React.createElement("div", {
    style: sceneType.wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '2 1 560px',
      position: 'relative',
      height: 600,
      marginLeft: 'calc(-1 * var(--gutter-page))'
    }
  }, /*#__PURE__*/React.createElement(TechViz, {
    kind: "structure",
    seed: 21
  }), /*#__PURE__*/React.createElement(Callout, {
    x: "46%",
    y: "44%",
    label: "Crest \xB7 2,450 m",
    sub: "Proposed well location"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 24,
      bottom: 20,
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      background: 'rgba(255,255,255,0.94)',
      borderRadius: 6,
      padding: '8px 12px',
      fontFamily: 'var(--font-editorial)',
      fontSize: 11,
      color: 'var(--ex-navy)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Depth (m TVDSS)"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 120,
      height: 8,
      borderRadius: 2,
      background: 'linear-gradient(90deg,#EEF4F8,#9AD7EA,#16A3D8,#1F4FD1,#0B1F6B)'
    }
  }), /*#__PURE__*/React.createElement("span", null, "2,400 \u2192 2,900"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 380px',
      maxWidth: 480
    }
  }, /*#__PURE__*/React.createElement(SceneHead, {
    s: s
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
      gap: 24,
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(Fact, {
    v: "38 km\xB2",
    l: "\uAD6C\uC870 \uD3D0\uD569 \uBA74\uC801"
  }), /*#__PURE__*/React.createElement(Fact, {
    v: "120 m",
    l: "\uD3D0\uD569 \uB192\uC774"
  }))))));
}
function WellScene() {
  const s = S[3];
  const tracks = [['Depth', 'm MD', 'var(--ex-faint)'], ['GR', '0 – 150 API', '#C77A10'], ['Resistivity', '0.2 – 2000 Ω·m', '#0A5CDB'], ['Density · Neutron', '1.95 – 2.95 g/cc', '#D6402B'], ['Lithology', '', 'var(--ex-navy)']];
  return /*#__PURE__*/React.createElement(Scene, {
    s: s
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...sceneType.wrap,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 380px',
      maxWidth: 480,
      alignSelf: 'center'
    }
  }, /*#__PURE__*/React.createElement(SceneHead, {
    s: s
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px 20px',
      marginTop: 36,
      fontFamily: 'var(--font-editorial)',
      fontSize: 12
    }
  }, [['#F29A1F', 'Hydrocarbon sand'], ['#E3D3AE', 'Water sand'], ['#9DAFC2', 'Shale']].map(([c, l]) => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      background: c,
      borderRadius: 2
    }
  }), l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '2 1 560px',
      display: 'flex',
      flexDirection: 'column',
      background: '#fff',
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '12fr 22fr 22fr 22fr 22fr',
      borderBottom: '1px solid var(--ex-line)'
    }
  }, tracks.map(([a, b, c]) => /*#__PURE__*/React.createElement("div", {
    key: a,
    style: {
      padding: '12px 10px',
      fontFamily: 'var(--font-editorial)',
      fontSize: 11,
      borderTop: '2px solid ' + c
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: 'var(--ex-navy)'
    }
  }, a), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--ex-faint)'
    }
  }, b || '\u00a0')))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 620
    }
  }, /*#__PURE__*/React.createElement(TechViz, {
    kind: "log",
    seed: 8
  })))));
}
function SeismicScene() {
  const s = S[4];
  return /*#__PURE__*/React.createElement(Scene, {
    s: s,
    style: {
      padding: '140px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 var(--gutter-page)',
      ...sceneType.wrap,
      alignItems: 'flex-end',
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 520px'
    }
  }, /*#__PURE__*/React.createElement(SceneHead, {
    s: s
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 1 360px',
      display: 'grid',
      gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Fact, {
    dark: true,
    v: "1,240 km\xB2",
    l: "3D \uD0C4\uC131\uD30C \uCDE8\uB4DD \uBA74\uC801"
  }), /*#__PURE__*/React.createElement(Fact, {
    dark: true,
    v: "12.5 m",
    l: "\uBE48(bin) \uAC04\uACA9"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 560
    }
  }, /*#__PURE__*/React.createElement(TechViz, {
    kind: "seismic",
    seed: 4
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 'var(--gutter-page)',
      top: 16,
      fontFamily: 'var(--font-editorial)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ex-navy)',
      background: 'rgba(255,255,255,0.9)',
      padding: '6px 10px',
      borderRadius: 4
    }
  }, "Inline 1184 \xB7 Time migrated"), /*#__PURE__*/React.createElement(Callout, {
    x: "62%",
    y: "46%",
    label: "Top reservoir",
    sub: "Interpreted horizon"
  })));
}
function ReservoirScene() {
  const s = S[5];
  const props = ['Porosity', 'Permeability', 'Saturation'];
  const [p, setP] = React.useState(0);
  return /*#__PURE__*/React.createElement(Scene, {
    s: s
  }, /*#__PURE__*/React.createElement("div", {
    style: sceneType.wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 380px',
      maxWidth: 480
    }
  }, /*#__PURE__*/React.createElement(SceneHead, {
    s: s
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 36,
      flexWrap: 'wrap'
    }
  }, props.map((n, i) => /*#__PURE__*/React.createElement("button", {
    key: n,
    onClick: () => setP(i),
    style: {
      all: 'unset',
      cursor: 'pointer',
      padding: '9px 16px',
      borderRadius: 999,
      fontFamily: 'var(--font-editorial)',
      fontSize: 13,
      border: '1px solid ' + (p === i ? '#4DA3FF' : 'rgba(255,255,255,0.22)'),
      color: p === i ? '#fff' : 'rgba(255,255,255,0.7)',
      background: p === i ? 'rgba(77,163,255,0.16)' : 'transparent'
    }
  }, n))))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '2 1 560px',
      position: 'relative',
      height: 640
    }
  }, /*#__PURE__*/React.createElement(TechViz, {
    kind: "reservoir",
    seed: [3, 14, 27][p]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      fontFamily: 'var(--font-editorial)',
      fontSize: 11,
      color: 'rgba(255,255,255,0.8)'
    }
  }, /*#__PURE__*/React.createElement("span", null, ['5%', '0.1 mD', '0%'][p]), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 180,
      height: 8,
      borderRadius: 2,
      background: 'linear-gradient(90deg,var(--viz-1),var(--viz-2),var(--viz-3),var(--viz-4),var(--viz-5),var(--viz-6),var(--viz-7))'
    }
  }), /*#__PURE__*/React.createElement("span", null, ['30%', '2,000 mD', '85%'][p]), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8,
      color: '#fff',
      fontWeight: 600
    }
  }, props[p])))));
}
function EngineeringScene() {
  const s = S[6];
  return /*#__PURE__*/React.createElement(Scene, {
    s: s
  }, /*#__PURE__*/React.createElement("div", {
    style: sceneType.wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '2 1 560px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      fontFamily: 'var(--font-editorial)',
      fontSize: 12,
      flexWrap: 'wrap'
    }
  }, [['#0A5CDB', 'Oil rate', ''], ['#12A4D9', 'Water cut', ''], ['#0B1A2C', 'Reservoir pressure', 'dash']].map(([c, l, d]) => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 0,
      borderTop: '2px ' + (d ? 'dashed ' : 'solid ') + c
    }
  }), l))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 460
    }
  }, /*#__PURE__*/React.createElement(TechViz, {
    kind: "decline",
    seed: 2
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 380px',
      maxWidth: 480
    }
  }, /*#__PURE__*/React.createElement(SceneHead, {
    s: s
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
      gap: 20,
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(Fact, {
    v: "42%",
    l: "\uC608\uC0C1 \uD68C\uC218\uC728"
  }), /*#__PURE__*/React.createElement(Fact, {
    v: "6 yr",
    l: "\uC815\uC810 \uC0DD\uC0B0 \uC720\uC9C0"
  }), /*#__PURE__*/React.createElement(Fact, {
    v: "18",
    l: "\uC8FC\uC785\uC815"
  }))))));
}
function ProductionScene() {
  const s = S[7];
  return /*#__PURE__*/React.createElement(Scene, {
    s: s
  }, /*#__PURE__*/React.createElement("div", {
    style: sceneType.wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '2 1 560px',
      height: 640,
      marginLeft: 'calc(-1 * var(--gutter-page))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "scene-production",
    shape: "rect",
    placeholder: "Photo \u2014 FPSO / production facility at sea"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 380px',
      maxWidth: 480
    }
  }, /*#__PURE__*/React.createElement(SceneHead, {
    s: s
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
      gap: 24,
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(Fact, {
    v: "120 kbbl/d",
    l: "\uCC98\uB9AC \uC6A9\uB7C9"
  }), /*#__PURE__*/React.createElement(Fact, {
    v: "2.1 MMbbl",
    l: "\uC800\uC7A5 \uC6A9\uB7C9"
  }), /*#__PURE__*/React.createElement(Fact, {
    v: "24",
    l: "\uD574\uC800 \uC0DD\uC0B0\uC815"
  }), /*#__PURE__*/React.createElement(Fact, {
    v: "99.2%",
    l: "\uC124\uBE44 \uAC00\uB3D9\uB960"
  }))))));
}
function FieldScene({
  onTech
}) {
  const s = S[8];
  return /*#__PURE__*/React.createElement(Scene, {
    s: s,
    style: {
      padding: 0,
      minHeight: 820,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "scene-field",
    shape: "rect",
    placeholder: "Wide photo \u2014 full field development, vessels and platforms at dusk"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      margin: '0 var(--gutter-page) 140px',
      maxWidth: 620,
      background: '#fff',
      padding: '48px 48px 44px',
      borderRadius: 4,
      pointerEvents: 'auto'
    }
  }, /*#__PURE__*/React.createElement(SceneHead, {
    s: s
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(ArrowCTA, {
    tone: "blue",
    onClick: onTech
  }, "Read the technical chapters")))));
}
function SiteFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ex-bg)',
      padding: '72px var(--gutter-page) 140px',
      borderTop: '1px solid var(--ex-line)',
      fontFamily: 'var(--font-editorial)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1360,
      margin: '0 auto',
      display: 'flex',
      flexWrap: 'wrap',
      gap: 48,
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("b", null, "Oil & Gas"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 300
    }
  }, "Development"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-kr)',
      textTransform: 'none',
      letterSpacing: 0,
      fontSize: 13,
      color: 'var(--ex-muted)',
      maxWidth: 300,
      lineHeight: 1.6
    }
  }, "From Subsurface to Field Development. \uBCF8 \uC0AC\uC774\uD2B8\uC758 \uC218\uCE58\uB294 \uC124\uBA85\uC744 \uC704\uD55C \uC608\uC2DC\uC785\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,minmax(140px,1fr))',
      gap: '8px 40px',
      fontSize: 13
    }
  }, S.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.id,
    href: 'index.html#scene-' + s.id,
    style: {
      color: 'var(--ex-navy)',
      textDecoration: 'none',
      lineHeight: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ex-faint)',
      marginRight: 8
    }
  }, s.num), s.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1360,
      margin: '48px auto 0',
      fontSize: 12,
      color: 'var(--ex-faint)'
    }
  }, "\xA9 2026 Oil & Gas Development"));
}
Object.assign(window, {
  Hero,
  StageIndex,
  SurfaceScene,
  PetroleumScene,
  SubsurfaceScene,
  WellScene,
  SeismicScene,
  ReservoirScene,
  EngineeringScene,
  ProductionScene,
  FieldScene,
  SiteFooter,
  SceneHead,
  Fact,
  Callout,
  sceneType
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/explorer/Scenes.jsx", error: String((e && e.message) || e) }); }

// ui_kits/explorer/Storyboard.jsx
try { (() => {
const {
  TechViz,
  StageNav,
  SiteHeader,
  ArrowCTA,
  DepthRuler,
  TextLink,
  Button,
  SearchInput
} = window.OilGasDevelopmentDesignSystem_dcb6ae;
const ST = window.OGD_STAGES;
const DEPTH = [0, 0, 0.45, 0.7, 0.8, 1, 0.75, 0.55, 0.05, 0];
function Thumb({
  s
}) {
  const m = {
    surface: /*#__PURE__*/React.createElement("image-slot", {
      id: "sb-surface",
      shape: "rect",
      placeholder: "Coastline / offshore photo"
    }),
    petroleum: /*#__PURE__*/React.createElement(TechViz, {
      kind: "strata",
      seed: 5,
      resolution: 0.6
    }),
    subsurface: /*#__PURE__*/React.createElement(TechViz, {
      kind: "structure",
      seed: 21
    }),
    well: /*#__PURE__*/React.createElement(TechViz, {
      kind: "log",
      seed: 8
    }),
    seismic: /*#__PURE__*/React.createElement(TechViz, {
      kind: "seismic",
      seed: 4,
      resolution: 0.7
    }),
    reservoir: /*#__PURE__*/React.createElement("div", {
      style: {
        background: '#13263D',
        height: '100%',
        padding: 12
      }
    }, /*#__PURE__*/React.createElement(TechViz, {
      kind: "reservoir",
      seed: 3
    })),
    engineering: /*#__PURE__*/React.createElement("div", {
      style: {
        background: '#fff',
        height: '100%',
        padding: '8px 4px'
      }
    }, /*#__PURE__*/React.createElement(TechViz, {
      kind: "decline",
      seed: 2
    })),
    production: /*#__PURE__*/React.createElement("image-slot", {
      id: "sb-production",
      shape: "rect",
      placeholder: "FPSO photo"
    }),
    field: /*#__PURE__*/React.createElement("image-slot", {
      id: "sb-field",
      shape: "rect",
      placeholder: "Wide field photo"
    })
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%',
      borderRadius: 4,
      overflow: 'hidden',
      background: s.bg
    }
  }, m[s.id]);
}
function DepthProfile() {
  const W = 1000,
    H = 120,
    n = ST.length + 1,
    pts = DEPTH.map((d, i) => [(i + 0.5) * W / n, 12 + d * (H - 24)]);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(' + n + ',minmax(0,1fr))',
      fontFamily: 'var(--font-editorial)',
      fontSize: 11,
      color: 'var(--ex-faint)',
      marginBottom: 8
    }
  }, ['00 Hero', ...ST.map(s => s.num + ' ' + s.label)].map(l => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      padding: '0 4px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: H
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      gridTemplateColumns: 'repeat(' + n + ',minmax(0,1fr))'
    }
  }, ['#F6F8FB', ...ST.map(s => s.bg)].map((b, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      background: b,
      borderRight: '1px solid rgba(11,26,44,0.06)'
    }
  }))), /*#__PURE__*/React.createElement("svg", {
    viewBox: '0 0 ' + W + ' ' + H,
    preserveAspectRatio: "none",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: pts.map(p => p.join(',')).join(' '),
    fill: "none",
    stroke: "#0A5CDB",
    strokeWidth: "2",
    vectorEffect: "non-scaling-stroke"
  })), pts.map((p, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      position: 'absolute',
      left: p[0] / W * 100 + '%',
      top: p[1],
      width: 9,
      height: 9,
      marginLeft: -4.5,
      marginTop: -4.5,
      borderRadius: '50%',
      background: '#fff',
      border: '2px solid #0A5CDB'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-kr)',
      fontSize: 12,
      color: 'var(--ex-muted)',
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uC9C0\uD45C (0 m) \u2014 \uBC1D\uC740 \uBC30\uACBD"), /*#__PURE__*/React.createElement("span", null, "\uAC00\uC7A5 \uAE4A\uC740 \uC9C0\uC810 \u2014 Seismic \xB7 Reservoir (navy)"), /*#__PURE__*/React.createElement("span", null, "\uC0C1\uC2B9 \u2014 \uC0DD\uC0B0 \xB7 \uAC1C\uBC1C (\uBC1D\uC740 \uBC30\uACBD)")));
}
function Row({
  s
}) {
  const lab = {
    fontFamily: 'var(--font-editorial)',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--ex-blue)',
    marginBottom: 6
  };
  const txt = {
    fontFamily: 'var(--font-kr)',
    fontSize: 14,
    lineHeight: 1.65,
    color: 'var(--ex-navy)',
    margin: 0
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(180px,1fr) minmax(280px,1.6fr) minmax(320px,2.4fr)',
      gap: 40,
      padding: '40px 0',
      borderTop: '1px solid var(--ex-line)',
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-editorial)',
      fontSize: 13,
      color: 'var(--ex-faint)'
    }
  }, "/ ", s.num), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-editorial)',
      fontSize: 22,
      fontWeight: 600,
      margin: '8px 0 6px',
      color: 'var(--ex-navy)'
    }
  }, s.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-editorial)',
      fontSize: 14,
      color: 'var(--ex-muted)',
      lineHeight: 1.4
    }
  }, s.title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      fontFamily: 'var(--font-editorial)',
      fontSize: 11,
      color: 'var(--ex-faint)'
    }
  }, "Depth \xB7 ", s.depth, /*#__PURE__*/React.createElement("br", null), "Background \xB7 ", s.bg)), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16/9'
    }
  }, /*#__PURE__*/React.createElement(Thumb, {
    s: s
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: lab
  }, "In"), /*#__PURE__*/React.createElement("p", {
    style: txt
  }, s.t.in)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: lab
  }, "Hold"), /*#__PURE__*/React.createElement("p", {
    style: txt
  }, s.t.hold)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: lab
  }, "Out \u2192 next"), /*#__PURE__*/React.createElement("p", {
    style: txt
  }, s.t.out)), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1/-1',
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      fontFamily: 'var(--font-editorial)',
      fontSize: 12,
      color: 'var(--ex-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '4px 10px',
      borderRadius: 999,
      background: 'var(--ex-tint)',
      color: 'var(--ex-blue)',
      fontWeight: 600
    }
  }, "Persistent"), s.t.persist)));
}
function StoryboardApp() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ex-bg)'
    }
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    links: window.OGD_LINKS,
    active: "storyboard",
    onNavigate: window.OGD_GO,
    position: "relative"
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '64px var(--gutter-page) 140px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1360,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '32px 80px',
      alignItems: 'flex-end',
      marginBottom: 72
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 480px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...sceneType.eyebrow,
      color: 'var(--ex-faint)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, "Homepage \xB7 Scroll storyboard")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '24px 0 0',
      fontFamily: 'var(--font-editorial)',
      fontSize: 'var(--type-editorial-lg)',
      fontWeight: 300,
      letterSpacing: '-0.02em',
      lineHeight: 1,
      color: 'var(--ex-navy)'
    }
  }, "A descent, then an ascent.")), /*#__PURE__*/React.createElement("p", {
    style: {
      ...sceneType.body,
      flex: '1 1 360px',
      margin: 0,
      color: 'var(--ex-muted)'
    }
  }, "\uD648\uD398\uC774\uC9C0\uB294 \uC9C0\uD45C\uC5D0\uC11C \uCD9C\uBC1C\uD574 \uAC00\uC7A5 \uAE4A\uC740 \uD0C4\uC131\uD30C\xB7\uC800\uB958\uCE35 \uC7A5\uBA74\uAE4C\uC9C0 \uB0B4\uB824\uAC04 \uB4A4, \uC0DD\uC0B0\uACFC \uAC1C\uBC1C\uB85C \uB2E4\uC2DC \uC62C\uB77C\uC624\uB294 \uD558\uB098\uC758 \uC218\uC9C1 \uC5EC\uC815\uC785\uB2C8\uB2E4. \uC544\uB798\uB294 \uC7A5\uBA74\uBCC4 \uC2DC\uAC01\uC801 \uAD00\uACC4\uC640 \uC804\uD658 \uAC1C\uB150\uC774\uBA70, \uAC19\uC740 \uB0B4\uC6A9\uC774 \uAC01 \uC139\uC158\uC758 data-transition-* \uC18D\uC131\uC5D0 \uAE30\uB85D\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement(DepthProfile, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
      gap: 32,
      margin: '72px 0 24px'
    }
  }, [['StageNav', '모든 장면에서 하단 고정. 섹션이 화면 중앙에 오면 현재 단계가 바뀝니다.'], ['Depth ruler', '히어로 우측의 깊이 게이지. 장면이 바뀔 때 표시 깊이(data-depth)를 따라갑니다.'], ['Sea level seam', '사진과 지층이 만나는 수평선. 하강의 출발점이자 생산 장면에서 복귀하는 기준선입니다.']].map(([a, b]) => /*#__PURE__*/React.createElement("div", {
    key: a,
    style: {
      borderTop: '2px solid var(--ex-blue)',
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-editorial)',
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--ex-navy)'
    }
  }, a), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-kr)',
      fontSize: 14,
      lineHeight: 1.65,
      color: 'var(--ex-muted)',
      margin: '8px 0 0'
    }
  }, b)))), ST.map(s => /*#__PURE__*/React.createElement(Row, {
    key: s.id,
    s: s
  })))), /*#__PURE__*/React.createElement(SiteFooter, null), /*#__PURE__*/React.createElement(StageNav, {
    stages: ST,
    current: 0,
    onSelect: i => location.href = 'index.html#scene-' + ST[i].id,
    cta: "Open homepage",
    onCta: () => location.href = 'index.html'
  }));
}
{
  const __el = document.getElementById('root');
  if (__el && __el.dataset.app === 'storyboard' && !__el.__mounted && window.OilGasDevelopmentDesignSystem_dcb6ae && window.OilGasDevelopmentDesignSystem_dcb6ae.TechViz !== undefined && (__el.__mounted = true)) ReactDOM.createRoot(__el).render(/*#__PURE__*/React.createElement(StoryboardApp, null));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/explorer/Storyboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/explorer/Technical.jsx
try { (() => {
const {
  TechViz,
  TechNav,
  SiteHeader,
  ArrowCTA,
  DepthRuler,
  TextLink,
  Button,
  SearchInput
} = window.OilGasDevelopmentDesignSystem_dcb6ae;
const T = sceneType;
const TECH = window.OGD_TECH,
  TOPIC = 'pt-generation';
const TFLAT = [];
TECH.forEach(c => c.topics.forEach(t => TFLAT.push({
  ...t,
  cat: c
})));
const TI = TFLAT.findIndex(t => t.id === TOPIC),
  TCUR = TFLAT[TI],
  TPREV = TFLAT[TI - 1],
  TNEXT = TFLAT[TI + 1];
const openTopic = t => {
  if (t && t.href) location.href = t.href;
};
function Crumb() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1360,
      margin: '0 auto',
      display: 'flex',
      gap: 10,
      fontFamily: 'var(--font-editorial)',
      fontSize: 12,
      color: 'var(--ex-faint)',
      letterSpacing: '0.04em'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "Technical.html",
    style: {
      color: 'var(--ex-faint)',
      textDecoration: 'none'
    }
  }, "Technology"), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("a", {
    style: {
      color: 'var(--ex-faint)',
      textDecoration: 'none'
    }
  }, TCUR.cat.num, " ", TCUR.cat.label), /*#__PURE__*/React.createElement("span", null, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ex-blue)',
      fontWeight: 600
    }
  }, "Topic ", TCUR.num));
}
function H2({
  num,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...T.eyebrow,
      color: 'var(--ex-faint)'
    }
  }, /*#__PURE__*/React.createElement("span", null, num), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 1,
      background: 'currentColor'
    }
  })), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-editorial)',
      fontSize: 'var(--type-editorial-md)',
      fontWeight: 300,
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      color: 'var(--ex-navy)',
      maxWidth: 820,
      textWrap: 'balance'
    }
  }, children));
}
const ELEMENTS = [{
  n: '01',
  t: 'Source Rock',
  kr: '유기물이 풍부한 셰일이 매몰되어 열과 압력을 받으면 케로겐이 석유와 가스로 변합니다.',
  v: () => /*#__PURE__*/React.createElement("image-slot", {
    id: "tech-source",
    shape: "rect",
    placeholder: "Photo \u2014 organic-rich black shale sample"
  })
}, {
  n: '02',
  t: 'Migration',
  kr: '생성된 탄화수소는 부력에 의해 투수성 지층과 단층을 따라 위쪽으로 이동합니다.',
  v: () => /*#__PURE__*/React.createElement(TechViz, {
    kind: "strata",
    seed: 3
  })
}, {
  n: '03',
  t: 'Reservoir',
  kr: '공극과 투과도가 높은 사암·탄산염암이 이동한 유체를 담아 둡니다.',
  v: () => /*#__PURE__*/React.createElement("image-slot", {
    id: "tech-core",
    shape: "rect",
    placeholder: "Photo \u2014 sandstone core slab"
  })
}, {
  n: '04',
  t: 'Trap & Seal',
  kr: '배사 구조나 단층이 닫힌 형태를 만들고, 불투수성 덮개암이 누출을 막습니다.',
  v: () => /*#__PURE__*/React.createElement(TechViz, {
    kind: "structure",
    seed: 21
  })
}];
const EVENTS = [['Source rock', [[10, 18]], '#0B1A2C'], ['Reservoir rock', [[30, 14]], '#0B1A2C'], ['Seal rock', [[44, 10]], '#0B1A2C'], ['Overburden', [[54, 46]], '#8A98A8'], ['Trap formation', [[58, 14]], '#0A5CDB'], ['Generation · Migration', [[70, 30]], '#F29A1F'], ['Preservation', [[72, 28]], '#12A4D9']];
function EventChart() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-editorial)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      fontSize: 11,
      color: 'var(--ex-faint)',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, ['200 Ma', '150', '100', '50', '0'].map(t => /*#__PURE__*/React.createElement("span", {
    key: t
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, EVENTS.map(([l, bars, c]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: 'grid',
      gridTemplateColumns: '200px 1fr',
      alignItems: 'center',
      height: 44,
      borderTop: '1px solid var(--ex-line)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--ex-navy)'
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '100%'
    }
  }, bars.map(([a, w], i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      position: 'absolute',
      left: a + '%',
      width: w + '%',
      top: 15,
      height: 14,
      background: c,
      borderRadius: 2
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 'calc(200px + (100% - 200px) * 0.82)',
      width: 2,
      background: 'var(--ex-blue)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -26,
      left: -40,
      width: 120,
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--ex-blue)'
    }
  }, "Critical moment \xB7 36 Ma"))));
}
const PARAMS = [['Total organic carbon (TOC)', '3.2 wt%', 'Rock-Eval pyrolysis'], ['Kerogen type', 'Type II', 'Visual kerogen / HI–OI'], ['Vitrinite reflectance (Ro)', '0.85 – 1.10 %', 'Oil window'], ['Reservoir porosity', '18 – 24 %', 'Core & log'], ['Permeability', '50 – 400 mD', 'Core plug'], ['Seal entry pressure', '2.8 MPa', 'MICP'], ['Hydrocarbon column', '120 m', 'Pressure gradient']];
function TechnicalApp() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--ex-bg)'
    }
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    links: window.OGD_LINKS,
    active: "technology",
    onNavigate: window.OGD_GO,
    position: "relative"
  }), /*#__PURE__*/React.createElement("section", {
    "data-category": "petroleum",
    "data-topic": "pt-generation",
    style: {
      padding: '24px var(--gutter-page) 120px'
    }
  }, /*#__PURE__*/React.createElement(Crumb, null), /*#__PURE__*/React.createElement("div", {
    style: {
      ...T.wrap,
      alignItems: 'stretch',
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 420px',
      maxWidth: 560,
      paddingTop: 48,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...T.eyebrow,
      color: 'var(--ex-faint)'
    }
  }, /*#__PURE__*/React.createElement("span", null, TCUR.cat.num), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 1,
      background: 'currentColor'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: 'var(--ex-blue)'
    }
  }, TCUR.cat.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums'
    }
  }, "\xB7 ", TCUR.num)), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '28px 0 0',
      fontFamily: 'var(--font-editorial)',
      fontSize: 'var(--type-editorial-md)',
      fontWeight: 400,
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      color: 'var(--ex-navy)',
      textWrap: 'balance'
    }
  }, "How Hydrocarbons Are Generated, Migrated and Trapped"), /*#__PURE__*/React.createElement("p", {
    style: {
      ...T.body,
      color: 'var(--ex-muted)',
      maxWidth: 500
    }
  }, "\uC11D\uC720 \uC2DC\uC2A4\uD15C\uC740 \uC218\uBC31\uB9CC \uB144\uC5D0 \uAC78\uCCD0 \uD568\uAED8 \uC791\uB3D9\uD558\uB294 \uC9C0\uC9C8\uD559\uC801 \uACFC\uC815\uC758 \uC9D1\uD569\uC785\uB2C8\uB2E4. \uADFC\uC6D0\uC554\uC758 \uC720\uAE30\uBB3C\uC774 \uD0C4\uD654\uC218\uC18C\uB85C \uBC14\uB00C\uACE0, \uC774\uB3D9\uD558\uC5EC \uC800\uB958\uC554\uC5D0 \uBAA8\uC774\uBA70, \uD2B8\uB7A9\uACFC \uB36E\uAC1C\uC554\uC5D0 \uC758\uD574 \uBCF4\uC874\uB429\uB2C8\uB2E4. \uAC01 \uC694\uC18C\uC640 \uADF8 \uC21C\uC11C\uAC00 \uBAA8\uB450 \uB9DE\uC544\uC57C \uB9E4\uC7A5\uB7C9\uC774 \uB429\uB2C8\uB2E4."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 48,
      display: 'flex',
      gap: 32,
      fontFamily: 'var(--font-editorial)',
      fontSize: 12,
      color: 'var(--ex-faint)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Topic ", TCUR.num, " of ", TCUR.cat.topics.length), /*#__PURE__*/React.createElement("span", null, TCUR.read, " read"), /*#__PURE__*/React.createElement("span", null, "Updated Oct 2026"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1.4 1 560px',
      position: 'relative',
      minHeight: 620,
      marginRight: 'calc(-1 * var(--gutter-page))'
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "tech-hero",
    shape: "rect",
    placeholder: "Photo \u2014 coastal cliff outcrop showing layered sedimentary rock"
  }), /*#__PURE__*/React.createElement(Callout, {
    x: "28%",
    y: "58%",
    label: "Outcrop analogue",
    sub: "Reservoir sandstone"
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#fff',
      padding: '120px var(--gutter-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1360,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(H2, {
    num: "2.1"
  }, "Four elements, one system."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))'
    }
  }, ELEMENTS.map((e, i) => /*#__PURE__*/React.createElement("article", {
    key: e.n,
    style: {
      padding: '0 28px 8px',
      borderLeft: i ? '1px solid var(--ex-line)' : 'none',
      paddingLeft: i ? 28 : 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-editorial)',
      fontSize: 13,
      color: 'var(--ex-blue)'
    }
  }, e.n), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-editorial)',
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: 'var(--ex-navy)'
    }
  }, e.t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-kr)',
      fontSize: 15,
      lineHeight: 1.7,
      color: 'var(--ex-muted)',
      minHeight: 76
    }
  }, e.kr), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 180,
      position: 'relative',
      marginTop: 12,
      borderRadius: 4,
      overflow: 'hidden'
    }
  }, e.v())))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(TextLink, {
    chevron: true,
    href: "#fig"
  }, "See the cross-section")))), /*#__PURE__*/React.createElement("section", {
    id: "fig",
    style: {
      padding: '120px var(--gutter-page) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1360,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(H2, {
    num: "2.2"
  }, "Where the system comes together.")), /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: '0 calc(-1 * var(--gutter-page))'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 640
    }
  }, /*#__PURE__*/React.createElement(TechViz, {
    kind: "strata",
    seed: 5
  }), /*#__PURE__*/React.createElement(Callout, {
    x: "40%",
    y: "27%",
    label: "Seal",
    sub: "Shale, 80 m"
  }), /*#__PURE__*/React.createElement(Callout, {
    x: "40%",
    y: "40%",
    label: "Accumulation",
    sub: "Oil leg 120 m"
  }), /*#__PURE__*/React.createElement(Callout, {
    x: "72%",
    y: "58%",
    label: "Normal fault",
    sub: "Migration pathway"
  }), /*#__PURE__*/React.createElement(Callout, {
    x: "22%",
    y: "84%",
    label: "Source kitchen",
    sub: "Ro 0.85 \u2013 1.10 %"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 'var(--gutter-page)',
      top: '14%',
      bottom: '6%'
    }
  }, /*#__PURE__*/React.createElement(DepthRuler, {
    marks: ['0 m', '1,000', '2,000', '3,000', '4,000 m']
  }))), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      padding: '16px var(--gutter-page) 0',
      maxWidth: 1360 + 0,
      margin: '0 auto',
      fontFamily: 'var(--font-editorial)',
      fontSize: 12,
      color: 'var(--ex-faint)'
    }
  }, "Figure 2.2 \u2014 Schematic cross-section of an anticlinal trap. Vertical exaggeration \xD75."))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '120px var(--gutter-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1360,
      margin: '0 auto',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '48px 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 320px',
      maxWidth: 420
    }
  }, /*#__PURE__*/React.createElement(H2, {
    num: "2.3"
  }, "Timing is the fifth element."), /*#__PURE__*/React.createElement("p", {
    style: {
      ...T.body,
      marginTop: 0,
      color: 'var(--ex-muted)'
    }
  }, "\uD2B8\uB7A9\uC740 \uD0C4\uD654\uC218\uC18C\uAC00 \uC774\uB3D9\uD558\uAE30 \uC804\uC5D0 \uD615\uC131\uB418\uC5B4 \uC788\uC5B4\uC57C \uD569\uB2C8\uB2E4. \uC774\uBCA4\uD2B8 \uCC28\uD2B8\uB294 \uAC01 \uC694\uC18C\uAC00 \uC5B8\uC81C \uB9CC\uB4E4\uC5B4\uC84C\uB294\uC9C0\uC640, \uC0DD\uC131\xB7\uC774\uB3D9\uC774 \uC2DC\uC791\uB41C \uC784\uACC4 \uC2DC\uC810(critical moment)\uC744 \uD568\uAED8 \uBCF4\uC5EC\uC90D\uB2C8\uB2E4.")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '2 1 560px',
      paddingTop: 40
    }
  }, /*#__PURE__*/React.createElement(EventChart, null)))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: '#fff',
      padding: '120px var(--gutter-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1360,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(H2, {
    num: "2.4"
  }, "Key parameters."), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontFamily: 'var(--font-editorial)',
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['Parameter', 'Value', 'Method'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: 'left',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--ex-faint)',
      padding: '0 0 14px',
      borderBottom: '1px solid var(--ex-navy)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, PARAMS.map(([a, b, c]) => /*#__PURE__*/React.createElement("tr", {
    key: a
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '18px 0',
      borderBottom: '1px solid var(--ex-line)',
      color: 'var(--ex-navy)'
    }
  }, a), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '18px 0',
      borderBottom: '1px solid var(--ex-line)',
      fontVariantNumeric: 'tabular-nums',
      color: 'var(--ex-navy)',
      fontWeight: 600
    }
  }, b), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '18px 0',
      borderBottom: '1px solid var(--ex-line)',
      color: 'var(--ex-muted)'
    }
  }, c))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '96px var(--gutter-page) 120px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1360,
      margin: '0 auto',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 40,
      borderTop: '1px solid var(--ex-line)',
      paddingTop: 40
    }
  }, TPREV ? /*#__PURE__*/React.createElement("a", {
    onClick: () => openTopic(TPREV),
    style: {
      cursor: 'pointer',
      fontFamily: 'var(--font-editorial)',
      textDecoration: 'none',
      color: 'var(--ex-muted)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon-arrow-left"
  }), " ", TPREV.num, " ", TPREV.title) : /*#__PURE__*/React.createElement("a", {
    style: {
      fontFamily: 'var(--font-editorial)',
      textDecoration: 'none',
      color: 'var(--ex-muted)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "icon-arrow-left"
  }), " ", TCUR.cat.num, " ", TCUR.cat.label, " \xB7 All topics"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...T.eyebrow,
      justifyContent: 'flex-end',
      color: 'var(--ex-faint)'
    }
  }, TNEXT && TNEXT.cat === TCUR.cat ? 'Next topic · ' + TNEXT.num : 'Next category · ' + (TNEXT ? TNEXT.cat.num + ' ' + TNEXT.cat.label : '')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-editorial)',
      fontSize: 'var(--type-editorial-lg)',
      fontWeight: 300,
      letterSpacing: '-0.02em',
      lineHeight: 1,
      margin: '16px 0 28px',
      color: 'var(--ex-navy)',
      maxWidth: 760,
      marginLeft: 'auto',
      textWrap: 'balance'
    }
  }, TNEXT && TNEXT.title), /*#__PURE__*/React.createElement(ArrowCTA, {
    tone: "blue",
    onClick: () => openTopic(TNEXT)
  }, "Continue reading")))), /*#__PURE__*/React.createElement(SiteFooter, null), /*#__PURE__*/React.createElement(TechNav, {
    categories: TECH,
    topic: TOPIC,
    onNavigate: openTopic,
    defaultOpen: location.hash === '#topics'
  }));
}
{
  const __el = document.getElementById('root');
  if (__el && __el.dataset.app === 'technical' && !__el.__mounted && window.OilGasDevelopmentDesignSystem_dcb6ae && window.OilGasDevelopmentDesignSystem_dcb6ae.TechViz !== undefined && window.OilGasDevelopmentDesignSystem_dcb6ae.TechNav !== undefined && (__el.__mounted = true)) ReactDOM.createRoot(__el).render(/*#__PURE__*/React.createElement(TechnicalApp, null));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/explorer/Technical.jsx", error: String((e && e.message) || e) }); }

// ui_kits/explorer/ds-standalone.js
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
(function () {
  // buttons/Button

  function usePress() {
    const [p, setP] = React.useState(false);
    return [p, {
      onMouseDown: () => setP(true),
      onMouseUp: () => setP(false),
      onMouseLeave: () => setP(false),
      onTouchStart: () => setP(true),
      onTouchEnd: () => setP(false)
    }];
  }
  const base = {
    fontFamily: 'var(--font-text)',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    whiteSpace: 'nowrap',
    transition: 'transform var(--dur-fast) var(--ease-standard)',
    textDecoration: 'none'
  };
  const variants = {
    primary: {
      background: 'var(--color-primary)',
      color: 'var(--color-on-primary)',
      borderRadius: 'var(--radius-pill)',
      padding: '11px 22px',
      fontSize: 17,
      fontWeight: 400,
      lineHeight: 1.18,
      letterSpacing: '-0.374px'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--color-primary)',
      border: '1px solid var(--color-primary)',
      borderRadius: 'var(--radius-pill)',
      padding: '10px 21px',
      fontSize: 17,
      fontWeight: 400,
      lineHeight: 1.18,
      letterSpacing: '-0.374px'
    },
    'dark-utility': {
      background: 'var(--color-ink)',
      color: 'var(--color-on-dark)',
      borderRadius: 'var(--radius-sm)',
      padding: '8px 15px',
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.29,
      letterSpacing: '-0.224px'
    },
    pearl: {
      background: 'var(--color-surface-pearl)',
      color: 'var(--color-ink-muted-80)',
      border: '3px solid var(--color-divider-soft)',
      borderRadius: 'var(--radius-md)',
      padding: '8px 14px',
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.29,
      letterSpacing: '-0.224px'
    },
    'store-hero': {
      background: 'var(--color-primary)',
      color: 'var(--color-on-primary)',
      borderRadius: 'var(--radius-pill)',
      padding: '14px 28px',
      fontSize: 18,
      fontWeight: 300,
      lineHeight: 1
    }
  };
  function Button({
    variant = 'primary',
    onDark = false,
    disabled = false,
    href,
    children,
    style,
    onClick,
    type = 'button',
    ...rest
  }) {
    const [pressed, h] = usePress();
    const [focus, setFocus] = React.useState(false);
    const v = {
      ...variants[variant]
    };
    if (variant === 'secondary' && onDark) {
      v.color = 'var(--color-primary-on-dark)';
      v.borderColor = 'var(--color-primary-on-dark)';
    }
    const s = {
      ...base,
      ...v,
      transform: pressed && !disabled ? 'var(--press-scale)' : 'none',
      outline: focus ? '2px solid var(--color-primary-focus)' : 'none',
      outlineOffset: 2,
      ...(disabled ? {
        opacity: 1,
        cursor: 'default',
        color: 'var(--color-ink-muted-48)',
        background: variant === 'secondary' ? 'transparent' : 'var(--color-divider-soft)',
        borderColor: 'var(--color-hairline)'
      } : {}),
      ...style
    };
    const props = {
      ...h,
      onFocus: () => setFocus(true),
      onBlur: () => setFocus(false),
      style: s,
      onClick: disabled ? undefined : onClick,
      ...rest
    };
    return href && !disabled ? /*#__PURE__*/React.createElement("a", _extends({
      href: href
    }, props), children) : /*#__PURE__*/React.createElement("button", _extends({
      type: type,
      disabled: disabled
    }, props), children);
  }

  // buttons/IconButton

  function IconButton({
    icon = 'x',
    label,
    size = 44,
    onDark = false,
    onClick,
    style
  }) {
    const [p, h] = usePress();
    return /*#__PURE__*/React.createElement("button", _extends({
      "aria-label": label || icon,
      onClick: onClick
    }, h, {
      style: {
        width: size,
        height: size,
        borderRadius: 'var(--radius-full)',
        border: 'none',
        background: onDark ? 'rgba(66,66,69,0.72)' : 'var(--color-surface-chip-translucent-a)',
        color: onDark ? 'var(--color-on-dark)' : 'var(--color-ink)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backdropFilter: 'var(--blur-frosted)',
        WebkitBackdropFilter: 'var(--blur-frosted)',
        transform: p ? 'var(--press-scale)' : 'none',
        transition: 'transform var(--dur-fast) var(--ease-standard)',
        fontSize: Math.round(size * 0.41),
        ...style
      }
    }), /*#__PURE__*/React.createElement("i", {
      className: 'icon-' + icon,
      "aria-hidden": "true"
    }));
  }

  // buttons/TextLink

  function TextLink({
    href = '#',
    onDark = false,
    chevron = false,
    underline = false,
    children,
    style,
    onClick
  }) {
    return /*#__PURE__*/React.createElement("a", {
      href: href,
      onClick: onClick,
      style: {
        color: onDark ? 'var(--color-primary-on-dark)' : 'var(--color-primary)',
        textDecoration: underline ? 'underline' : 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        ...style
      }
    }, children, chevron && /*#__PURE__*/React.createElement("i", {
      className: "icon-chevron-right",
      "aria-hidden": "true",
      style: {
        fontSize: '0.85em'
      }
    }));
  }

  // navigation/GlobalNav

  function GlobalNav({
    brand = 'Oil & Gas Development',
    links = [],
    active,
    onNavigate,
    style
  }) {
    const ls = {
      color: 'var(--color-on-dark)',
      opacity: 0.8,
      fontSize: 12,
      letterSpacing: '-0.12px',
      lineHeight: 1,
      textDecoration: 'none',
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    };
    return /*#__PURE__*/React.createElement("nav", {
      style: {
        background: 'var(--color-surface-black)',
        height: 'var(--nav-global-h)',
        color: 'var(--color-on-dark)',
        fontFamily: 'var(--font-text)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1024,
        margin: '0 auto',
        height: '100%',
        padding: '0 22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20
      }
    }, /*#__PURE__*/React.createElement("a", {
      onClick: () => onNavigate && onNavigate('home'),
      style: {
        ...ls,
        opacity: 1,
        fontWeight: 600,
        fontSize: 13
      }
    }, brand), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        overflow: 'hidden'
      }
    }, links.map(l => /*#__PURE__*/React.createElement("a", {
      key: l.id || l.label,
      onClick: () => onNavigate && onNavigate(l.id),
      style: {
        ...ls,
        opacity: active === l.id ? 1 : 0.8
      }
    }, l.label))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 20,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "icon-search",
      style: {
        fontSize: 15,
        opacity: 0.8
      }
    }), /*#__PURE__*/React.createElement("i", {
      className: "icon-globe",
      style: {
        fontSize: 15,
        opacity: 0.8
      }
    }))));
  }

  // navigation/SubNav

  function SubNav({
    title,
    links = [],
    active,
    onNavigate,
    cta,
    onCta,
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 10,
        height: 'var(--nav-sub-h)',
        background: 'var(--color-surface-frosted)',
        backdropFilter: 'var(--blur-frosted)',
        WebkitBackdropFilter: 'var(--blur-frosted)',
        borderBottom: '1px solid var(--color-hairline-a)',
        fontFamily: 'var(--font-text)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1024,
        margin: '0 auto',
        height: '100%',
        padding: '0 22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 21,
        fontWeight: 600,
        letterSpacing: '0.231px',
        lineHeight: 1.19,
        color: 'var(--color-ink)',
        whiteSpace: 'nowrap'
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 24
      }
    }, links.map(l => /*#__PURE__*/React.createElement("a", {
      key: l.id || l.label,
      onClick: () => onNavigate && onNavigate(l.id),
      style: {
        fontSize: 12,
        letterSpacing: '-0.12px',
        color: active === l.id ? 'var(--color-ink-muted-48)' : 'var(--color-ink)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        textDecoration: 'none'
      }
    }, l.label)), cta && /*#__PURE__*/React.createElement(Button, {
      onClick: onCta,
      style: {
        padding: '4px 11px',
        fontSize: 12,
        letterSpacing: '-0.12px',
        lineHeight: 1.33
      }
    }, cta))));
  }

  // surfaces/MediaFrame

  function MediaFrame({
    src,
    alt = '',
    label = 'Image',
    ratio = '16/9',
    radius = 0,
    shadow = false,
    tone = 'light',
    fit = 'cover',
    style
  }) {
    const dark = tone === 'dark';
    return /*#__PURE__*/React.createElement("div", {
      style: {
        aspectRatio: ratio,
        width: '100%',
        borderRadius: radius,
        overflow: 'hidden',
        boxShadow: shadow ? 'var(--shadow-product)' : 'none',
        background: dark ? '#3a3a3c' : '#e8e8ed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }
    }, src ? /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: alt,
      style: {
        width: '100%',
        height: '100%',
        objectFit: fit,
        display: 'block'
      }
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        letterSpacing: '-0.12px',
        color: dark ? '#a1a1a6' : 'var(--color-ink-muted-48)',
        fontFamily: 'var(--font-text)'
      }
    }, label));
  }

  // surfaces/ProductTile

  const tones = {
    light: 'var(--color-canvas)',
    parchment: 'var(--color-canvas-parchment)',
    dark: 'var(--color-surface-tile-1)',
    'dark-2': 'var(--color-surface-tile-2)',
    'dark-3': 'var(--color-surface-tile-3)',
    black: 'var(--color-surface-black)'
  };
  function ProductTile({
    tone = 'light',
    eyebrow,
    title,
    tagline,
    actions,
    children,
    hero = false,
    style
  }) {
    const dark = tone.startsWith('dark') || tone === 'black';
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: tones[tone],
        color: dark ? 'var(--color-on-dark)' : 'var(--color-ink)',
        padding: 'var(--space-section) 22px 0',
        textAlign: 'center',
        overflow: 'hidden',
        fontFamily: 'var(--font-text)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 980,
        margin: '0 auto'
      }
    }, eyebrow && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 21,
        fontWeight: 600,
        letterSpacing: '0.231px',
        lineHeight: 1.19,
        marginBottom: 8,
        color: dark ? 'var(--color-body-muted)' : 'var(--color-ink)'
      }
    }, eyebrow), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: hero ? 56 : 40,
        lineHeight: hero ? 1.07 : 1.1,
        letterSpacing: hero ? '-0.28px' : 0,
        textWrap: 'balance'
      }
    }, title), tagline && /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '6px 0 0',
        fontSize: 28,
        fontWeight: 400,
        lineHeight: 1.14,
        letterSpacing: '0.196px',
        textWrap: 'balance'
      }
    }, tagline), actions && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 16,
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 24
      }
    }, actions)), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1200,
        margin: '0 auto',
        paddingTop: children ? 48 : 0,
        paddingBottom: children ? 0 : 'var(--space-section)'
      }
    }, children));
  }

  // surfaces/QuoteCard

  function QuoteCard({
    src,
    label = 'Landscape photograph',
    kicker,
    title,
    body,
    action,
    style
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        position: 'relative',
        background: 'var(--color-surface-tile-1)',
        color: 'var(--color-on-dark)',
        padding: 'var(--space-section) 22px',
        textAlign: 'center',
        minHeight: 520,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'var(--font-text)',
        ...style
      }
    }, src ? /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: "",
      style: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 16,
        bottom: 12,
        fontSize: 12,
        color: '#86868b'
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        maxWidth: 760
      }
    }, kicker && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: '-0.224px',
        marginBottom: 16,
        color: 'var(--color-body-muted)'
      }
    }, kicker), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontSize: 40,
        fontWeight: 600,
        lineHeight: 1.1,
        textWrap: 'balance'
      }
    }, title), body && /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '16px auto 0',
        fontSize: 24,
        fontWeight: 300,
        lineHeight: 1.5,
        maxWidth: 640,
        color: 'var(--color-body-muted)'
      }
    }, body), action && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 32
      }
    }, action)));
  }

  // surfaces/StickyBar

  function StickyBar({
    label,
    value,
    cta = 'Continue',
    onCta,
    position = 'fixed',
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        height: 'var(--sticky-bar-h)',
        background: 'var(--color-surface-frosted)',
        backdropFilter: 'var(--blur-frosted)',
        WebkitBackdropFilter: 'var(--blur-frosted)',
        borderTop: '1px solid var(--color-hairline-a)',
        padding: '12px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        fontFamily: 'var(--font-text)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 17,
        letterSpacing: '-0.374px',
        color: 'var(--color-ink)'
      }
    }, label && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--color-ink-muted-48)',
        marginRight: 8
      }
    }, label), value), /*#__PURE__*/React.createElement(Button, {
      onClick: onCta
    }, cta));
  }

  // cards/UtilityCard

  function UtilityCard({
    src,
    imageLabel = 'Image',
    ratio = '1/1',
    eyebrow,
    title,
    meta,
    link,
    href = '#',
    onClick,
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      onClick: onClick,
      style: {
        background: 'var(--color-canvas)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        fontFamily: 'var(--font-text)',
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }
    }, /*#__PURE__*/React.createElement(MediaFrame, {
      src: src,
      label: imageLabel,
      ratio: ratio,
      radius: 8
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, eyebrow && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        letterSpacing: '-0.12px',
        color: 'var(--color-ink-muted-48)',
        marginBottom: 4
      }
    }, eyebrow), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 17,
        fontWeight: 600,
        lineHeight: 1.24,
        letterSpacing: '-0.374px',
        color: 'var(--color-ink)'
      }
    }, title), meta && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 17,
        lineHeight: 1.47,
        letterSpacing: '-0.374px',
        color: 'var(--color-ink)'
      }
    }, meta), link && /*#__PURE__*/React.createElement("a", {
      href: href,
      style: {
        fontSize: 14,
        letterSpacing: '-0.224px',
        color: 'var(--color-primary)',
        marginTop: 8,
        textDecoration: 'none'
      }
    }, link, " ", /*#__PURE__*/React.createElement("i", {
      className: "icon-chevron-right",
      style: {
        fontSize: 11
      }
    }))));
  }

  // cards/OptionChip

  function OptionChip({
    label,
    detail,
    selected = false,
    thumb,
    onClick,
    style
  }) {
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      style: {
        background: 'var(--color-canvas)',
        color: 'var(--color-ink)',
        border: selected ? '2px solid var(--color-primary-focus)' : '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-pill)',
        padding: selected ? '11px 15px' : '12px 16px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: 'var(--font-text)',
        fontSize: 14,
        lineHeight: 1.43,
        letterSpacing: '-0.224px',
        cursor: 'pointer',
        textAlign: 'left',
        ...style
      }
    }, thumb && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: thumb,
        flex: 'none'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, label), detail && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--color-ink-muted-48)'
      }
    }, detail));
  }

  // forms/SearchInput

  function SearchInput({
    value,
    onChange,
    placeholder = 'Search',
    style
  }) {
    const [f, setF] = React.useState(false);
    return /*#__PURE__*/React.createElement("label", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        height: 44,
        padding: '0 20px',
        background: 'var(--color-canvas)',
        border: '1px solid var(--color-hairline-a)',
        borderRadius: 'var(--radius-pill)',
        outline: f ? '2px solid var(--color-primary-focus)' : 'none',
        outlineOffset: 1,
        fontFamily: 'var(--font-text)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "icon-search",
      style: {
        fontSize: 14,
        color: 'var(--color-ink-muted-48)'
      }
    }), /*#__PURE__*/React.createElement("input", {
      value: value,
      onChange: e => onChange && onChange(e.target.value),
      placeholder: placeholder,
      onFocus: () => setF(true),
      onBlur: () => setF(false),
      style: {
        border: 'none',
        outline: 'none',
        background: 'transparent',
        flex: 1,
        fontSize: 17,
        letterSpacing: '-0.374px',
        color: 'var(--color-ink)',
        fontFamily: 'inherit'
      }
    }));
  }

  // footer/Footer

  function Footer({
    columns = [],
    note,
    legal,
    style
  }) {
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        background: 'var(--color-canvas-parchment)',
        color: 'var(--color-ink-muted-80)',
        padding: '64px 22px',
        fontFamily: 'var(--font-text)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 980,
        margin: '0 auto'
      }
    }, note && /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        lineHeight: 1.33,
        letterSpacing: '-0.12px',
        color: 'var(--color-ink-muted-48)',
        margin: '0 0 24px',
        paddingBottom: 16,
        borderBottom: '1px solid var(--color-hairline)'
      }
    }, note), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
        gap: 24
      }
    }, columns.map(c => /*#__PURE__*/React.createElement("div", {
      key: c.title
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1.29,
        letterSpacing: '-0.224px',
        color: 'var(--color-ink)',
        marginBottom: 6
      }
    }, c.title), c.links.map(l => /*#__PURE__*/React.createElement("div", {
      key: l,
      style: {
        fontSize: 12,
        lineHeight: 2.41,
        letterSpacing: '-0.12px'
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        color: 'var(--color-ink-muted-80)',
        textDecoration: 'none'
      }
    }, l)))))), legal && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 32,
        paddingTop: 16,
        borderTop: '1px solid var(--color-hairline)',
        fontSize: 12,
        lineHeight: 1,
        letterSpacing: '-0.12px',
        color: 'var(--color-ink-muted-48)'
      }
    }, legal)));
  }

  // explorer/TechViz

  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a |= 0;
      a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const RAMP = ['#0B1F6B', '#1F4FD1', '#16A3D8', '#3CC48C', '#E9D43A', '#F29A1F', '#D6402B'].map(hex);
  const SEIS = ['#1C3F9E', '#6F8FD0', '#F4F1EA', '#D88A70', '#B8322A'].map(hex);
  function ramp(stops, t) {
    t = Math.max(0, Math.min(0.9999, t));
    const p = t * (stops.length - 1),
      i = Math.floor(p),
      f = p - i,
      a = stops[i],
      b = stops[i + 1];
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
  }
  function waves(r, n, amp) {
    const w = [];
    for (let i = 0; i < n; i++) w.push([amp * (r() * 0.6 + 0.4) / (i + 1), (i + 1) * (1.5 + r() * 2), r() * 6.28]);
    return u => w.reduce((s, [a, f, p]) => s + a * Math.sin(u * f + p), 0);
  }
  function pixels(ctx, W, H, fn) {
    const img = ctx.createImageData(W, H),
      d = img.data;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const c = fn(x / W, y / H),
        i = (y * W + x) * 4;
      d[i] = c[0];
      d[i + 1] = c[1];
      d[i + 2] = c[2];
      d[i + 3] = c[3] == null ? 255 : c[3];
    }
    ctx.putImageData(img, 0, 0);
  }
  function seismic(ctx, W, H, r, opt) {
    const st = waves(r, 4, 0.05),
      fq = waves(r, 3, 4),
      fx = 0.58 + r() * 0.1,
      nz = () => r() * 0.16 - 0.08;
    pixels(ctx, W, H, (u, v) => {
      const bump = 0.13 * Math.exp(-(((u - 0.42) / 0.2) ** 2));
      let t = v + st(u) * 0.8 + bump * (0.4 + v * 0.6);
      if (opt.fault && u > fx + 0.22 * (v - 0.2)) t += 0.045;
      const f = 22 + fq(t * 3);
      let a = Math.sin(t * f * 6.28) * (0.55 + 0.45 * Math.sin(t * 41 + u * 2.1)) * (0.7 + 0.3 * Math.sin(t * 9));
      a += nz();
      const c = ramp(SEIS, (a + 1) / 2);
      return c;
    });
  }
  function strata(ctx, W, H, r, opt) {
    const st = waves(r, 3, 0.025),
      fx = 0.66;
    const L = [[0, '#CFE5F1'], [0.1, '#E8DFCB'], [0.22, '#D5CDBE'], [0.33, '#E3D3AE'], [0.45, '#9DAFC2'], [0.53, 'RES'], [0.63, '#7E8C9C'], [0.76, '#4A5160'], [0.9, '#363A44']];
    const cols = L.map(l => l[1] === 'RES' ? null : hex(l[1])),
      oil = hex('#F29A1F'),
      oil2 = hex('#D6402B'),
      wat = hex('#7FA6C9');
    pixels(ctx, W, H, (u, v) => {
      const bump = 0.16 * Math.exp(-(((u - 0.4) / 0.22) ** 2));
      let t = v;
      if (v > 0.1) t = v + (bump + st(u)) * Math.min(1, (v - 0.1) * 4);
      if (opt.fault && u > fx + 0.18 * (v - 0.3) && v > 0.12) t -= 0.05;
      let k = 0;
      for (let i = 0; i < L.length; i++) if (t >= L[i][0]) k = i;
      if (v < 0.1) return cols[0];
      let c;
      if (L[k][1] === 'RES') {
        const crest = v;
        c = crest < 0.47 ? ramp([oil2, oil], (crest - 0.32) / 0.15) : wat;
      } else c = cols[k];
      const lam = 0.94 + 0.06 * Math.sin(t * 620 + Math.sin(u * 9) * 2);
      return [c[0] * lam, c[1] * lam, c[2] * lam];
    });
  }
  function field(r, n) {
    const b = [];
    for (let i = 0; i < n; i++) b.push([r() * 0.8 + 0.1, r() * 0.8 + 0.1, 0.08 + r() * 0.18, r() * 1.4 - 0.4]);
    return (u, v) => b.reduce((s, [x, y, w, a]) => s + a * Math.exp(-((u - x) ** 2 + (v - y) ** 2) / (w * w)), 0);
  }
  function reservoir(ctx, W, H, r, opt) {
    const fn = field(r, 9),
      edge = waves(r, 5, 0.06);
    let mn = 1e9,
      mx = -1e9;
    for (let i = 0; i < 400; i++) {
      const q = fn(i % 20 / 20, Math.floor(i / 20) / 20);
      mn = Math.min(mn, q);
      mx = Math.max(mx, q);
    }
    const asp = W / H;
    pixels(ctx, W, H, (u, v) => {
      const dx = (u - 0.5) * asp,
        dy = v - 0.5,
        ang = Math.atan2(dy, dx),
        rad = Math.hypot(dx / (asp * 0.46), dy / 0.42);
      const lim = 1 + edge(ang);
      if (opt.mask !== false && rad > lim) return [0, 0, 0, 0];
      let q = (fn(u, v) - mn) / (mx - mn);
      const c = ramp(RAMP, q);
      const con = Math.abs(q * 12 % 1 - 0.5) < 0.035 ? 0.72 : 1;
      const gx = u * W % 14 < 1 || v * H % 14 < 1 ? 0.93 : 1;
      return [c[0] * con * gx, c[1] * con * gx, c[2] * con * gx];
    });
  }
  function structure(ctx, W, H, r) {
    const fn = field(r, 7);
    let mn = 1e9,
      mx = -1e9;
    for (let i = 0; i < 400; i++) {
      const q = fn(i % 20 / 20, Math.floor(i / 20) / 20);
      mn = Math.min(mn, q);
      mx = Math.max(mx, q);
    }
    const S = ['#0B1F6B', '#1F4FD1', '#16A3D8', '#9AD7EA', '#EEF4F8'].map(hex);
    pixels(ctx, W, H, (u, v) => {
      const q = (fn(u, v) - mn) / (mx - mn);
      const c = ramp(S, q);
      const con = Math.abs(q * 16 % 1 - 0.5) < 0.04 ? 0.8 : 1;
      return [c[0] * con, c[1] * con, c[2] * con];
    });
  }
  function wellLog(ctx, w, h, r) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, w, h);
    const sand = waves(r, 6, 1),
      N = Math.floor(h / 2);
    const tr = [[0, 0.12], [0.12, 0.34], [0.34, 0.56], [0.56, 0.78], [0.78, 1]].map(([a, b]) => [a * w, b * w]);
    ctx.strokeStyle = '#DCE3EC';
    ctx.lineWidth = 1;
    tr.forEach(([a]) => {
      ctx.beginPath();
      ctx.moveTo(a + 0.5, 0);
      ctx.lineTo(a + 0.5, h);
      ctx.stroke();
    });
    for (let y = 0; y < h; y += h / 12) {
      ctx.beginPath();
      ctx.moveTo(tr[1][0], y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    const z = [],
      gr = [],
      rs = [],
      rh = [],
      nph = [],
      hc = [];
    for (let i = 0; i <= N; i++) {
      const d = i / N,
        s = sand(d * 8) + 0.25 * Math.sin(d * 90 + r() * 0.3) + (r() - 0.5) * 0.35;
      const isS = s > 0.15,
        isHC = isS && d > 0.38 && d < 0.62;
      z.push(d * h);
      gr.push(isS ? 0.18 + r() * 0.1 : 0.7 + r() * 0.18);
      rs.push(isHC ? 0.75 + r() * 0.15 : isS ? 0.3 + r() * 0.08 : 0.2 + r() * 0.08);
      rh.push(isS ? 0.4 + r() * 0.06 : 0.62 + r() * 0.06);
      nph.push(isS ? (isHC ? 0.25 : 0.38) + r() * 0.05 : 0.7 + r() * 0.06);
      hc.push(isHC);
    }
    const X = (t, v) => t[0] + 8 + v * (t[1] - t[0] - 16);
    ctx.fillStyle = 'rgba(242,154,31,0.22)';
    ctx.beginPath();
    ctx.moveTo(tr[1][0], 0);
    z.forEach((y, i) => ctx.lineTo(X(tr[1], gr[i]), y));
    ctx.lineTo(tr[1][0], h);
    ctx.fill();
    const line = (t, arr, col, dash) => {
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.4;
      ctx.setLineDash(dash || []);
      ctx.beginPath();
      z.forEach((y, i) => i ? ctx.lineTo(X(t, arr[i]), y) : ctx.moveTo(X(t, arr[i]), y));
      ctx.stroke();
      ctx.setLineDash([]);
    };
    line(tr[1], gr, '#C77A10');
    line(tr[2], rs, '#0A5CDB');
    ctx.fillStyle = 'rgba(214,64,43,0.16)';
    z.forEach((y, i) => {
      if (hc[i]) {
        ctx.fillRect(X(tr[3], rh[i]), y, X(tr[3], nph[i]) - X(tr[3], rh[i]), h / N + 0.5);
      }
    });
    line(tr[3], rh, '#D6402B');
    line(tr[3], nph, '#12A4D9', [4, 3]);
    z.forEach((y, i) => {
      ctx.fillStyle = hc[i] ? '#F29A1F' : gr[i] < 0.4 ? '#E3D3AE' : '#9DAFC2';
      ctx.fillRect(tr[4][0] + 8, y, tr[4][1] - tr[4][0] - 16, h / N + 0.5);
    });
    ctx.fillStyle = '#8A98A8';
    ctx.font = '10px Inter, sans-serif';
    for (let k = 1; k < 12; k++) ctx.fillText(String(2400 + k * 25), 6, k * h / 12 + 3);
  }
  function decline(ctx, w, h, r) {
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.clearRect(0, 0, w, h);
    const p = {
        l: 44,
        r: 16,
        t: 16,
        b: 28
      },
      W = w - p.l - p.r,
      H = h - p.t - p.b;
    ctx.strokeStyle = '#DCE3EC';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = p.t + H * i / 4;
      ctx.beginPath();
      ctx.moveTo(p.l, y);
      ctx.lineTo(w - p.r, y);
      ctx.stroke();
    }
    const N = 120,
      s = (fn, col, width, dash) => {
        ctx.strokeStyle = col;
        ctx.lineWidth = width;
        ctx.setLineDash(dash || []);
        ctx.beginPath();
        for (let i = 0; i <= N; i++) {
          const x = i / N,
            y = fn(x);
          const X = p.l + x * W,
            Y = p.t + H * (1 - y);
          i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      };
    const noise = () => (r() - 0.5) * 0.025;
    s(x => Math.min(0.92, x * 12) * 0.92 / (1 + 3.2 * x) ** 0.9 + noise(), '#0A5CDB', 2);
    s(x => Math.max(0, (x - 0.2) * 1.05) ** 0.8 * 0.85, '#12A4D9', 1.6);
    s(x => 0.88 - 0.42 * x - 0.08 * Math.sin(x * 3), '#0B1A2C', 1.2, [5, 4]);
    ctx.fillStyle = '#8A98A8';
    ctx.font = '10px Inter, sans-serif';
    ['0', '5', '10', '15', '20 yr'].forEach((t, i) => ctx.fillText(t, p.l + W * i / 4 - (i ? 8 : 0), h - 8));
  }
  const R = {
    seismic,
    strata,
    reservoir,
    structure,
    log: wellLog,
    decline
  };
  function TechViz({
    kind = 'seismic',
    seed = 7,
    fault = true,
    mask = true,
    resolution = 0.5,
    label,
    style
  }) {
    const wrap = React.useRef(null),
      cv = React.useRef(null);
    React.useEffect(() => {
      const el = wrap.current;
      if (!el) return;
      let raf;
      const draw = () => {
        const w = el.clientWidth,
          h = el.clientHeight;
        if (!w || !h) return;
        const c = cv.current,
          dpr = Math.min(2, window.devicePixelRatio || 1);
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
        const ctx = c.getContext('2d');
        const r = rng(seed);
        if (kind === 'log' || kind === 'decline') {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          R[kind](ctx, w, h, r);
          return;
        }
        const W = Math.max(80, Math.round(w * resolution)),
          H = Math.max(60, Math.round(h * resolution));
        const off = document.createElement('canvas');
        off.width = W;
        off.height = H;
        R[kind](off.getContext('2d'), W, H, r, {
          fault,
          mask
        });
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(off, 0, 0, c.width, c.height);
      };
      const ro = new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      });
      ro.observe(el);
      draw();
      return () => {
        ro.disconnect();
        cancelAnimationFrame(raf);
      };
    }, [kind, seed, fault, mask, resolution]);
    return /*#__PURE__*/React.createElement("div", {
      ref: wrap,
      role: "img",
      "aria-label": label || kind + ' visualization',
      style: {
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 80,
        ...style
      }
    }, /*#__PURE__*/React.createElement("canvas", {
      ref: cv,
      style: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block'
      }
    }));
  }

  // explorer/StageNav

  function StageNav({
    stages = [],
    current = 0,
    onSelect,
    cta = 'Explore the Journey',
    onCta,
    position = 'fixed',
    windowSize = 5,
    style
  }) {
    const box = React.useRef(null);
    const [ws, setWs] = React.useState(windowSize);
    React.useEffect(() => {
      const el = box.current;
      if (!el) return;
      const ro = new ResizeObserver(() => {
        const w = el.clientWidth;
        setWs(Math.max(1, Math.min(windowSize, Math.floor(w / 150))));
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, [windowSize]);
    const cur = stages[current] || {};
    const n = stages.length;
    let start = Math.max(0, Math.min(current - (ws > 2 ? 1 : 0), n - ws));
    const vis = stages.slice(start, start + ws);
    return /*#__PURE__*/React.createElement("nav", {
      "aria-label": "Development stages",
      style: {
        position,
        left: 0,
        right: 0,
        bottom: position === 'fixed' ? 16 : undefined,
        zIndex: 30,
        padding: '0 var(--gutter-page)',
        pointerEvents: 'none',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        pointerEvents: 'auto',
        maxWidth: 1360,
        margin: '0 auto',
        height: 'var(--stage-nav-h)',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        border: '1px solid var(--ex-line)',
        borderRadius: 20,
        boxShadow: 'var(--shadow-float)',
        display: 'flex',
        alignItems: 'center',
        gap: 28,
        padding: '0 24px',
        fontFamily: 'var(--font-editorial)',
        color: 'var(--ex-navy)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        flex: 'none',
        minWidth: 220
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: 'var(--ex-blue)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: '#fff'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: 'var(--ex-faint)',
        letterSpacing: '0.02em'
      }
    }, "Current Stage"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: 'var(--ex-blue)',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontVariantNumeric: 'tabular-nums'
      }
    }, cur.num), cur.label, /*#__PURE__*/React.createElement("i", {
      className: "icon-arrow-right",
      style: {
        fontSize: 14
      }
    })))), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 1,
        height: 36,
        background: 'var(--ex-line)',
        flex: 'none'
      }
    }), /*#__PURE__*/React.createElement("div", {
      ref: box,
      style: {
        flex: 1,
        minWidth: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(' + vis.length + ',minmax(0,1fr))',
        gap: 16,
        overflow: 'hidden'
      }
    }, vis.map(s => {
      const i = stages.indexOf(s),
        on = i === current,
        past = i < current;
      return /*#__PURE__*/React.createElement("button", {
        key: s.id,
        onClick: () => onSelect && onSelect(i),
        style: {
          all: 'unset',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          paddingTop: 10,
          borderTop: '2px solid ' + (on ? 'var(--ex-blue)' : past ? 'rgba(10,92,219,0.35)' : 'var(--ex-line)'),
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          fontVariantNumeric: 'tabular-nums',
          color: on ? 'var(--ex-blue)' : 'var(--ex-faint)'
        }
      }, s.num), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          fontWeight: on ? 600 : 400,
          color: on ? 'var(--ex-blue)' : 'var(--ex-navy)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }, s.label));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6,
        alignItems: 'center'
      },
      "aria-hidden": "true"
    }, stages.map((s, i) => /*#__PURE__*/React.createElement("span", {
      key: s.id,
      style: {
        width: i === current ? 18 : 6,
        height: 6,
        borderRadius: 3,
        background: i <= current ? 'var(--ex-blue)' : 'var(--ex-line-strong)',
        opacity: i < current ? 0.45 : 1
      }
    }))), /*#__PURE__*/React.createElement("a", {
      onClick: onCta,
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--ex-navy)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        textDecoration: 'none'
      }
    }, cta, /*#__PURE__*/React.createElement("i", {
      className: "icon-arrow-right",
      style: {
        fontSize: 14
      }
    })))));
  }

  // explorer/SiteHeader

  function SiteHeader({
    links = [],
    active,
    onNavigate,
    tone = 'light',
    position = 'absolute',
    style
  }) {
    const dark = tone === 'dark',
      ink = dark ? '#fff' : 'var(--ex-navy)';
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        height: 72,
        padding: '0 var(--gutter-page)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        fontFamily: 'var(--font-editorial)',
        color: ink,
        ...style
      }
    }, /*#__PURE__*/React.createElement("a", {
      onClick: () => onNavigate && onNavigate('home'),
      style: {
        cursor: 'pointer',
        display: 'flex',
        gap: 6,
        alignItems: 'baseline',
        fontSize: 14,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: ink,
        textDecoration: 'none',
        whiteSpace: 'nowrap'
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        fontWeight: 700
      }
    }, "Oil & Gas"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 300
      }
    }, "Development")), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: 'flex',
        gap: 32,
        alignItems: 'center'
      }
    }, links.map(l => /*#__PURE__*/React.createElement("a", {
      key: l.id,
      onClick: () => onNavigate && onNavigate(l.id),
      style: {
        fontSize: 13,
        cursor: 'pointer',
        color: active === l.id ? dark ? '#4DA3FF' : 'var(--ex-blue)' : ink,
        fontWeight: active === l.id ? 600 : 400,
        textDecoration: 'none',
        whiteSpace: 'nowrap'
      }
    }, l.label))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        fontSize: 12
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "icon-search",
      style: {
        fontSize: 16
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        letterSpacing: '0.06em',
        whiteSpace: 'nowrap'
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        fontWeight: 600
      }
    }, "KR"), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        opacity: 0.5
      }
    }, "/ EN"))));
  }

  // explorer/ArrowCTA

  function ArrowCTA({
    children = 'Explore the Journey',
    onClick,
    href,
    tone = 'navy',
    direction = 'right',
    style
  }) {
    const [p, setP] = React.useState(false);
    const bg = tone === 'blue' ? 'var(--ex-blue)' : tone === 'white' ? '#fff' : 'var(--ex-navy)';
    const fg = tone === 'white' ? 'var(--ex-navy)' : '#fff';
    const lbl = tone === 'white' ? '#fff' : 'var(--ex-navy)';
    const Tag = href ? 'a' : 'button';
    return /*#__PURE__*/React.createElement(Tag, {
      href: href,
      onClick: onClick,
      onMouseDown: () => setP(true),
      onMouseUp: () => setP(false),
      onMouseLeave: () => setP(false),
      style: {
        all: 'unset',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 16,
        fontFamily: 'var(--font-editorial)',
        fontSize: 14,
        fontWeight: 600,
        color: lbl,
        transform: p ? 'scale(0.97)' : 'none',
        transition: 'transform 200ms',
        ...style
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: bg,
        color: fg,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: 'icon-arrow-' + direction,
      style: {
        fontSize: 18
      }
    })), children);
  }

  // explorer/DepthRuler

  function DepthRuler({
    marks = ['0 m', '1,000', '2,000', '3,000 m'],
    tone = 'light',
    label = 'Depth',
    style
  }) {
    const c = tone === 'dark' ? 'rgba(255,255,255,0.85)' : 'var(--ex-navy)';
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        gap: 10,
        fontFamily: 'var(--font-editorial)',
        color: c,
        ...style
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        writingMode: 'vertical-rl'
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        flex: 1,
        width: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        width: 1,
        background: c,
        opacity: 0.5
      }
    }), marks.map(m => /*#__PURE__*/React.createElement("span", {
      key: m,
      style: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 1,
        background: c
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 14,
        fontSize: 10,
        whiteSpace: 'nowrap',
        fontVariantNumeric: 'tabular-nums'
      }
    }, m)))), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: '50%',
        border: '1px solid ' + c
      }
    }));
  }
  window.OilGasDevelopmentDesignSystem_dcb6ae = Object.assign(window.OilGasDevelopmentDesignSystem_dcb6ae || {}, {
    Button,
    IconButton,
    TextLink,
    GlobalNav,
    SubNav,
    MediaFrame,
    ProductTile,
    QuoteCard,
    StickyBar,
    UtilityCard,
    OptionChip,
    SearchInput,
    Footer,
    TechViz,
    StageNav,
    SiteHeader,
    ArrowCTA,
    DepthRuler
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/explorer/ds-standalone.js", error: String((e && e.message) || e) }); }

// ui_kits/explorer/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever a design needs an image.
 * You control the slot's shape; it sizes to its container by default. When the search_stock_photos tool
 * is available, prefill the slot by default — write the photo's URL into
 * src (with credit/credit-href); the user can still fill or replace it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The sidecar is a SIBLING of the HTML file that uses this component: the
 * read is a document-relative fetch, and the host resolves the bridge's
 * sidecar writes into the previewed file's directory to match (same
 * contract as design_canvas.jsx). Pages in the same directory share one
 * sidecar; keep slot ids distinct across them.
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          Initial framing baseline: cover | contain.   (default 'cover')
 *                cover starts the image filling the frame (overflow cropped);
 *                contain starts it fully visible (letterboxed). Either way the
 *                user can always pan/scale from there — double-click, or the
 *                Edit control, enters reframe mode (drag to move, scroll or
 *                corner-handles to scale; Escape / click-out commits). The
 *                crop persists alongside the image in the sidecar.
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. Prefill it with a real
 *                photo via search_stock_photos when that tool is available
 *                (set credit/credit-href from the result). A user drop
 *                overrides it; clearing the drop reveals src again.
 *   credit       Attribution text shown as a small overlay at the
 *                bottom-left of the filled slot. REQUIRED whenever src
 *                points at any Unsplash host (images.unsplash.com,
 *                plus.unsplash.com, …): an Unsplash src with no credit
 *                renders an error tile INSTEAD of the photo (Unsplash
 *                terms forbid showing their photos unattributed). Use the
 *                exact form 'Photo by {photographer name} on Unsplash' —
 *                the overlay then links the name to credit-href and
 *                'Unsplash' to the Unsplash homepage, and links back to
 *                unsplash.com automatically get the required utm referral
 *                params appended at render time. The credit belongs to
 *                the src image, so it only shows while src is what's
 *                displayed — a user-dropped image hides it.
 *   credit-href  Link for the photographer's name in the credit overlay
 *                (their Unsplash profile URL from the stock-photo search
 *                results). http(s) URLs only — anything else renders the
 *                name as plain text.
 *
 * Sizing: the slot fills its container by default (width/height 100%).
 * Put it in a sized wrapper — absolutely positioned, a grid cell, a fixed
 * frame — and it takes exactly that box. When the parent's height is
 * indefinite (ordinary flow), it falls back to full width at a 3:2 aspect
 * ratio instead of collapsing. In a shrink-to-fit parent (a float,
 * width:max-content, an unsized absolute wrapper), percentages have
 * nothing to resolve against — size the slot or its wrapper explicitly
 * there. For a fixed-size slot, set
 * width/height on the element itself (inline style), which overrides the
 * default. When
 * layering content above a slot (full-bleed layouts), make the overlay
 * click-through — pointer-events: none on scrims/text plates, re-enabled
 * on interactive children — so the slot's hover controls stay reachable.
 * Keep the slot's bottom-left corner visually clear as well: the credit
 * overlay renders there, and a dark fade or text plate covering it hides
 * the attribution Unsplash's terms require — end the fade above that
 * corner, or keep it nearly transparent where the credit sits.
 *
 * Usage:
 *   <div style="position:relative;width:100%;height:100%">      <!-- full-bleed: -->
 *     <image-slot id="bg" shape="rect"></image-slot>            <!-- fills the wrapper -->
 *   </div>
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';

  // Unsplash terms require visible attribution wherever their photos
  // display, and every link back to unsplash.com must carry utm referral
  // params. Two render-time rules enforce that here:
  //  - an Unsplash-src slot with NO credit attribute renders an error
  //    tile INSTEAD of the photo (an uncredited Unsplash photo on screen
  //    is itself the terms violation, so it never renders bare);
  //  - rendered credit links pointing at unsplash.com get the referral
  //    params appended when absent (credit-href values live in page
  //    content that can't be edited after the fact).
  // Keep the utm_source value in sync with UTM_SOURCE in
  // platform/web-agent/unsplash.ts — this file is a project-local
  // artifact and cannot import it (equality is pinned by tests).
  const UNSPLASH_HOMEPAGE_HREF = 'https://unsplash.com/?utm_source=claude_design&utm_medium=referral';
  // Host rule mirrors the hotlink validator that admits Unsplash srcs into
  // pages in the first place (cdn$ in unsplash.ts: apex or any subdomain)
  // — Unsplash+ results serve from plus.unsplash.com, not just images.*,
  // and an admitted-but-uncredited photo must error whatever unsplash
  // host it rides on.
  // Trailing-dot FQDNs (images.unsplash.com.) are the same host to the
  // browser but would miss the regex — strip one dot so the check fails
  // CLOSED (unrecognized-but-real Unsplash srcs must error, not render).
  const isUnsplashHost = u => {
    try {
      return /(^|\.)unsplash\.com$/.test(new URL(u, document.baseURI).hostname.replace(/\.$/, ''));
    } catch {
      return false;
    }
  };
  // Render-time referral normalization for links back to Unsplash:
  // appends utm_source/utm_medium when absent, preserves every existing
  // query param, never overwrites an existing utm_source, and passes
  // non-Unsplash URLs through untouched. Input is an ABSOLUTE validated
  // http(s) URL (the credit render funnel resolves + validates first).
  const withReferral = href => {
    try {
      const u = new URL(href);
      if (!/(^|\.)unsplash\.com$/.test(u.hostname.replace(/\.$/, ''))) {
        return href;
      }
      if (!u.searchParams.has('utm_source')) {
        u.searchParams.set('utm_source', 'claude_design');
      }
      if (!u.searchParams.has('utm_medium')) {
        u.searchParams.set('utm_medium', 'referral');
      }
      return u.toString();
    } catch (e) {
      return href;
    }
  };
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  // Unload-time flush: save()'s serialization defers a mid-RTT re-fire to a
  // .then that never runs in an unloading document, silently dropping a
  // pagehide commit. Post the current slots immediately instead — content
  // is a superset snapshot of any in-flight save's, the write is a
  // whole-file last-writer-wins replace, and postMessage FIFO delivers it
  // to the host after the in-flight one, so a backend-side reorder at
  // worst reproduces the dropped-commit outcome this flush improves on.
  // Guarded on the initial sidecar read: pre-hydration slots can miss
  // other slots' persisted entries, and flushing it would clobber them —
  // that narrow case stays best-effort (the in-memory merge in load()
  // cannot happen in an unloading document anyway).
  function flushNow() {
    if (!loaded) return;
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    try {
      Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {});
    } catch (e) {}
  }
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet =
  // Fill the container by default: slots are usually placed inside a
  // sized wrapper (a hero frame, a grid cell, an inset:0 layer) and are
  // expected to take that box — a fixed intrinsic size would render as
  // a small tile in the corner of a full-bleed wrapper instead.
  // aspect-ratio is the companion fallback that keeps a bare slot
  // visible when the parent's height is indefinite: height:100%
  // resolves to auto there, and the ratio then derives height from
  // width instead of letting the slot collapse to zero height.
  // Explicit width/height on the element override all of this.
  // color:inherit (not a fixed near-black): the placeholder chrome —
  // empty-state icon/caption (currentColor) and the dashed ring — must
  // read on dark decks too, and the slide's own text color is the one
  // color guaranteed to contrast with the slide background. The soft
  // look comes from opacity on those parts, not from a baked-in alpha.
  ':host{display:block;position:relative;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;' + '  width:100%;height:100%;aspect-ratio:3/2}' + '.empty .cap,.empty .sub{opacity:.75}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(127,127,127,.08)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  // popover=manual promotes the spill to the top layer on reframe, so it is
  // not clipped by any overflow:hidden / clip-path / scroll-container
  // ancestor (a plain z-index can't escape overflow clipping). UA popover
  // defaults (inset:0;margin:auto) are reset; _applyView sets viewport px.
  '.spill{position:fixed;margin:0;inset:auto;border:0;padding:0;background:transparent;' + '  overflow:visible;transform:translate(-50%,-50%);z-index:1;cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px}' + '.empty:hover .sub{opacity:1}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed currentColor;' + '  opacity:.35;transition:border-color .12s,opacity .12s}' + ':host([data-over]) .ring{border-color:#c96442;opacity:1}' + ':host([data-filled]) .ring{display:none}' +
  // Controls overlay INSIDE the frame, pinned to the top-right corner, so
  // a full-bleed slot in an overflow:hidden container still shows them
  // (the old below-mask placement got clipped). Credit sits bottom-left,
  // so top-right avoids collision. The blurred pill background keeps them
  // legible over the image.
  // The UA [popover] base rule styles the element in EVERY state (only
  // display:none is gated on :not(:popover-open), and the display:flex
  // below overrides that) — so the UA resets live HERE, like .spill's,
  // or the ordinary hover-state strip renders as a bordered Canvas box
  // centered by margin:auto. inset:auto precedes top/right (shorthand).
  '.ctl{position:absolute;inset:auto;top:8px;right:8px;margin:0;border:0;padding:0;' + '  background:transparent;overflow:visible;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' +
  // While reframing, the spill owns the top layer and would swallow every
  // click on the in-frame controls. Promoting .ctl into the top layer
  // ABOVE the spill (shown after it — later popovers stack higher) keeps
  // Edit-as-toggle and Replace clickable mid-reframe. _applyView pins it
  // to the frame's top-right in viewport px (translateX(-100%)
  // right-aligns against the computed left edge); inset:auto clears the
  // base rule's top/right so the inline left/top position it alone.
  '.ctl:popover-open{position:fixed;inset:auto;transform:translateX(-100%)}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}' +
  // Replacement in flight: after a src swap the browser keeps painting
  // the PREVIOUS image until the new one decodes, so a Replace would
  // flash the old photo and then pop. Hide the stale frame (visibility,
  // not display — _applyView geometry still applies) and spin until the
  // new image reports in (load/error clears data-swapping).
  ':host([data-swapping]) .frame img{visibility:hidden}' + '.loading{position:absolute;inset:0;display:none;align-items:center;' + '  justify-content:center;pointer-events:none}' + ':host([data-swapping]) .loading{display:flex}' + '.loading::after{content:"";width:22px;height:22px;border-radius:50%;' + '  border:2px solid rgba(127,127,127,.25);border-top-color:currentColor;' + '  animation:om-slot-spin .7s linear infinite}' + '@keyframes om-slot-spin{to{transform:rotate(360deg)}}' +
  // Reduced motion: the static two-tone ring still reads as "working".
  '@media (prefers-reduced-motion:reduce){.loading::after{animation:none}}' + '.credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);display:none;' + '  padding:3px 7px;border-radius:5px;background:rgba(0,0,0,.55);color:#fff;' + '  font:10px/1.2 system-ui,-apple-system,sans-serif;text-decoration:none;' + '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;backdrop-filter:blur(6px)}' +
  // The credit is a SPAN holding one or two <a>s (Unsplash's prescribed
  // form links the photographer AND Unsplash) — anchors style inline so
  // the overlay reads as one line of text.
  '.credit a{color:inherit;text-decoration:none}' + '.credit a:hover,.credit a:focus-visible{text-decoration:underline}' + ':host([data-filled][data-credit]) .credit{display:block}' +
  // Exports must ship JUST the image — no hover controls, no credit chip
  // (the host marks <html data-om-exporting> for the capture window; the
  // page-level hide script can't reach shadow DOM, this rule can).
  ':host-context([data-om-exporting]) .ctl,' + ':host-context([data-om-exporting]) .credit{display:none !important}' +
  // Print must ship just the image too: the hover-gated controls can be
  // mid-hover when print() fires, and the credit chip is screen chrome —
  // the same rule the capture window gets, keyed on print media instead
  // of the host's data-om-exporting mark (the print path sets no mark).
  '@media print{.ctl,.credit{display:none !important}}' +
  // No export-window mask rules here on purpose: the export capture
  // releases the replacement mask by REMOVING data-swapping (the
  // shadow-root pass in pages/export/shared.ts HIDE_EXPORT_CHROME_SCRIPT)
  // — attribute removal works in every engine (:host-context is
  // Chromium-only), is scoped by construction to slots actually
  // mid-swap, and hides the spinner through the same gate. A masked img
  // would otherwise be silently dropped from PPTX decks (the capture
  // walk skips visibility:hidden imgs).
  // Attribution error tile: REPLACES the photo when an Unsplash src has
  // no credit attribute — rendering the photo uncredited is the terms
  // violation, so the photo must not appear at all.
  // Calm and neutral on purpose (review feedback): the tile informs the
  // user; the fix instructions are machine-facing (usage docblock, tool
  // description, and the turn-end scan's bounce copy name the attributes
  // for the agent).
  '.attr-error{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  background:#f2f1ef;color:#6e6c66;user-select:none;' + '  font:13px/1.45 system-ui,-apple-system,sans-serif}' + '.attr-error svg{opacity:.55}' + '.attr-error .cap{max-width:92%;font-weight:500;letter-spacing:.01em}' + ':host([data-attribution-error]) .attr-error{display:flex}' + ':host([data-attribution-error]) .ring{display:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  const warnIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>' + '<path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'placeholder', 'src', 'id', 'credit', 'credit-href'];
    }

    /** Duplicate-slide hook (called by deck-stage, see its
     *  _remintDuplicateIds): copy this id's stored image, if any, under a
     *  freshly minted key and return that key — so a duplicated slide's
     *  slot keeps its dropped photo instead of reverting to the
     *  placeholder. 'isFree' is the caller's uniqueness check (document
     *  ids); candidates must ALSO be unused in the sidecar, which can
     *  hold keys from other pages sharing the project root. (An EMPTY
     *  slot on another page leaves no sidecar entry, so its id is not
     *  detectable here — a minted key can collide with it and that slot
     *  would show this photo. Same blast radius as two pages reusing an
     *  id by hand, which the shared sidecar already permits.) Returns null
     *  when no id could be minted (caller strips the id, today's
     *  behavior). */
    static cloneSlot(fromId, isFree) {
      if (typeof fromId !== 'string' || !fromId) return null;
      // Pre-hydration the store can't veto candidates or source the copy
      // — degrade to the strip (today's behavior) rather than mint
      // against keys we can't see yet. Any rendered (= droppable) slot
      // means load() has already settled.
      if (!loaded) return null;
      const stem = fromId.replace(/-\d+$/, '') || fromId;
      for (let n = 2; n < 100; n++) {
        const toId = stem + '-' + n;
        if (toId === fromId) continue;
        if (slots[toId] !== undefined) {
          // Reuse a key holding this exact value (bytes AND crop) if no
          // live element here owns it — a duplicate op the host refused
          // after minting leaves such a key behind, and reusing keeps
          // refused retries from accumulating one orphaned copy per
          // attempt. Full equality (not just bytes) so a byte-identical
          // key another PAGE owns with its own crop is stepped past, not
          // adopted or rewritten. (Entries without .u never match.)
          const prev = getSlot(toId);
          const cur = getSlot(fromId);
          if (!(prev && cur && prev.u && prev.u === cur.u && prev.s === cur.s && prev.x === cur.x && prev.y === cur.y && (typeof isFree !== 'function' || isFree(toId)))) continue;
          return toId;
        }
        if (typeof isFree === 'function' && !isFree(toId)) continue;
        const v = getSlot(fromId);
        if (v) setSlot(toId, Object.assign({}, v));
        return toId;
      }
      return null;
    }
    constructor() {
      super();
      // clonable: rail thumbnails deep-clone slides and carry this shadow
      // along; reuse an already-cloned root so upgrade-after-clone works.
      // (Deliberately NOT serializable — a getHTML consumer would embed
      // multi-MB sidecar data-URLs into serialized page HTML.)
      const root = this.shadowRoot || this.attachShadow({
        mode: 'open',
        clonable: true
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="attr-error" part="attribution-error">' + warnIcon + '    <div class="cap">This photo needs attribution</div></div>' + '  <div class="loading" part="loading"></div>' + '  <div class="ring" part="ring"></div>' + '</div>' +
      // Outside .frame, like .spill/.ctl — the frame's overflow:hidden +
      // border-radius/clip-path would cut the credit off on circle/pill/mask.
      // A SPAN, not an <a>: the prescribed Unsplash credit holds two links
      // (photographer + Unsplash), built per-render in _render().
      '<span class="credit" part="credit"></span>' + '<div class="spill" popover="manual" data-dc-edit-transparent>' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' +
      // data-dc-edit-transparent: the DC editor's edit-mode picker lets
      // clicks through for chrome marked with it (EDIT_TRANSPARENT_SEL)
      // — without it, Replace/Edit clicks in Edit mode are swallowed by
      // element selection and the controls look dead.
      '<div class="ctl" popover="manual" data-dc-edit-transparent><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="edit" title="Reframe image">Edit</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ctl = root.querySelector('.ctl');
      this._credit = root.querySelector('.credit');
      this._attrError = root.querySelector('.attr-error');
      // Credit clicks open the link, not browse/reframe.
      this._credit.addEventListener('click', e => e.stopPropagation());
      this._credit.addEventListener('dblclick', e => e.stopPropagation());
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      // Encode-in-flight marker (the owning _ingest generation): while set,
      // the same-src "nothing in flight" clear in _render must not fire —
      // the stored value still points at the OLD image until the encode
      // lands, so that clear would unmask the stale image mid-replace.
      this._swapGen = 0;
      // Render-owned swap in flight: set when _render assigns a new src,
      // cleared only by the img's own load/error (or the empty branch).
      // img.complete CANNOT stand in for this — setting src only QUEUES
      // the current-request swap (a microtask), so synchronously after an
      // assignment, complete still reports the OLD settled request. The
      // pick path does exactly that: the host sets src, credit, and
      // credit-href back-to-back in one task, and renders #2/#3 would
      // read the stale complete === true and drop the mask one render
      // after it was set.
      this._loadPending = false;
      // See _render's empty branch: a transient attribution-error wipe of a
      // showing image must make the follow-up render a replacement (spinner),
      // not a first fill (blank frame).
      this._hidShowing = false;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        // The hidden controls are opacity-0 but still tabbable — without
        // this gate a keyboard user could drive them on a read-only share
        // link (mirrors the dblclick handler's editable gate).
        if (!this.hasAttribute('data-editable')) return;
        if (act === 'replace') {
          this._exitReframe(true);
          // Host-owned picker (Unsplash modal; it also offers local import).
          this.dispatchEvent(new CustomEvent('image-slot:pick', {
            bubbles: true,
            composed: true,
            detail: {
              id: this.id || null
            }
          }));
        }
        if (act === 'edit') {
          if (!this._reframes()) return;
          if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      // load/error also release the replacement-in-flight mask (via the
      // single discipline in _releaseMask): the swap is only revealed once
      // the new image can actually paint (on error the frame shows its
      // background, same as a fresh slot with a broken src).
      this._img.addEventListener('load', () => {
        this._loadPending = false;
        this._releaseMask(true);
        this._applyView();
      });
      this._img.addEventListener('error', () => {
        this._loadPending = false;
        this._releaseMask(true);
      });
      // Gated only on editable — any filled slot can be repositioned/scaled,
      // regardless of fit. Share links (no writeFile) stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
          const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // The host may inject window.omelette.writeFile AFTER the first render;
      // re-render on hover so the editable-gated controls reliably appear.
      this.addEventListener('pointerenter', this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('pointerenter', this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      // commit=false: a disconnect is not a user intent — committing here
      // would persist whatever half-finished drag a React remount or DOM
      // splice happened to interrupt. Deliberate exits commit on their own
      // paths (Escape/click-out/toggle), and unloads commit via pagehide.
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._signalReframe(true);
      // Best-effort commit when the document unloads mid-reframe (a host
      // navigation racing the enter signal, a manual reload, tab close):
      // the sidecar write rides the host bridge, which outlives this
      // document, so the crop survives even though the mode dies with the
      // DOM. Held on the instance so _exitReframe detaches exactly what
      // was attached.
      this._pagehide = () => {
        this._exitReframe(true);
        flushNow();
      };
      window.addEventListener('pagehide', this._pagehide);
      // Promote spill to the top layer, then keep it pinned over the frame:
      // scroll/resize cover the common cases, and a per-frame rect check
      // catches layout shifts that fire neither (an image above finishing
      // load, streamed DOM pushing the slot down, an ancestor transform
      // change) so the overlay can't detach from the frame.
      try {
        this._spill.showPopover();
      } catch {}
      // After the spill, so the controls stack above it in the top layer.
      try {
        this._ctl.showPopover();
      } catch {}
      this._reposition = () => {
        if (this.hasAttribute('data-reframe')) this._applyView();
      };
      window.addEventListener('scroll', this._reposition, true);
      window.addEventListener('resize', this._reposition);
      this._lastRect = '';
      this._watch = () => {
        if (!this.hasAttribute('data-reframe')) return;
        const r = this.getBoundingClientRect();
        const key = r.left + ',' + r.top + ',' + r.width + ',' + r.height;
        if (key !== this._lastRect) {
          this._lastRect = key;
          this._applyView();
        }
        this._watchId = requestAnimationFrame(this._watch);
      };
      this._watchId = requestAnimationFrame(this._watch);
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (this._reposition) {
        window.removeEventListener('scroll', this._reposition, true);
        window.removeEventListener('resize', this._reposition);
        this._reposition = null;
      }
      if (this._watchId) {
        cancelAnimationFrame(this._watchId);
        this._watchId = 0;
      }
      if (this._pagehide) {
        window.removeEventListener('pagehide', this._pagehide);
        this._pagehide = null;
      }
      try {
        this._spill.hidePopover();
      } catch {}
      try {
        this._ctl.hidePopover();
      } catch {}
      this._ctl.style.left = '';
      this._ctl.style.top = '';
      if (commit) this._commitView();
      this._signalReframe(false);
    }

    // Reframe state lives only in this DOM until commit, invisible to the
    // host's dirty signals — announce enter/exit so the host can hold
    // auto-reloads for exactly the gesture (the guest bundle forwards
    // image-slot:reframe to the host as imageSlotReframe). Dispatched on
    // the element (composed, so it escapes shadow roots) while connected;
    // a disconnected exit (disconnectedCallback) falls back to document so
    // the host still hears it.
    _signalReframe(active) {
      const target = this.isConnected ? this : document;
      target.dispatchEvent(new CustomEvent('image-slot:reframe', {
        bubbles: true,
        composed: true,
        detail: {
          active: active,
          id: this.id || null
        }
      }));
    }

    // Public: host's "Import from computer" calls this to run local browse.
    openFilePicker() {
      this._exitReframe(true);
      this._input.click();
    }

    // A src write is a newer intent for this slot's content — the host
    // pick path (setImageSlotImage) or an agent edit — so it must win
    // over any encode still in flight from an earlier drop: left live,
    // that encode lands later, passes _ingest's gen guard, and its
    // setSlot silently overwrites the pick (the stored value shadows
    // src in _render). Bumping _gen kills the encode before its own
    // _swapGen clear runs, so clear the dead claim here too — otherwise
    // _releaseMask (gated on !_swapGen) never fires and the pick's
    // spinner is stranded. src ONLY: the pick sets credit/credit-href
    // in the same task, and clearing _swapGen on those would let the
    // same-src branch unmask the old image mid-encode.
    attributeChangedCallback(name, oldVal, newVal) {
      if (name === 'src' && oldVal !== newVal) {
        this._gen++;
        this._swapGen = 0;
      }
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      // Replacing a shown image: surface the swap through the encode too,
      // not just the decode — otherwise the old photo sits there with no
      // feedback while the canvas re-encode runs. An empty slot keeps its
      // placeholder (no spinner) until the encode lands, as before.
      // _swapGen guards the mask against re-renders DURING the encode
      // (pointerenter, ResizeObserver, another slot's store write): the
      // stored value still resolves to the old image there, so _render's
      // same-src clear would otherwise unmask it mid-replace.
      if (this.hasAttribute('data-filled')) {
        this.setAttribute('data-swapping', '');
        this._swapGen = gen;
      }
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        // Clear BEFORE setSlot: its synchronous re-render must see no
        // pending encode, so a byte-identical re-upload (same data URL, no
        // load event coming) still clears the mask via the complete branch.
        this._swapGen = 0;
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._swapGen = 0;
        // Reveal the kept old image — unless another replacement (a
        // remote pick's src swap) is still in flight, in which case the
        // mask stays until THAT image settles (its load/error releases).
        this._releaseMask();
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is available on any filled slot — the user can
    // always reposition/scale. `fit` only sets the initial baseline (see
    // _geom): contain starts fully-visible, cover starts frame-filling.
    _reframes() {
      return this.hasAttribute('data-filled');
    }

    // The single release discipline for the replacement-in-flight mask
    // (data-swapping). The mask comes off only when BOTH hold:
    //  - no encode is pending (_swapGen) — mid-encode the stored value
    //    still resolves to the old image, so any reveal paints it;
    //  - the frame img has settled on its current src — an unsettled src
    //    means some replacement is still in flight (e.g. a remote pick),
    //    whoever started it, and revealing would paint the previous
    //    frame. The load/error listeners pass settled=true (the event IS
    //    the settlement signal, per spec complete is true by then);
    //    other callers rely on the complete flag (covers loaded AND
    //    failed).
    // Every release path funnels through here EXCEPT _render's empty
    // branch (the img is being cleared — nothing will ever settle).
    _releaseMask(settled) {
      if (!this._swapGen && !this._loadPending && (settled || this._img.complete)) {
        this.removeAttribute('data-swapping');
      }
    }

    // Baseline geometry, shared by clamp/apply/resize. `base` is the scale at
    // view-scale s=1: cover = fill the frame (overflow on the looser axis),
    // contain = fit fully inside (letterboxed). Zooming a contain image past
    // s where it overflows naturally becomes a crop. Null until the img has
    // loaded (naturalWidth is 0 before that) or when the slot has no layout
    // box — ResizeObserver fires with a 0×0 rect under display:none, and
    // clamping against a degenerate 1×1 frame would silently pull the stored
    // pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
      const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
      return {
        iw,
        ih,
        fw,
        fh,
        base
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      // Top-layer controls: pin to the frame's top-right in viewport px
      // (the same 8px inset as the in-frame layout; unscaled — top-layer UI
      // reads as chrome, not page content). BEFORE the geometry branch:
      // placement needs only the frame rect, and a not-yet-loaded or broken
      // src must not leave the promoted strip floating unpositioned. Gated
      // on the popover actually being open: without the Popover API,
      // showPopover() threw (swallowed in _enterReframe), .ctl stays in
      // its in-frame absolute layout, and viewport-px coordinates would
      // shove it off-frame — and matches(':popover-open') itself throws
      // there (unknown pseudo-class), hence the try/catch.
      if (this.hasAttribute('data-reframe')) {
        let onTop = false;
        try {
          onTop = this._ctl.matches(':popover-open');
        } catch {}
        if (onTop) {
          const r = this.getBoundingClientRect();
          this._ctl.style.left = r.right - 8 + 'px';
          this._ctl.style.top = r.top + 8 + 'px';
        }
      }
      if (!g) {
        // Dimensions not known yet (before img load) — centered fit so there
        // is no flash of an unpositioned image before the geometry lands.
        const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = contain ? 'contain' : 'cover';
        return;
      }
      // Baseline (cover-fill or contain-fit) × view scale. Width/height and
      // left/top are all frame-% — depends only on the frame aspect ratio, so
      // a responsive resize keeps the same crop. The spill layer mirrors the
      // same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      if (this.hasAttribute('data-reframe')) {
        // Top-layer spill: position in viewport px over the frame. The top
        // layer escapes ancestor transforms entirely, so EVERY term must be
        // in viewport units: getBoundingClientRect gives the frame's scaled
        // origin AND size, and the rect/layout ratio rescales the ghost —
        // sizing from layout px alone renders it 1/scale too large under a
        // scaled deck slide. Inner ghost + handles stay box-relative.
        const r = this.getBoundingClientRect();
        const sx = g.fw ? r.width / g.fw : 1;
        const sy = g.fh ? r.height / g.fh : 1;
        this._spill.style.width = g.iw * k * sx + 'px';
        this._spill.style.height = g.ih * k * sy + 'px';
        this._spill.style.left = r.left + (50 + this._view.x) / 100 * r.width + 'px';
        this._spill.style.top = r.top + (50 + this._view.y) / 100 * r.height + 'px';
      }
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      // An Unsplash src with no credit attribute must NOT render — showing
      // the photo uncredited is the Unsplash-terms violation itself. The
      // error tile replaces the photo until the credit is written. A
      // user-dropped image is the user's own content and always renders.
      // Trimmed: credit is agent/user-editable content, and a whitespace-
      // only value must count as missing — otherwise it would suppress the
      // error tile AND render an empty credit box (no text, no links),
      // exactly the unattributed state this gate exists to prevent.
      const credit = (this.getAttribute('credit') || '').trim();
      const attrError = !!(!credit && !this._userUrl && srcAttr && isUnsplashHost(srcAttr));
      this.toggleAttribute('data-attribution-error', attrError);
      if (url && !attrError) {
        const prev = this._img.getAttribute('src');
        if (prev !== url) {
          // Replacing an already-shown image: mark the swap BEFORE setting
          // src so the stale frame is never revealed (see the data-swapping
          // stylesheet rules). First fill (prev empty) keeps the existing
          // placeholder-until-load behavior — no spinner. _hidShowing
          // covers the pick path's transient attribution-error wipe: prev
          // is gone, but an image WAS showing, so this is a replacement.
          if (prev || this._hidShowing) this.setAttribute('data-swapping', '');
          // Mark the swap BEFORE assigning src: complete keeps reporting
          // the old settled request until the browser's
          // update-the-image-data microtask runs, so same-task re-renders
          // (the pick path's credit/credit-href setAttributes) need this
          // flag, not complete, to know a load is in flight.
          this._loadPending = true;
          this._img.src = url;
          this._ghost.src = url;
        } else {
          // Same-src re-render — release if settled, so an ingest-set
          // spinner can't stick after a byte-identical re-upload (same
          // data URL, no further load event ever fires).
          this._releaseMask();
        }
        this._hidShowing = false;
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this.removeAttribute('data-swapping');
        // The src is being removed — no load/error will ever fire for it.
        this._loadPending = false;
        // A transient attribution-error wipe of a showing image happens on
        // the pick path: the host sets src one setAttribute before credit,
        // so render N hides the old image (attrError) and render N+1
        // restores a URL. Remember the wipe so that restore renders as a
        // replacement (spinner), not a first fill (blank frame).
        this._hidShowing = attrError && !!this._img.getAttribute('src');
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        // The error tile owns the blocked-photo state; .empty stays for
        // the genuinely-empty slot.
        this._empty.style.display = attrError ? 'none' : 'flex';
        this.removeAttribute('data-filled');
      }

      // Credit belongs to the author src, so a user drop hides it.
      // textContent + the http(s)-only funnel keep external strings inert.
      const showCredit = !!(url && credit && !this._userUrl && !attrError);
      this._credit.textContent = '';
      if (showCredit) {
        // Validate once (resolved against the document, http(s) only),
        // then append the terms-required utm referral params to links
        // that point back at unsplash.com.
        let href = '';
        const rawHref = this.getAttribute('credit-href') || '';
        if (rawHref) {
          try {
            const u = new URL(rawHref, document.baseURI);
            if (u.protocol === 'http:' || u.protocol === 'https:') {
              href = withReferral(u.href);
            }
          } catch {}
        }
        const mkLink = (text, linkHref) => {
          const a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          a.setAttribute('href', linkHref);
          a.textContent = text;
          return a;
        };
        // Unsplash's prescribed credit is TWO links — the photographer's
        // name to their profile (credit-href) and 'Unsplash' to the
        // homepage. Render that split whenever the text has the canonical
        // shape; other text keeps the legacy single-link rendering.
        const m = /^Photo by (.+) on Unsplash$/.exec(credit);
        if (m) {
          this._credit.appendChild(document.createTextNode('Photo by '));
          this._credit.appendChild(href ? mkLink(m[1], href) : document.createTextNode(m[1]));
          this._credit.appendChild(document.createTextNode(' on '));
          this._credit.appendChild(mkLink('Unsplash', UNSPLASH_HOMEPAGE_HREF));
        } else if (href) {
          this._credit.appendChild(mkLink(credit, href));
        } else {
          this._credit.textContent = credit;
        }
      }
      this.toggleAttribute('data-credit', showCredit);
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/explorer/image-slot.js", error: String((e && e.message) || e) }); }

// ui_kits/explorer/stages.js
try { (() => {
window.OGD_STAGES = [{
  id: 'surface',
  num: '01',
  label: 'Surface',
  sub: 'Remote sensing · Gravity · Magnetics',
  depth: '0 m',
  bg: '#F6F8FB',
  dark: false,
  title: "The journey begins at the Earth's surface.",
  kr: '위성 영상, 지표 지질조사, 중력·자력 탐사로 수천 km²의 분지에서 탐사할 가치가 있는 지역을 좁혀 갑니다.',
  t: {
    in: '히어로 사진이 확대되어 full-bleed 장면이 됩니다. 수평선(sea level seam)은 같은 높이에 고정.',
    hold: '사진 위 관측 지점 라벨이 순서대로 나타납니다.',
    out: '카메라가 해수면 아래로 하강. 사진은 위로 밀려나고 지층 단면이 아래에서 올라옵니다.',
    persist: 'Sea level seam · Depth ruler 0 m'
  }
}, {
  id: 'petroleum',
  num: '02',
  label: 'Petroleum System',
  sub: 'Source · Migration · Trap',
  depth: '0 – 4,000 m',
  bg: '#F6F8FB',
  dark: false,
  title: 'From source rock to trapped hydrocarbons.',
  kr: '근원암에서 생성된 탄화수소는 이동하여 저류암에 모이고, 덮개암과 트랩에 의해 보존됩니다. 요소와 타이밍이 모두 맞아야 석유 시스템이 성립합니다.',
  t: {
    in: '지층 단면이 아래에서 차오릅니다(wipe up). 배경은 그대로.',
    hold: '근원암 → 이동 → 저류암 → 덮개암 → 트랩 순으로 라벨과 레이어가 하이라이트.',
    out: '단면이 뒤로 기울며 위에서 내려다보는 평면(구조도)으로 회전합니다.',
    persist: 'Strata layer colors · Depth ruler'
  }
}, {
  id: 'subsurface',
  num: '03',
  label: 'Subsurface',
  sub: 'Geology · Structure · Characterization',
  depth: '2,450 m',
  bg: '#EEF2F7',
  dark: false,
  title: 'Reading the structure beneath.',
  kr: '지층의 형태, 단층과 습곡을 해석해 탄화수소가 모일 수 있는 닫힌 구조를 찾습니다. 결과는 깊이 구조도로 정리됩니다.',
  t: {
    in: '단면 → 평면 회전이 끝나며 등고선이 그려집니다.',
    hold: '스크롤에 따라 등고선 깊이 값이 바뀝니다(depth slicing).',
    out: '구조 정점(crest)에 시추 위치 핀이 꽂히고, 수직선이 아래로 내려갑니다.',
    persist: 'Well location pin'
  }
}, {
  id: 'well',
  num: '04',
  label: 'Well & Logging',
  sub: 'Drilling · Petrophysics',
  depth: '2,400 – 2,700 m',
  bg: '#E6ECF3',
  dark: false,
  title: 'Data reveals the story below.',
  kr: '시추공에서 측정한 감마선·비저항·밀도·중성자 검층이 암상과 유체를 구분합니다. 지하를 직접 확인하는 1차원의 창입니다.',
  t: {
    in: '시추 궤적(수직선)이 넓어지며 검층 트랙으로 펼쳐집니다.',
    hold: '트랙이 깊이 방향으로 스크롤되고 탄화수소 구간이 하이라이트.',
    out: '검층 트랙이 옆으로 복제되어 수많은 트레이스가 되며 탄성파 단면으로 이어집니다.',
    persist: 'Wellbore line'
  }
}, {
  id: 'seismic',
  num: '05',
  label: 'Seismic',
  sub: 'Acquisition · Processing · Interpretation',
  depth: '0 – 4.0 s TWT',
  bg: '#0B1A2C',
  dark: true,
  title: 'Imaging the invisible.',
  kr: '지표에서 발생시킨 탄성파가 지층 경계에서 반사되어 돌아옵니다. 수백만 개의 트레이스를 처리해 지하를 3차원 영상으로 재구성합니다.',
  t: {
    in: '트레이스가 펼쳐지고 배경이 navy로 어두워집니다 — 여정의 가장 깊은 지점.',
    hold: '단면이 수평으로 패닝되고 해석 horizon 라인이 그려집니다.',
    out: '해석된 horizon이 저류층 상부면이 되어 3D 속성 모델로 돌출(extrude)됩니다.',
    persist: 'Interpreted horizon line'
  }
}, {
  id: 'reservoir',
  num: '06',
  label: 'Reservoir',
  sub: 'Modeling · Properties',
  depth: '2,450 m',
  bg: '#13263D',
  dark: true,
  title: 'From structure to property.',
  kr: '검층과 탄성파 자료를 결합해 공극률·투과도·포화도의 3차원 분포를 모델링합니다. 정적 모델은 모든 개발 계획의 기준이 됩니다.',
  t: {
    in: 'horizon surface가 돌출되어 속성 맵이 됩니다.',
    hold: '공극률 → 투과도 → 포화도로 속성이 전환됩니다(같은 형태, 다른 색).',
    out: '맵 위로 유선(streamline)이 흐르고 배경이 다시 밝아지기 시작 — 상승.',
    persist: 'Field outline'
  }
}, {
  id: 'engineering',
  num: '07',
  label: 'Reservoir Engineering',
  sub: 'Simulation · Recovery',
  depth: 'Reservoir',
  bg: '#F6F8FB',
  dark: false,
  title: 'Optimizing flow and recovery.',
  kr: '동적 시뮬레이션으로 압력과 유체의 흐름을 예측하고, 주입·생산 전략을 비교해 회수율을 높입니다.',
  t: {
    in: '배경이 밝아지고 곡선이 시간 축을 따라 그려집니다.',
    hold: '시나리오(자연 생산 / 워터플러딩) 비교 토글.',
    out: '생산 곡선의 끝점이 생산 설비 사진으로 연결됩니다.',
    persist: 'Oil rate curve (blue)'
  }
}, {
  id: 'production',
  num: '08',
  label: 'Production',
  sub: 'Wells · Facilities · Operations',
  depth: '0 m',
  bg: '#FFFFFF',
  dark: false,
  title: 'Turning resources into energy.',
  kr: '생산정과 인공채유, 해상 생산설비를 통해 저류층 유체를 지표로 끌어올리고 분리·처리하여 출하합니다.',
  t: {
    in: '사진이 아래에서 올라오며 수면 위로 복귀. Depth ruler가 0 m로.',
    hold: '운영 지표가 순서대로 나타납니다.',
    out: '설비 사진이 축소되어 필드 전체 레이아웃 안의 한 지점이 됩니다.',
    persist: 'Sea level seam'
  }
}, {
  id: 'field',
  num: '09',
  label: 'Field Development',
  sub: 'Plan · Infrastructure · Production',
  depth: '0 m',
  bg: '#F6F8FB',
  dark: false,
  title: 'Connecting technology, people and the future.',
  kr: '지질·공학·시설·경제성을 하나의 개발 계획으로 통합합니다. 수십 년의 운영과 감축 목표까지 함께 설계합니다.',
  t: {
    in: '와이드 줌아웃으로 필드 전체가 보입니다.',
    hold: '—',
    out: '푸터로 이어지고 StageNav가 9/9 완료 상태가 됩니다.',
    persist: 'StageNav'
  }
}];
window.OGD_LINKS = [{
  id: 'journey',
  label: 'Journey'
}, {
  id: 'technology',
  label: 'Technology'
}, {
  id: 'resources',
  label: 'Resources'
}, {
  id: 'storyboard',
  label: 'Storyboard'
}, {
  id: 'system',
  label: 'Design System'
}];
window.OGD_GO = function (id) {
  const m = {
    home: 'index.html',
    journey: 'index.html',
    technology: 'Technical.html',
    storyboard: 'Storyboard.html',
    system: 'DesignSystem.html'
  };
  if (m[id]) location.href = m[id];
};

/* Technology information architecture — 5 categories, each an open-ended topic collection (not the Journey stages) */
window.OGD_TECH = [{
  id: 'petroleum',
  num: '01',
  label: 'Petroleum System',
  kr: '탄화수소의 생성·이동·집적과 보존을 다루는 지질학적 기초.',
  topics: [{
    id: 'pt-generation',
    num: '1.1',
    title: 'How Hydrocarbons Are Generated, Migrated and Trapped',
    read: '12 min',
    href: 'Technical.html'
  }, {
    id: 'pt-source',
    num: '1.2',
    title: 'Source Rock Evaluation',
    read: '9 min'
  }, {
    id: 'pt-migration',
    num: '1.3',
    title: 'Migration Pathways',
    read: '8 min'
  }, {
    id: 'pt-trap',
    num: '1.4',
    title: 'Trap & Seal Analysis',
    read: '10 min'
  }, {
    id: 'pt-basin',
    num: '1.5',
    title: 'Basin Modeling',
    read: '14 min'
  }, {
    id: 'pt-play',
    num: '1.6',
    title: 'Play & Prospect Assessment',
    read: '11 min'
  }]
}, {
  id: 'subsurface',
  num: '02',
  label: 'Subsurface',
  kr: '지질 구조 해석, 탄성파 탐사, 시추공 검층으로 지하를 이미징합니다.',
  topics: [{
    id: 'ss-structure',
    num: '2.1',
    title: 'Structural Interpretation',
    read: '10 min'
  }, {
    id: 'ss-acq',
    num: '2.2',
    title: 'Seismic Acquisition',
    read: '9 min'
  }, {
    id: 'ss-proc',
    num: '2.3',
    title: 'Seismic Processing & Imaging',
    read: '13 min'
  }, {
    id: 'ss-logs',
    num: '2.4',
    title: 'Well Logging & Petrophysics',
    read: '12 min'
  }, {
    id: 'ss-depth',
    num: '2.5',
    title: 'Depth Conversion',
    read: '7 min'
  }]
}, {
  id: 'reservoir',
  num: '03',
  label: 'Reservoir',
  kr: '저류층의 암석·유체 특성과 3차원 정적 모델.',
  topics: [{
    id: 'rs-char',
    num: '3.1',
    title: 'Reservoir Characterization',
    read: '11 min'
  }, {
    id: 'rs-static',
    num: '3.2',
    title: 'Static Modeling',
    read: '12 min'
  }, {
    id: 'rs-rock',
    num: '3.3',
    title: 'Rock Properties',
    read: '8 min'
  }, {
    id: 'rs-pvt',
    num: '3.4',
    title: 'Fluid Properties (PVT)',
    read: '9 min'
  }]
}, {
  id: 'engineering',
  num: '04',
  label: 'Reservoir Engineering',
  kr: '유동 예측, 시뮬레이션, 회수 증진 전략.',
  topics: [{
    id: 're-mb',
    num: '4.1',
    title: 'Material Balance',
    read: '9 min'
  }, {
    id: 're-dca',
    num: '4.2',
    title: 'Decline Curve Analysis',
    read: '8 min'
  }, {
    id: 're-sim',
    num: '4.3',
    title: 'Reservoir Simulation',
    read: '14 min'
  }, {
    id: 're-wt',
    num: '4.4',
    title: 'Well Testing',
    read: '10 min'
  }, {
    id: 're-eor',
    num: '4.5',
    title: 'Waterflooding & EOR',
    read: '12 min'
  }]
}, {
  id: 'field',
  num: '05',
  label: 'Field Development',
  kr: '개발 컨셉, 시추 계획, 생산 설비와 경제성의 통합.',
  topics: [{
    id: 'fd-concept',
    num: '5.1',
    title: 'Development Concept Selection',
    read: '11 min'
  }, {
    id: 'fd-wells',
    num: '5.2',
    title: 'Well Planning',
    read: '9 min'
  }, {
    id: 'fd-fac',
    num: '5.3',
    title: 'Surface Facilities',
    read: '10 min'
  }, {
    id: 'fd-ops',
    num: '5.4',
    title: 'Production Operations',
    read: '9 min'
  }, {
    id: 'fd-econ',
    num: '5.5',
    title: 'Economics & Decommissioning',
    read: '12 min'
  }]
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/explorer/stages.js", error: String((e && e.message) || e) }); }

// ui_kits/website/App.jsx
try { (() => {
const {
  Button,
  TextLink,
  IconButton,
  ProductTile,
  MediaFrame,
  QuoteCard,
  StickyBar,
  UtilityCard,
  OptionChip,
  SearchInput,
  GlobalNav,
  SubNav,
  Footer
} = window.OilGasDevelopmentDesignSystem_dcb6ae;
const NAV = [{
  id: 'operations',
  label: 'Operations'
}, {
  id: 'sustainability',
  label: 'Sustainability'
}, {
  id: 'investors',
  label: 'Investors'
}, {
  id: 'careers',
  label: 'Careers'
}, {
  id: 'news',
  label: 'News'
}];
const SUB = {
  home: null,
  operations: {
    title: 'Operations',
    links: [{
      id: 'o',
      label: 'Overview'
    }, {
      id: 'a',
      label: 'Assets'
    }, {
      id: 'd',
      label: 'Production data'
    }],
    active: 'a',
    cta: 'Investor deck'
  },
  sustainability: {
    title: 'Sustainability',
    links: [{
      id: 'e',
      label: 'Emissions'
    }, {
      id: 'w',
      label: 'Water'
    }, {
      id: 'c',
      label: 'Communities'
    }],
    active: 'e',
    cta: 'Report'
  }
};
function App() {
  const [page, setPage] = React.useState(() => localStorage.getItem('ogd-page') || 'home');
  const go = p => {
    const t = ['home', 'operations', 'sustainability'].includes(p) ? p : 'home';
    setPage(t);
    localStorage.setItem('ogd-page', t);
    window.scrollTo(0, 0);
  };
  const sub = SUB[page];
  const Screen = {
    home: HomeScreen,
    operations: OperationsScreen,
    sustainability: SustainabilityScreen
  }[page];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(GlobalNav, {
    links: NAV,
    active: page,
    onNavigate: go
  }), sub && /*#__PURE__*/React.createElement(SubNav, sub), /*#__PURE__*/React.createElement("div", {
    "data-screen-label": page
  }, /*#__PURE__*/React.createElement(Screen, {
    go: go
  })), /*#__PURE__*/React.createElement(Footer, {
    note: "This website contains forward-looking statements, including production and emissions targets, which involve risks and uncertainties. Actual results may differ materially.",
    columns: [{
      title: 'Operations',
      links: ['Assets', 'Midstream', 'Production data', 'Safety']
    }, {
      title: 'Sustainability',
      links: ['Emissions', 'Water', 'Communities', 'Reports']
    }, {
      title: 'Investors',
      links: ['Quarterly results', 'Events', 'Stock information', 'SEC filings']
    }, {
      title: 'Company',
      links: ['Leadership', 'Careers', 'News', 'Contact']
    }],
    legal: "Copyright \xA9 2026 Oil & Gas Development. All rights reserved."
  }));
}
{
  const __el = document.getElementById('root');
  if (__el && __el.dataset.app === 'website' && !__el.__mounted && window.OilGasDevelopmentDesignSystem_dcb6ae && window.OilGasDevelopmentDesignSystem_dcb6ae.TechViz !== undefined && (__el.__mounted = true)) ReactDOM.createRoot(__el).render(/*#__PURE__*/React.createElement(App, null));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
const {
  Button,
  TextLink,
  IconButton,
  ProductTile,
  MediaFrame,
  QuoteCard,
  StickyBar,
  UtilityCard,
  OptionChip,
  SearchInput,
  GlobalNav,
  SubNav,
  Footer
} = window.OilGasDevelopmentDesignSystem_dcb6ae;
function HomeScreen({
  go
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(ProductTile, {
    tone: "light",
    hero: true,
    title: "Energy, developed.",
    tagline: "Onshore and offshore assets built for the long term.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      onClick: () => go('operations')
    }, "Our operations"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => go('investors')
    }, "Investor relations"))
  }, /*#__PURE__*/React.createElement(MediaFrame, {
    label: "Hero photography \u2014 drilling pad at first light (21:9)",
    ratio: "21/9"
  })), /*#__PURE__*/React.createElement(ProductTile, {
    tone: "dark",
    eyebrow: "Permian",
    title: "Delaware Basin",
    tagline: "Long laterals. Lower intensity.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      onClick: () => go('operations')
    }, "Learn more"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onDark: true
    }, "View data"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 880,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(MediaFrame, {
    label: "Aerial of multi-well pad (16:9)",
    ratio: "16/9",
    tone: "dark"
  }))), /*#__PURE__*/React.createElement(ProductTile, {
    tone: "parchment",
    title: "Q3 2026 results",
    tagline: "Production, capital, and returns.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, null, "Read the release"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary"
    }, "Webcast"))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,480px),1fr))',
      gap: 12,
      padding: 12,
      background: 'var(--color-canvas)'
    }
  }, /*#__PURE__*/React.createElement(ProductTile, {
    tone: "dark-2",
    title: "Offshore Gulf",
    tagline: "Deepwater, delivered.",
    actions: /*#__PURE__*/React.createElement(Button, null, "Learn more"),
    style: {
      paddingTop: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement(MediaFrame, {
    label: "Platform photo",
    ratio: "4/3",
    tone: "dark"
  }))), /*#__PURE__*/React.createElement(ProductTile, {
    tone: "parchment",
    title: "Methane intensity",
    tagline: "Down 48% since 2019.",
    actions: /*#__PURE__*/React.createElement(Button, {
      onClick: () => go('sustainability')
    }, "See progress"),
    style: {
      paddingTop: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 24px'
    }
  }, /*#__PURE__*/React.createElement(MediaFrame, {
    label: "Monitoring equipment render",
    ratio: "4/3"
  })))));
}
window.HomeScreen = HomeScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Operations.jsx
try { (() => {
const {
  Button,
  TextLink,
  IconButton,
  ProductTile,
  MediaFrame,
  QuoteCard,
  StickyBar,
  UtilityCard,
  OptionChip,
  SearchInput,
  GlobalNav,
  SubNav,
  Footer
} = window.OilGasDevelopmentDesignSystem_dcb6ae;
const ASSETS = [{
  id: 'del',
  region: 'Permian',
  title: 'Delaware Basin',
  meta: '142 kboe/d net',
  kind: 'Oil'
}, {
  id: 'mid',
  region: 'Permian',
  title: 'Midland Basin',
  meta: '96 kboe/d net',
  kind: 'Oil'
}, {
  id: 'eag',
  region: 'Gulf Coast',
  title: 'Eagle Ford',
  meta: '58 kboe/d net',
  kind: 'Oil'
}, {
  id: 'hay',
  region: 'Gulf Coast',
  title: 'Haynesville',
  meta: '1.1 Bcf/d gross',
  kind: 'Natural gas'
}, {
  id: 'mar',
  region: 'Appalachia',
  title: 'Marcellus',
  meta: '0.9 Bcf/d gross',
  kind: 'Natural gas'
}, {
  id: 'gom',
  region: 'Offshore',
  title: 'Gulf of Mexico',
  meta: '64 kboe/d net',
  kind: 'Oil'
}, {
  id: 'ngl',
  region: 'Midstream',
  title: 'Gathering & processing',
  meta: '2,400 miles of pipe',
  kind: 'NGLs'
}, {
  id: 'bak',
  region: 'Rockies',
  title: 'Williston Basin',
  meta: '41 kboe/d net',
  kind: 'Oil'
}];
function OperationsScreen() {
  const [q, setQ] = React.useState('');
  const [kind, setKind] = React.useState('All');
  const [picked, setPicked] = React.useState([]);
  const list = ASSETS.filter(a => (kind === 'All' || a.kind === kind) && (a.title + a.region).toLowerCase().includes(q.toLowerCase()));
  const toggle = id => setPicked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  return /*#__PURE__*/React.createElement("main", {
    style: {
      background: 'var(--color-canvas-parchment)',
      paddingBottom: picked.length ? 96 : 0
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      maxWidth: 1440,
      margin: '0 auto',
      padding: '64px 22px 80px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontSize: 56,
      fontWeight: 600,
      lineHeight: 1.07,
      letterSpacing: '-0.28px',
      color: 'var(--color-ink)'
    }
  }, "Assets."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 32px',
      fontSize: 28,
      lineHeight: 1.14,
      letterSpacing: '0.196px',
      color: 'var(--color-ink-muted-48)'
    }
  }, "Every operated basin, in one place."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(SearchInput, {
    value: q,
    onChange: setQ,
    placeholder: "Search basins and regions",
    style: {
      flex: '1 1 280px',
      maxWidth: 420
    }
  }), ['All', 'Oil', 'Natural gas', 'NGLs'].map(k => /*#__PURE__*/React.createElement(OptionChip, {
    key: k,
    label: k,
    selected: kind === k,
    onClick: () => setKind(k)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))',
      gap: 20
    }
  }, list.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.id,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(UtilityCard, {
    eyebrow: a.region,
    title: a.title,
    meta: a.meta,
    link: picked.includes(a.id) ? 'Added to data request' : 'Add to data request',
    imageLabel: a.title + ' map',
    ratio: "4/3",
    onClick: () => toggle(a.id),
    style: picked.includes(a.id) ? {
      border: '2px solid var(--color-primary-focus)',
      padding: 23
    } : {}
  }))), !list.length && /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--color-ink-muted-48)'
    }
  }, "No assets match \u201C", q, "\u201D."))), picked.length > 0 && /*#__PURE__*/React.createElement(StickyBar, {
    label: picked.length + ' selected',
    value: ASSETS.filter(a => picked.includes(a.id)).map(a => a.title).join(' · '),
    cta: "Request data room access",
    onCta: () => setPicked([])
  }));
}
window.OperationsScreen = OperationsScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Operations.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sustainability.jsx
try { (() => {
const {
  Button,
  TextLink,
  IconButton,
  ProductTile,
  MediaFrame,
  QuoteCard,
  StickyBar,
  UtilityCard,
  OptionChip,
  SearchInput,
  GlobalNav,
  SubNav,
  Footer
} = window.OilGasDevelopmentDesignSystem_dcb6ae;
function SustainabilityScreen() {
  const stat = (v, l) => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 56,
      fontWeight: 600,
      lineHeight: 1.07,
      letterSpacing: '-0.28px'
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      letterSpacing: '-0.374px',
      marginTop: 8,
      color: 'var(--color-body-muted)'
    }
  }, l));
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(QuoteCard, {
    label: "Landscape photography \u2014 prairie at dawn over operated acreage",
    kicker: "Target 2030",
    title: "Zero routine flaring.",
    body: "Across every operated asset, verified by continuous monitoring.",
    action: /*#__PURE__*/React.createElement(Button, null, "Read the plan"),
    style: {
      minHeight: 640
    }
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--color-canvas)',
      padding: '80px 22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 24,
      fontWeight: 300,
      lineHeight: 1.5,
      color: 'var(--color-ink)',
      margin: 0,
      maxWidth: 760
    }
  }, "We measure emissions at the source, publish the results each quarter, and tie executive pay to the outcome. This page reports where we stand."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(TextLink, {
    chevron: true
  }, "Download the 2026 sustainability report")))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--color-surface-tile-1)',
      color: 'var(--color-on-dark)',
      padding: '80px 22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
      gap: 48
    }
  }, stat('48%', 'Lower methane intensity vs. 2019'), stat('0.09%', 'Methane emissions intensity'), stat('71%', 'Produced water recycled')), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 980,
      margin: '48px auto 0'
    }
  }, /*#__PURE__*/React.createElement(TextLink, {
    onDark: true,
    chevron: true
  }, "Methodology and assurance"))), /*#__PURE__*/React.createElement(ProductTile, {
    tone: "parchment",
    title: "Water",
    tagline: "Recycled before it is sourced.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, null, "Learn more"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary"
    }, "Data tables"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 880,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(MediaFrame, {
    label: "Water recycling facility (16:9)",
    ratio: "16/9"
  }))));
}
window.SustainabilityScreen = SustainabilityScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sustainability.jsx", error: String((e && e.message) || e) }); }

// versions/v1/ui_kits/explorer/ds-standalone.js
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
(function () {
  // buttons/Button

  function usePress() {
    const [p, setP] = React.useState(false);
    return [p, {
      onMouseDown: () => setP(true),
      onMouseUp: () => setP(false),
      onMouseLeave: () => setP(false),
      onTouchStart: () => setP(true),
      onTouchEnd: () => setP(false)
    }];
  }
  const base = {
    fontFamily: 'var(--font-text)',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    whiteSpace: 'nowrap',
    transition: 'transform var(--dur-fast) var(--ease-standard)',
    textDecoration: 'none'
  };
  const variants = {
    primary: {
      background: 'var(--color-primary)',
      color: 'var(--color-on-primary)',
      borderRadius: 'var(--radius-pill)',
      padding: '11px 22px',
      fontSize: 17,
      fontWeight: 400,
      lineHeight: 1.18,
      letterSpacing: '-0.374px'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--color-primary)',
      border: '1px solid var(--color-primary)',
      borderRadius: 'var(--radius-pill)',
      padding: '10px 21px',
      fontSize: 17,
      fontWeight: 400,
      lineHeight: 1.18,
      letterSpacing: '-0.374px'
    },
    'dark-utility': {
      background: 'var(--color-ink)',
      color: 'var(--color-on-dark)',
      borderRadius: 'var(--radius-sm)',
      padding: '8px 15px',
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.29,
      letterSpacing: '-0.224px'
    },
    pearl: {
      background: 'var(--color-surface-pearl)',
      color: 'var(--color-ink-muted-80)',
      border: '3px solid var(--color-divider-soft)',
      borderRadius: 'var(--radius-md)',
      padding: '8px 14px',
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.29,
      letterSpacing: '-0.224px'
    },
    'store-hero': {
      background: 'var(--color-primary)',
      color: 'var(--color-on-primary)',
      borderRadius: 'var(--radius-pill)',
      padding: '14px 28px',
      fontSize: 18,
      fontWeight: 300,
      lineHeight: 1
    }
  };
  function Button({
    variant = 'primary',
    onDark = false,
    disabled = false,
    href,
    children,
    style,
    onClick,
    type = 'button',
    ...rest
  }) {
    const [pressed, h] = usePress();
    const [focus, setFocus] = React.useState(false);
    const v = {
      ...variants[variant]
    };
    if (variant === 'secondary' && onDark) {
      v.color = 'var(--color-primary-on-dark)';
      v.borderColor = 'var(--color-primary-on-dark)';
    }
    const s = {
      ...base,
      ...v,
      transform: pressed && !disabled ? 'var(--press-scale)' : 'none',
      outline: focus ? '2px solid var(--color-primary-focus)' : 'none',
      outlineOffset: 2,
      ...(disabled ? {
        opacity: 1,
        cursor: 'default',
        color: 'var(--color-ink-muted-48)',
        background: variant === 'secondary' ? 'transparent' : 'var(--color-divider-soft)',
        borderColor: 'var(--color-hairline)'
      } : {}),
      ...style
    };
    const props = {
      ...h,
      onFocus: () => setFocus(true),
      onBlur: () => setFocus(false),
      style: s,
      onClick: disabled ? undefined : onClick,
      ...rest
    };
    return href && !disabled ? /*#__PURE__*/React.createElement("a", _extends({
      href: href
    }, props), children) : /*#__PURE__*/React.createElement("button", _extends({
      type: type,
      disabled: disabled
    }, props), children);
  }

  // buttons/IconButton

  function IconButton({
    icon = 'x',
    label,
    size = 44,
    onDark = false,
    onClick,
    style
  }) {
    const [p, h] = usePress();
    return /*#__PURE__*/React.createElement("button", _extends({
      "aria-label": label || icon,
      onClick: onClick
    }, h, {
      style: {
        width: size,
        height: size,
        borderRadius: 'var(--radius-full)',
        border: 'none',
        background: onDark ? 'rgba(66,66,69,0.72)' : 'var(--color-surface-chip-translucent-a)',
        color: onDark ? 'var(--color-on-dark)' : 'var(--color-ink)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backdropFilter: 'var(--blur-frosted)',
        WebkitBackdropFilter: 'var(--blur-frosted)',
        transform: p ? 'var(--press-scale)' : 'none',
        transition: 'transform var(--dur-fast) var(--ease-standard)',
        fontSize: Math.round(size * 0.41),
        ...style
      }
    }), /*#__PURE__*/React.createElement("i", {
      className: 'icon-' + icon,
      "aria-hidden": "true"
    }));
  }

  // buttons/TextLink

  function TextLink({
    href = '#',
    onDark = false,
    chevron = false,
    underline = false,
    children,
    style,
    onClick
  }) {
    return /*#__PURE__*/React.createElement("a", {
      href: href,
      onClick: onClick,
      style: {
        color: onDark ? 'var(--color-primary-on-dark)' : 'var(--color-primary)',
        textDecoration: underline ? 'underline' : 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        ...style
      }
    }, children, chevron && /*#__PURE__*/React.createElement("i", {
      className: "icon-chevron-right",
      "aria-hidden": "true",
      style: {
        fontSize: '0.85em'
      }
    }));
  }

  // navigation/GlobalNav

  function GlobalNav({
    brand = 'Oil & Gas Development',
    links = [],
    active,
    onNavigate,
    style
  }) {
    const ls = {
      color: 'var(--color-on-dark)',
      opacity: 0.8,
      fontSize: 12,
      letterSpacing: '-0.12px',
      lineHeight: 1,
      textDecoration: 'none',
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    };
    return /*#__PURE__*/React.createElement("nav", {
      style: {
        background: 'var(--color-surface-black)',
        height: 'var(--nav-global-h)',
        color: 'var(--color-on-dark)',
        fontFamily: 'var(--font-text)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1024,
        margin: '0 auto',
        height: '100%',
        padding: '0 22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20
      }
    }, /*#__PURE__*/React.createElement("a", {
      onClick: () => onNavigate && onNavigate('home'),
      style: {
        ...ls,
        opacity: 1,
        fontWeight: 600,
        fontSize: 13
      }
    }, brand), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        overflow: 'hidden'
      }
    }, links.map(l => /*#__PURE__*/React.createElement("a", {
      key: l.id || l.label,
      onClick: () => onNavigate && onNavigate(l.id),
      style: {
        ...ls,
        opacity: active === l.id ? 1 : 0.8
      }
    }, l.label))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 20,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "icon-search",
      style: {
        fontSize: 15,
        opacity: 0.8
      }
    }), /*#__PURE__*/React.createElement("i", {
      className: "icon-globe",
      style: {
        fontSize: 15,
        opacity: 0.8
      }
    }))));
  }

  // navigation/SubNav

  function SubNav({
    title,
    links = [],
    active,
    onNavigate,
    cta,
    onCta,
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 10,
        height: 'var(--nav-sub-h)',
        background: 'var(--color-surface-frosted)',
        backdropFilter: 'var(--blur-frosted)',
        WebkitBackdropFilter: 'var(--blur-frosted)',
        borderBottom: '1px solid var(--color-hairline-a)',
        fontFamily: 'var(--font-text)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1024,
        margin: '0 auto',
        height: '100%',
        padding: '0 22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 21,
        fontWeight: 600,
        letterSpacing: '0.231px',
        lineHeight: 1.19,
        color: 'var(--color-ink)',
        whiteSpace: 'nowrap'
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 24
      }
    }, links.map(l => /*#__PURE__*/React.createElement("a", {
      key: l.id || l.label,
      onClick: () => onNavigate && onNavigate(l.id),
      style: {
        fontSize: 12,
        letterSpacing: '-0.12px',
        color: active === l.id ? 'var(--color-ink-muted-48)' : 'var(--color-ink)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        textDecoration: 'none'
      }
    }, l.label)), cta && /*#__PURE__*/React.createElement(Button, {
      onClick: onCta,
      style: {
        padding: '4px 11px',
        fontSize: 12,
        letterSpacing: '-0.12px',
        lineHeight: 1.33
      }
    }, cta))));
  }

  // surfaces/MediaFrame

  function MediaFrame({
    src,
    alt = '',
    label = 'Image',
    ratio = '16/9',
    radius = 0,
    shadow = false,
    tone = 'light',
    fit = 'cover',
    style
  }) {
    const dark = tone === 'dark';
    return /*#__PURE__*/React.createElement("div", {
      style: {
        aspectRatio: ratio,
        width: '100%',
        borderRadius: radius,
        overflow: 'hidden',
        boxShadow: shadow ? 'var(--shadow-product)' : 'none',
        background: dark ? '#3a3a3c' : '#e8e8ed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }
    }, src ? /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: alt,
      style: {
        width: '100%',
        height: '100%',
        objectFit: fit,
        display: 'block'
      }
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        letterSpacing: '-0.12px',
        color: dark ? '#a1a1a6' : 'var(--color-ink-muted-48)',
        fontFamily: 'var(--font-text)'
      }
    }, label));
  }

  // surfaces/ProductTile

  const tones = {
    light: 'var(--color-canvas)',
    parchment: 'var(--color-canvas-parchment)',
    dark: 'var(--color-surface-tile-1)',
    'dark-2': 'var(--color-surface-tile-2)',
    'dark-3': 'var(--color-surface-tile-3)',
    black: 'var(--color-surface-black)'
  };
  function ProductTile({
    tone = 'light',
    eyebrow,
    title,
    tagline,
    actions,
    children,
    hero = false,
    style
  }) {
    const dark = tone.startsWith('dark') || tone === 'black';
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: tones[tone],
        color: dark ? 'var(--color-on-dark)' : 'var(--color-ink)',
        padding: 'var(--space-section) 22px 0',
        textAlign: 'center',
        overflow: 'hidden',
        fontFamily: 'var(--font-text)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 980,
        margin: '0 auto'
      }
    }, eyebrow && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 21,
        fontWeight: 600,
        letterSpacing: '0.231px',
        lineHeight: 1.19,
        marginBottom: 8,
        color: dark ? 'var(--color-body-muted)' : 'var(--color-ink)'
      }
    }, eyebrow), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: hero ? 56 : 40,
        lineHeight: hero ? 1.07 : 1.1,
        letterSpacing: hero ? '-0.28px' : 0,
        textWrap: 'balance'
      }
    }, title), tagline && /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '6px 0 0',
        fontSize: 28,
        fontWeight: 400,
        lineHeight: 1.14,
        letterSpacing: '0.196px',
        textWrap: 'balance'
      }
    }, tagline), actions && /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 16,
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginTop: 24
      }
    }, actions)), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1200,
        margin: '0 auto',
        paddingTop: children ? 48 : 0,
        paddingBottom: children ? 0 : 'var(--space-section)'
      }
    }, children));
  }

  // surfaces/QuoteCard

  function QuoteCard({
    src,
    label = 'Landscape photograph',
    kicker,
    title,
    body,
    action,
    style
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        position: 'relative',
        background: 'var(--color-surface-tile-1)',
        color: 'var(--color-on-dark)',
        padding: 'var(--space-section) 22px',
        textAlign: 'center',
        minHeight: 520,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'var(--font-text)',
        ...style
      }
    }, src ? /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: "",
      style: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 16,
        bottom: 12,
        fontSize: 12,
        color: '#86868b'
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        maxWidth: 760
      }
    }, kicker && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: '-0.224px',
        marginBottom: 16,
        color: 'var(--color-body-muted)'
      }
    }, kicker), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 0,
        fontFamily: 'var(--font-display)',
        fontSize: 40,
        fontWeight: 600,
        lineHeight: 1.1,
        textWrap: 'balance'
      }
    }, title), body && /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '16px auto 0',
        fontSize: 24,
        fontWeight: 300,
        lineHeight: 1.5,
        maxWidth: 640,
        color: 'var(--color-body-muted)'
      }
    }, body), action && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 32
      }
    }, action)));
  }

  // surfaces/StickyBar

  function StickyBar({
    label,
    value,
    cta = 'Continue',
    onCta,
    position = 'fixed',
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
        height: 'var(--sticky-bar-h)',
        background: 'var(--color-surface-frosted)',
        backdropFilter: 'var(--blur-frosted)',
        WebkitBackdropFilter: 'var(--blur-frosted)',
        borderTop: '1px solid var(--color-hairline-a)',
        padding: '12px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        fontFamily: 'var(--font-text)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 17,
        letterSpacing: '-0.374px',
        color: 'var(--color-ink)'
      }
    }, label && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--color-ink-muted-48)',
        marginRight: 8
      }
    }, label), value), /*#__PURE__*/React.createElement(Button, {
      onClick: onCta
    }, cta));
  }

  // cards/UtilityCard

  function UtilityCard({
    src,
    imageLabel = 'Image',
    ratio = '1/1',
    eyebrow,
    title,
    meta,
    link,
    href = '#',
    onClick,
    style
  }) {
    return /*#__PURE__*/React.createElement("div", {
      onClick: onClick,
      style: {
        background: 'var(--color-canvas)',
        border: '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        fontFamily: 'var(--font-text)',
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }
    }, /*#__PURE__*/React.createElement(MediaFrame, {
      src: src,
      label: imageLabel,
      ratio: ratio,
      radius: 8
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, eyebrow && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        letterSpacing: '-0.12px',
        color: 'var(--color-ink-muted-48)',
        marginBottom: 4
      }
    }, eyebrow), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 17,
        fontWeight: 600,
        lineHeight: 1.24,
        letterSpacing: '-0.374px',
        color: 'var(--color-ink)'
      }
    }, title), meta && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 17,
        lineHeight: 1.47,
        letterSpacing: '-0.374px',
        color: 'var(--color-ink)'
      }
    }, meta), link && /*#__PURE__*/React.createElement("a", {
      href: href,
      style: {
        fontSize: 14,
        letterSpacing: '-0.224px',
        color: 'var(--color-primary)',
        marginTop: 8,
        textDecoration: 'none'
      }
    }, link, " ", /*#__PURE__*/React.createElement("i", {
      className: "icon-chevron-right",
      style: {
        fontSize: 11
      }
    }))));
  }

  // cards/OptionChip

  function OptionChip({
    label,
    detail,
    selected = false,
    thumb,
    onClick,
    style
  }) {
    return /*#__PURE__*/React.createElement("button", {
      onClick: onClick,
      style: {
        background: 'var(--color-canvas)',
        color: 'var(--color-ink)',
        border: selected ? '2px solid var(--color-primary-focus)' : '1px solid var(--color-hairline)',
        borderRadius: 'var(--radius-pill)',
        padding: selected ? '11px 15px' : '12px 16px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: 'var(--font-text)',
        fontSize: 14,
        lineHeight: 1.43,
        letterSpacing: '-0.224px',
        cursor: 'pointer',
        textAlign: 'left',
        ...style
      }
    }, thumb && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: thumb,
        flex: 'none'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, label), detail && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--color-ink-muted-48)'
      }
    }, detail));
  }

  // forms/SearchInput

  function SearchInput({
    value,
    onChange,
    placeholder = 'Search',
    style
  }) {
    const [f, setF] = React.useState(false);
    return /*#__PURE__*/React.createElement("label", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        height: 44,
        padding: '0 20px',
        background: 'var(--color-canvas)',
        border: '1px solid var(--color-hairline-a)',
        borderRadius: 'var(--radius-pill)',
        outline: f ? '2px solid var(--color-primary-focus)' : 'none',
        outlineOffset: 1,
        fontFamily: 'var(--font-text)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "icon-search",
      style: {
        fontSize: 14,
        color: 'var(--color-ink-muted-48)'
      }
    }), /*#__PURE__*/React.createElement("input", {
      value: value,
      onChange: e => onChange && onChange(e.target.value),
      placeholder: placeholder,
      onFocus: () => setF(true),
      onBlur: () => setF(false),
      style: {
        border: 'none',
        outline: 'none',
        background: 'transparent',
        flex: 1,
        fontSize: 17,
        letterSpacing: '-0.374px',
        color: 'var(--color-ink)',
        fontFamily: 'inherit'
      }
    }));
  }

  // footer/Footer

  function Footer({
    columns = [],
    note,
    legal,
    style
  }) {
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        background: 'var(--color-canvas-parchment)',
        color: 'var(--color-ink-muted-80)',
        padding: '64px 22px',
        fontFamily: 'var(--font-text)',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 980,
        margin: '0 auto'
      }
    }, note && /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 12,
        lineHeight: 1.33,
        letterSpacing: '-0.12px',
        color: 'var(--color-ink-muted-48)',
        margin: '0 0 24px',
        paddingBottom: 16,
        borderBottom: '1px solid var(--color-hairline)'
      }
    }, note), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
        gap: 24
      }
    }, columns.map(c => /*#__PURE__*/React.createElement("div", {
      key: c.title
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1.29,
        letterSpacing: '-0.224px',
        color: 'var(--color-ink)',
        marginBottom: 6
      }
    }, c.title), c.links.map(l => /*#__PURE__*/React.createElement("div", {
      key: l,
      style: {
        fontSize: 12,
        lineHeight: 2.41,
        letterSpacing: '-0.12px'
      }
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        color: 'var(--color-ink-muted-80)',
        textDecoration: 'none'
      }
    }, l)))))), legal && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 32,
        paddingTop: 16,
        borderTop: '1px solid var(--color-hairline)',
        fontSize: 12,
        lineHeight: 1,
        letterSpacing: '-0.12px',
        color: 'var(--color-ink-muted-48)'
      }
    }, legal)));
  }

  // explorer/TechViz

  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a |= 0;
      a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  const hex = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  const RAMP = ['#0B1F6B', '#1F4FD1', '#16A3D8', '#3CC48C', '#E9D43A', '#F29A1F', '#D6402B'].map(hex);
  const SEIS = ['#1C3F9E', '#6F8FD0', '#F4F1EA', '#D88A70', '#B8322A'].map(hex);
  function ramp(stops, t) {
    t = Math.max(0, Math.min(0.9999, t));
    const p = t * (stops.length - 1),
      i = Math.floor(p),
      f = p - i,
      a = stops[i],
      b = stops[i + 1];
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
  }
  function waves(r, n, amp) {
    const w = [];
    for (let i = 0; i < n; i++) w.push([amp * (r() * 0.6 + 0.4) / (i + 1), (i + 1) * (1.5 + r() * 2), r() * 6.28]);
    return u => w.reduce((s, [a, f, p]) => s + a * Math.sin(u * f + p), 0);
  }
  function pixels(ctx, W, H, fn) {
    const img = ctx.createImageData(W, H),
      d = img.data;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const c = fn(x / W, y / H),
        i = (y * W + x) * 4;
      d[i] = c[0];
      d[i + 1] = c[1];
      d[i + 2] = c[2];
      d[i + 3] = c[3] == null ? 255 : c[3];
    }
    ctx.putImageData(img, 0, 0);
  }
  function seismic(ctx, W, H, r, opt) {
    const st = waves(r, 4, 0.05),
      fq = waves(r, 3, 4),
      fx = 0.58 + r() * 0.1,
      nz = () => r() * 0.16 - 0.08;
    pixels(ctx, W, H, (u, v) => {
      const bump = 0.13 * Math.exp(-(((u - 0.42) / 0.2) ** 2));
      let t = v + st(u) * 0.8 + bump * (0.4 + v * 0.6);
      if (opt.fault && u > fx + 0.22 * (v - 0.2)) t += 0.045;
      const f = 22 + fq(t * 3);
      let a = Math.sin(t * f * 6.28) * (0.55 + 0.45 * Math.sin(t * 41 + u * 2.1)) * (0.7 + 0.3 * Math.sin(t * 9));
      a += nz();
      const c = ramp(SEIS, (a + 1) / 2);
      return c;
    });
  }
  function strata(ctx, W, H, r, opt) {
    const st = waves(r, 3, 0.025),
      fx = 0.66;
    const L = [[0, '#CFE5F1'], [0.1, '#E8DFCB'], [0.22, '#D5CDBE'], [0.33, '#E3D3AE'], [0.45, '#9DAFC2'], [0.53, 'RES'], [0.63, '#7E8C9C'], [0.76, '#4A5160'], [0.9, '#363A44']];
    const cols = L.map(l => l[1] === 'RES' ? null : hex(l[1])),
      oil = hex('#F29A1F'),
      oil2 = hex('#D6402B'),
      wat = hex('#7FA6C9');
    pixels(ctx, W, H, (u, v) => {
      const bump = 0.16 * Math.exp(-(((u - 0.4) / 0.22) ** 2));
      let t = v;
      if (v > 0.1) t = v + (bump + st(u)) * Math.min(1, (v - 0.1) * 4);
      if (opt.fault && u > fx + 0.18 * (v - 0.3) && v > 0.12) t -= 0.05;
      let k = 0;
      for (let i = 0; i < L.length; i++) if (t >= L[i][0]) k = i;
      if (v < 0.1) return cols[0];
      let c;
      if (L[k][1] === 'RES') {
        const crest = v;
        c = crest < 0.47 ? ramp([oil2, oil], (crest - 0.32) / 0.15) : wat;
      } else c = cols[k];
      const lam = 0.94 + 0.06 * Math.sin(t * 620 + Math.sin(u * 9) * 2);
      return [c[0] * lam, c[1] * lam, c[2] * lam];
    });
  }
  function field(r, n) {
    const b = [];
    for (let i = 0; i < n; i++) b.push([r() * 0.8 + 0.1, r() * 0.8 + 0.1, 0.08 + r() * 0.18, r() * 1.4 - 0.4]);
    return (u, v) => b.reduce((s, [x, y, w, a]) => s + a * Math.exp(-((u - x) ** 2 + (v - y) ** 2) / (w * w)), 0);
  }
  function reservoir(ctx, W, H, r, opt) {
    const fn = field(r, 9),
      edge = waves(r, 5, 0.06);
    let mn = 1e9,
      mx = -1e9;
    for (let i = 0; i < 400; i++) {
      const q = fn(i % 20 / 20, Math.floor(i / 20) / 20);
      mn = Math.min(mn, q);
      mx = Math.max(mx, q);
    }
    const asp = W / H;
    pixels(ctx, W, H, (u, v) => {
      const dx = (u - 0.5) * asp,
        dy = v - 0.5,
        ang = Math.atan2(dy, dx),
        rad = Math.hypot(dx / (asp * 0.46), dy / 0.42);
      const lim = 1 + edge(ang);
      if (opt.mask !== false && rad > lim) return [0, 0, 0, 0];
      let q = (fn(u, v) - mn) / (mx - mn);
      const c = ramp(RAMP, q);
      const con = Math.abs(q * 12 % 1 - 0.5) < 0.035 ? 0.72 : 1;
      const gx = u * W % 14 < 1 || v * H % 14 < 1 ? 0.93 : 1;
      return [c[0] * con * gx, c[1] * con * gx, c[2] * con * gx];
    });
  }
  function structure(ctx, W, H, r) {
    const fn = field(r, 7);
    let mn = 1e9,
      mx = -1e9;
    for (let i = 0; i < 400; i++) {
      const q = fn(i % 20 / 20, Math.floor(i / 20) / 20);
      mn = Math.min(mn, q);
      mx = Math.max(mx, q);
    }
    const S = ['#0B1F6B', '#1F4FD1', '#16A3D8', '#9AD7EA', '#EEF4F8'].map(hex);
    pixels(ctx, W, H, (u, v) => {
      const q = (fn(u, v) - mn) / (mx - mn);
      const c = ramp(S, q);
      const con = Math.abs(q * 16 % 1 - 0.5) < 0.04 ? 0.8 : 1;
      return [c[0] * con, c[1] * con, c[2] * con];
    });
  }
  function wellLog(ctx, w, h, r) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, w, h);
    const sand = waves(r, 6, 1),
      N = Math.floor(h / 2);
    const tr = [[0, 0.12], [0.12, 0.34], [0.34, 0.56], [0.56, 0.78], [0.78, 1]].map(([a, b]) => [a * w, b * w]);
    ctx.strokeStyle = '#DCE3EC';
    ctx.lineWidth = 1;
    tr.forEach(([a]) => {
      ctx.beginPath();
      ctx.moveTo(a + 0.5, 0);
      ctx.lineTo(a + 0.5, h);
      ctx.stroke();
    });
    for (let y = 0; y < h; y += h / 12) {
      ctx.beginPath();
      ctx.moveTo(tr[1][0], y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
    const z = [],
      gr = [],
      rs = [],
      rh = [],
      nph = [],
      hc = [];
    for (let i = 0; i <= N; i++) {
      const d = i / N,
        s = sand(d * 8) + 0.25 * Math.sin(d * 90 + r() * 0.3) + (r() - 0.5) * 0.35;
      const isS = s > 0.15,
        isHC = isS && d > 0.38 && d < 0.62;
      z.push(d * h);
      gr.push(isS ? 0.18 + r() * 0.1 : 0.7 + r() * 0.18);
      rs.push(isHC ? 0.75 + r() * 0.15 : isS ? 0.3 + r() * 0.08 : 0.2 + r() * 0.08);
      rh.push(isS ? 0.4 + r() * 0.06 : 0.62 + r() * 0.06);
      nph.push(isS ? (isHC ? 0.25 : 0.38) + r() * 0.05 : 0.7 + r() * 0.06);
      hc.push(isHC);
    }
    const X = (t, v) => t[0] + 8 + v * (t[1] - t[0] - 16);
    ctx.fillStyle = 'rgba(242,154,31,0.22)';
    ctx.beginPath();
    ctx.moveTo(tr[1][0], 0);
    z.forEach((y, i) => ctx.lineTo(X(tr[1], gr[i]), y));
    ctx.lineTo(tr[1][0], h);
    ctx.fill();
    const line = (t, arr, col, dash) => {
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.4;
      ctx.setLineDash(dash || []);
      ctx.beginPath();
      z.forEach((y, i) => i ? ctx.lineTo(X(t, arr[i]), y) : ctx.moveTo(X(t, arr[i]), y));
      ctx.stroke();
      ctx.setLineDash([]);
    };
    line(tr[1], gr, '#C77A10');
    line(tr[2], rs, '#0A5CDB');
    ctx.fillStyle = 'rgba(214,64,43,0.16)';
    z.forEach((y, i) => {
      if (hc[i]) {
        ctx.fillRect(X(tr[3], rh[i]), y, X(tr[3], nph[i]) - X(tr[3], rh[i]), h / N + 0.5);
      }
    });
    line(tr[3], rh, '#D6402B');
    line(tr[3], nph, '#12A4D9', [4, 3]);
    z.forEach((y, i) => {
      ctx.fillStyle = hc[i] ? '#F29A1F' : gr[i] < 0.4 ? '#E3D3AE' : '#9DAFC2';
      ctx.fillRect(tr[4][0] + 8, y, tr[4][1] - tr[4][0] - 16, h / N + 0.5);
    });
    ctx.fillStyle = '#8A98A8';
    ctx.font = '10px Inter, sans-serif';
    for (let k = 1; k < 12; k++) ctx.fillText(String(2400 + k * 25), 6, k * h / 12 + 3);
  }
  function decline(ctx, w, h, r) {
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.clearRect(0, 0, w, h);
    const p = {
        l: 44,
        r: 16,
        t: 16,
        b: 28
      },
      W = w - p.l - p.r,
      H = h - p.t - p.b;
    ctx.strokeStyle = '#DCE3EC';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = p.t + H * i / 4;
      ctx.beginPath();
      ctx.moveTo(p.l, y);
      ctx.lineTo(w - p.r, y);
      ctx.stroke();
    }
    const N = 120,
      s = (fn, col, width, dash) => {
        ctx.strokeStyle = col;
        ctx.lineWidth = width;
        ctx.setLineDash(dash || []);
        ctx.beginPath();
        for (let i = 0; i <= N; i++) {
          const x = i / N,
            y = fn(x);
          const X = p.l + x * W,
            Y = p.t + H * (1 - y);
          i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      };
    const noise = () => (r() - 0.5) * 0.025;
    s(x => Math.min(0.92, x * 12) * 0.92 / (1 + 3.2 * x) ** 0.9 + noise(), '#0A5CDB', 2);
    s(x => Math.max(0, (x - 0.2) * 1.05) ** 0.8 * 0.85, '#12A4D9', 1.6);
    s(x => 0.88 - 0.42 * x - 0.08 * Math.sin(x * 3), '#0B1A2C', 1.2, [5, 4]);
    ctx.fillStyle = '#8A98A8';
    ctx.font = '10px Inter, sans-serif';
    ['0', '5', '10', '15', '20 yr'].forEach((t, i) => ctx.fillText(t, p.l + W * i / 4 - (i ? 8 : 0), h - 8));
  }
  const R = {
    seismic,
    strata,
    reservoir,
    structure,
    log: wellLog,
    decline
  };
  function TechViz({
    kind = 'seismic',
    seed = 7,
    fault = true,
    mask = true,
    resolution = 0.5,
    label,
    style
  }) {
    const wrap = React.useRef(null),
      cv = React.useRef(null);
    React.useEffect(() => {
      const el = wrap.current;
      if (!el) return;
      let raf;
      const draw = () => {
        const w = el.clientWidth,
          h = el.clientHeight;
        if (!w || !h) return;
        const c = cv.current,
          dpr = Math.min(2, window.devicePixelRatio || 1);
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
        const ctx = c.getContext('2d');
        const r = rng(seed);
        if (kind === 'log' || kind === 'decline') {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          R[kind](ctx, w, h, r);
          return;
        }
        const W = Math.max(80, Math.round(w * resolution)),
          H = Math.max(60, Math.round(h * resolution));
        const off = document.createElement('canvas');
        off.width = W;
        off.height = H;
        R[kind](off.getContext('2d'), W, H, r, {
          fault,
          mask
        });
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(off, 0, 0, c.width, c.height);
      };
      const ro = new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      });
      ro.observe(el);
      draw();
      return () => {
        ro.disconnect();
        cancelAnimationFrame(raf);
      };
    }, [kind, seed, fault, mask, resolution]);
    return /*#__PURE__*/React.createElement("div", {
      ref: wrap,
      role: "img",
      "aria-label": label || kind + ' visualization',
      style: {
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 80,
        ...style
      }
    }, /*#__PURE__*/React.createElement("canvas", {
      ref: cv,
      style: {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block'
      }
    }));
  }

  // explorer/StageNav

  function StageNav({
    stages = [],
    current = 0,
    onSelect,
    cta = 'Explore the Journey',
    onCta,
    position = 'fixed',
    windowSize = 5,
    style
  }) {
    const box = React.useRef(null);
    const [ws, setWs] = React.useState(windowSize);
    React.useEffect(() => {
      const el = box.current;
      if (!el) return;
      const ro = new ResizeObserver(() => {
        const w = el.clientWidth;
        setWs(Math.max(1, Math.min(windowSize, Math.floor(w / 150))));
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, [windowSize]);
    const cur = stages[current] || {};
    const n = stages.length;
    let start = Math.max(0, Math.min(current - (ws > 2 ? 1 : 0), n - ws));
    const vis = stages.slice(start, start + ws);
    return /*#__PURE__*/React.createElement("nav", {
      "aria-label": "Development stages",
      style: {
        position,
        left: 0,
        right: 0,
        bottom: position === 'fixed' ? 16 : undefined,
        zIndex: 30,
        padding: '0 var(--gutter-page)',
        pointerEvents: 'none',
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        pointerEvents: 'auto',
        maxWidth: 1360,
        margin: '0 auto',
        height: 'var(--stage-nav-h)',
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        border: '1px solid var(--ex-line)',
        borderRadius: 20,
        boxShadow: 'var(--shadow-float)',
        display: 'flex',
        alignItems: 'center',
        gap: 28,
        padding: '0 24px',
        fontFamily: 'var(--font-editorial)',
        color: 'var(--ex-navy)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        flex: 'none',
        minWidth: 220
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: 'var(--ex-blue)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: '#fff'
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: 'var(--ex-faint)',
        letterSpacing: '0.02em'
      }
    }, "Current Stage"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        color: 'var(--ex-blue)',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontVariantNumeric: 'tabular-nums'
      }
    }, cur.num), cur.label, /*#__PURE__*/React.createElement("i", {
      className: "icon-arrow-right",
      style: {
        fontSize: 14
      }
    })))), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 1,
        height: 36,
        background: 'var(--ex-line)',
        flex: 'none'
      }
    }), /*#__PURE__*/React.createElement("div", {
      ref: box,
      style: {
        flex: 1,
        minWidth: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(' + vis.length + ',minmax(0,1fr))',
        gap: 16,
        overflow: 'hidden'
      }
    }, vis.map(s => {
      const i = stages.indexOf(s),
        on = i === current,
        past = i < current;
      return /*#__PURE__*/React.createElement("button", {
        key: s.id,
        onClick: () => onSelect && onSelect(i),
        style: {
          all: 'unset',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          paddingTop: 10,
          borderTop: '2px solid ' + (on ? 'var(--ex-blue)' : past ? 'rgba(10,92,219,0.35)' : 'var(--ex-line)'),
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 11,
          fontVariantNumeric: 'tabular-nums',
          color: on ? 'var(--ex-blue)' : 'var(--ex-faint)'
        }
      }, s.num), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          fontWeight: on ? 600 : 400,
          color: on ? 'var(--ex-blue)' : 'var(--ex-navy)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }
      }, s.label));
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6,
        alignItems: 'center'
      },
      "aria-hidden": "true"
    }, stages.map((s, i) => /*#__PURE__*/React.createElement("span", {
      key: s.id,
      style: {
        width: i === current ? 18 : 6,
        height: 6,
        borderRadius: 3,
        background: i <= current ? 'var(--ex-blue)' : 'var(--ex-line-strong)',
        opacity: i < current ? 0.45 : 1
      }
    }))), /*#__PURE__*/React.createElement("a", {
      onClick: onCta,
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--ex-navy)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        textDecoration: 'none'
      }
    }, cta, /*#__PURE__*/React.createElement("i", {
      className: "icon-arrow-right",
      style: {
        fontSize: 14
      }
    })))));
  }

  // explorer/SiteHeader

  function SiteHeader({
    links = [],
    active,
    onNavigate,
    tone = 'light',
    position = 'absolute',
    style
  }) {
    const dark = tone === 'dark',
      ink = dark ? '#fff' : 'var(--ex-navy)';
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        height: 72,
        padding: '0 var(--gutter-page)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        fontFamily: 'var(--font-editorial)',
        color: ink,
        ...style
      }
    }, /*#__PURE__*/React.createElement("a", {
      onClick: () => onNavigate && onNavigate('home'),
      style: {
        cursor: 'pointer',
        display: 'flex',
        gap: 6,
        alignItems: 'baseline',
        fontSize: 14,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: ink,
        textDecoration: 'none',
        whiteSpace: 'nowrap'
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        fontWeight: 700
      }
    }, "Oil & Gas"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 300
      }
    }, "Development")), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: 'flex',
        gap: 32,
        alignItems: 'center'
      }
    }, links.map(l => /*#__PURE__*/React.createElement("a", {
      key: l.id,
      onClick: () => onNavigate && onNavigate(l.id),
      style: {
        fontSize: 13,
        cursor: 'pointer',
        color: active === l.id ? dark ? '#4DA3FF' : 'var(--ex-blue)' : ink,
        fontWeight: active === l.id ? 600 : 400,
        textDecoration: 'none',
        whiteSpace: 'nowrap'
      }
    }, l.label))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        fontSize: 12
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: "icon-search",
      style: {
        fontSize: 16
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        letterSpacing: '0.06em',
        whiteSpace: 'nowrap'
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        fontWeight: 600
      }
    }, "KR"), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        opacity: 0.5
      }
    }, "/ EN"))));
  }

  // explorer/ArrowCTA

  function ArrowCTA({
    children = 'Explore the Journey',
    onClick,
    href,
    tone = 'navy',
    direction = 'right',
    style
  }) {
    const [p, setP] = React.useState(false);
    const bg = tone === 'blue' ? 'var(--ex-blue)' : tone === 'white' ? '#fff' : 'var(--ex-navy)';
    const fg = tone === 'white' ? 'var(--ex-navy)' : '#fff';
    const lbl = tone === 'white' ? '#fff' : 'var(--ex-navy)';
    const Tag = href ? 'a' : 'button';
    return /*#__PURE__*/React.createElement(Tag, {
      href: href,
      onClick: onClick,
      onMouseDown: () => setP(true),
      onMouseUp: () => setP(false),
      onMouseLeave: () => setP(false),
      style: {
        all: 'unset',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 16,
        fontFamily: 'var(--font-editorial)',
        fontSize: 14,
        fontWeight: 600,
        color: lbl,
        transform: p ? 'scale(0.97)' : 'none',
        transition: 'transform 200ms',
        ...style
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: bg,
        color: fg,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement("i", {
      className: 'icon-arrow-' + direction,
      style: {
        fontSize: 18
      }
    })), children);
  }

  // explorer/DepthRuler

  function DepthRuler({
    marks = ['0 m', '1,000', '2,000', '3,000 m'],
    tone = 'light',
    label = 'Depth',
    style
  }) {
    const c = tone === 'dark' ? 'rgba(255,255,255,0.85)' : 'var(--ex-navy)';
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        gap: 10,
        fontFamily: 'var(--font-editorial)',
        color: c,
        ...style
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        writingMode: 'vertical-rl'
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        flex: 1,
        width: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        width: 1,
        background: c,
        opacity: 0.5
      }
    }), marks.map(m => /*#__PURE__*/React.createElement("span", {
      key: m,
      style: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 1,
        background: c
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 14,
        fontSize: 10,
        whiteSpace: 'nowrap',
        fontVariantNumeric: 'tabular-nums'
      }
    }, m)))), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: '50%',
        border: '1px solid ' + c
      }
    }));
  }
  window.OilGasDevelopmentDesignSystem_dcb6ae = Object.assign(window.OilGasDevelopmentDesignSystem_dcb6ae || {}, {
    Button,
    IconButton,
    TextLink,
    GlobalNav,
    SubNav,
    MediaFrame,
    ProductTile,
    QuoteCard,
    StickyBar,
    UtilityCard,
    OptionChip,
    SearchInput,
    Footer,
    TechViz,
    StageNav,
    SiteHeader,
    ArrowCTA,
    DepthRuler
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "versions/v1/ui_kits/explorer/ds-standalone.js", error: String((e && e.message) || e) }); }

// versions/v1/ui_kits/explorer/stages.js
try { (() => {
window.OGD_STAGES = [{
  id: 'surface',
  num: '01',
  label: 'Surface',
  sub: 'Remote sensing · Gravity · Magnetics',
  depth: '0 m',
  bg: '#F6F8FB',
  dark: false,
  title: "The journey begins at the Earth's surface.",
  kr: '위성 영상, 지표 지질조사, 중력·자력 탐사로 수천 km²의 분지에서 탐사할 가치가 있는 지역을 좁혀 갑니다.',
  t: {
    in: '히어로 사진이 확대되어 full-bleed 장면이 됩니다. 수평선(sea level seam)은 같은 높이에 고정.',
    hold: '사진 위 관측 지점 라벨이 순서대로 나타납니다.',
    out: '카메라가 해수면 아래로 하강. 사진은 위로 밀려나고 지층 단면이 아래에서 올라옵니다.',
    persist: 'Sea level seam · Depth ruler 0 m'
  }
}, {
  id: 'petroleum',
  num: '02',
  label: 'Petroleum System',
  sub: 'Source · Migration · Trap',
  depth: '0 – 4,000 m',
  bg: '#F6F8FB',
  dark: false,
  title: 'From source rock to trapped hydrocarbons.',
  kr: '근원암에서 생성된 탄화수소는 이동하여 저류암에 모이고, 덮개암과 트랩에 의해 보존됩니다. 요소와 타이밍이 모두 맞아야 석유 시스템이 성립합니다.',
  t: {
    in: '지층 단면이 아래에서 차오릅니다(wipe up). 배경은 그대로.',
    hold: '근원암 → 이동 → 저류암 → 덮개암 → 트랩 순으로 라벨과 레이어가 하이라이트.',
    out: '단면이 뒤로 기울며 위에서 내려다보는 평면(구조도)으로 회전합니다.',
    persist: 'Strata layer colors · Depth ruler'
  }
}, {
  id: 'subsurface',
  num: '03',
  label: 'Subsurface',
  sub: 'Geology · Structure · Characterization',
  depth: '2,450 m',
  bg: '#EEF2F7',
  dark: false,
  title: 'Reading the structure beneath.',
  kr: '지층의 형태, 단층과 습곡을 해석해 탄화수소가 모일 수 있는 닫힌 구조를 찾습니다. 결과는 깊이 구조도로 정리됩니다.',
  t: {
    in: '단면 → 평면 회전이 끝나며 등고선이 그려집니다.',
    hold: '스크롤에 따라 등고선 깊이 값이 바뀝니다(depth slicing).',
    out: '구조 정점(crest)에 시추 위치 핀이 꽂히고, 수직선이 아래로 내려갑니다.',
    persist: 'Well location pin'
  }
}, {
  id: 'well',
  num: '04',
  label: 'Well & Logging',
  sub: 'Drilling · Petrophysics',
  depth: '2,400 – 2,700 m',
  bg: '#E6ECF3',
  dark: false,
  title: 'Data reveals the story below.',
  kr: '시추공에서 측정한 감마선·비저항·밀도·중성자 검층이 암상과 유체를 구분합니다. 지하를 직접 확인하는 1차원의 창입니다.',
  t: {
    in: '시추 궤적(수직선)이 넓어지며 검층 트랙으로 펼쳐집니다.',
    hold: '트랙이 깊이 방향으로 스크롤되고 탄화수소 구간이 하이라이트.',
    out: '검층 트랙이 옆으로 복제되어 수많은 트레이스가 되며 탄성파 단면으로 이어집니다.',
    persist: 'Wellbore line'
  }
}, {
  id: 'seismic',
  num: '05',
  label: 'Seismic',
  sub: 'Acquisition · Processing · Interpretation',
  depth: '0 – 4.0 s TWT',
  bg: '#0B1A2C',
  dark: true,
  title: 'Imaging the invisible.',
  kr: '지표에서 발생시킨 탄성파가 지층 경계에서 반사되어 돌아옵니다. 수백만 개의 트레이스를 처리해 지하를 3차원 영상으로 재구성합니다.',
  t: {
    in: '트레이스가 펼쳐지고 배경이 navy로 어두워집니다 — 여정의 가장 깊은 지점.',
    hold: '단면이 수평으로 패닝되고 해석 horizon 라인이 그려집니다.',
    out: '해석된 horizon이 저류층 상부면이 되어 3D 속성 모델로 돌출(extrude)됩니다.',
    persist: 'Interpreted horizon line'
  }
}, {
  id: 'reservoir',
  num: '06',
  label: 'Reservoir',
  sub: 'Modeling · Properties',
  depth: '2,450 m',
  bg: '#13263D',
  dark: true,
  title: 'From structure to property.',
  kr: '검층과 탄성파 자료를 결합해 공극률·투과도·포화도의 3차원 분포를 모델링합니다. 정적 모델은 모든 개발 계획의 기준이 됩니다.',
  t: {
    in: 'horizon surface가 돌출되어 속성 맵이 됩니다.',
    hold: '공극률 → 투과도 → 포화도로 속성이 전환됩니다(같은 형태, 다른 색).',
    out: '맵 위로 유선(streamline)이 흐르고 배경이 다시 밝아지기 시작 — 상승.',
    persist: 'Field outline'
  }
}, {
  id: 'engineering',
  num: '07',
  label: 'Reservoir Engineering',
  sub: 'Simulation · Recovery',
  depth: 'Reservoir',
  bg: '#F6F8FB',
  dark: false,
  title: 'Optimizing flow and recovery.',
  kr: '동적 시뮬레이션으로 압력과 유체의 흐름을 예측하고, 주입·생산 전략을 비교해 회수율을 높입니다.',
  t: {
    in: '배경이 밝아지고 곡선이 시간 축을 따라 그려집니다.',
    hold: '시나리오(자연 생산 / 워터플러딩) 비교 토글.',
    out: '생산 곡선의 끝점이 생산 설비 사진으로 연결됩니다.',
    persist: 'Oil rate curve (blue)'
  }
}, {
  id: 'production',
  num: '08',
  label: 'Production',
  sub: 'Wells · Facilities · Operations',
  depth: '0 m',
  bg: '#FFFFFF',
  dark: false,
  title: 'Turning resources into energy.',
  kr: '생산정과 인공채유, 해상 생산설비를 통해 저류층 유체를 지표로 끌어올리고 분리·처리하여 출하합니다.',
  t: {
    in: '사진이 아래에서 올라오며 수면 위로 복귀. Depth ruler가 0 m로.',
    hold: '운영 지표가 순서대로 나타납니다.',
    out: '설비 사진이 축소되어 필드 전체 레이아웃 안의 한 지점이 됩니다.',
    persist: 'Sea level seam'
  }
}, {
  id: 'field',
  num: '09',
  label: 'Field Development',
  sub: 'Plan · Infrastructure · Production',
  depth: '0 m',
  bg: '#F6F8FB',
  dark: false,
  title: 'Connecting technology, people and the future.',
  kr: '지질·공학·시설·경제성을 하나의 개발 계획으로 통합합니다. 수십 년의 운영과 감축 목표까지 함께 설계합니다.',
  t: {
    in: '와이드 줌아웃으로 필드 전체가 보입니다.',
    hold: '—',
    out: '푸터로 이어지고 StageNav가 9/9 완료 상태가 됩니다.',
    persist: 'StageNav'
  }
}];
window.OGD_LINKS = [{
  id: 'journey',
  label: 'Journey'
}, {
  id: 'technology',
  label: 'Technology'
}, {
  id: 'resources',
  label: 'Resources'
}, {
  id: 'storyboard',
  label: 'Storyboard'
}, {
  id: 'system',
  label: 'Design System'
}];
window.OGD_GO = function (id) {
  const m = {
    home: 'index.html',
    journey: 'index.html',
    technology: 'Technical.html',
    storyboard: 'Storyboard.html',
    system: 'DesignSystem.html'
  };
  if (m[id]) location.href = m[id];
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "versions/v1/ui_kits/explorer/stages.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.TextLink = __ds_scope.TextLink;

__ds_ns.OptionChip = __ds_scope.OptionChip;

__ds_ns.UtilityCard = __ds_scope.UtilityCard;

__ds_ns.ArrowCTA = __ds_scope.ArrowCTA;

__ds_ns.DepthRuler = __ds_scope.DepthRuler;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

__ds_ns.StageNav = __ds_scope.StageNav;

__ds_ns.TechNav = __ds_scope.TechNav;

__ds_ns.TechViz = __ds_scope.TechViz;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.SearchInput = __ds_scope.SearchInput;

__ds_ns.GlobalNav = __ds_scope.GlobalNav;

__ds_ns.SubNav = __ds_scope.SubNav;

__ds_ns.MediaFrame = __ds_scope.MediaFrame;

__ds_ns.ProductTile = __ds_scope.ProductTile;

__ds_ns.QuoteCard = __ds_scope.QuoteCard;

__ds_ns.StickyBar = __ds_scope.StickyBar;

})();
