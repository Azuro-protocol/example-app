.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  /* optional background/border */
  /* background: var(--bg); */
}

/* left side placeholder */
.left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* CTA button styling */
.ctaButton {
  display: inline-flex;            /* ensures logo + text are inline and aligned */
  align-items: center;             /* vertical center */
  gap: 0.5rem;                     /* spacing between logo and text */
  padding: 0.5rem 0.9rem;
  border-radius: 8px;
  border: none;
  background: #0b74ff;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1;
}

/* remove unwanted default button outline on mouse click but keep keyboard focus */
.ctaButton:focus {
  outline: 3px solid rgba(11, 116, 255, 0.2);
  outline-offset: 2px;
}

/* logo wrapper to control size and override any svg transform that might misalign */
.logoWrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;      /* fixed width */
  height: 24px;     /* fixed height */
  flex: 0 0 24px;   /* do not grow/shrink */
  line-height: 0;   /* avoid descender whitespace */
}

/* Ensure svg inside behaves: removes transforms and forces it to fit the wrapper */
.logoWrap svg {
  display: block;            /* remove inline SVG baseline gaps */
  width: 100% !important;
  height: 100% !important;
  max-width: none;
  max-height: none;
  transform: none !important; /* clear any transform from svg that shifts it */
  margin: 0;
  vertical-align: middle;
}

/* text */
.buttonText {
  display: inline-block;
}

/* Example responsive tweak: smaller button on small screens */
@media (max-width: 480px) {
  .ctaButton {
    padding: 0.4rem 0.6rem;
    gap: 0.4rem;
  }
  .logoWrap {
    width: 20px;
    height: 20px;
    flex: 0 0 20px;
  }
}
