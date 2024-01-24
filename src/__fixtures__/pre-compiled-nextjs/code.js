"use strict";
(exports.id = 885),
  (exports.ids = [885, 26456]),
  (exports.modules = {
    359692: (e, t, n) => {
      let I = (e) => {
        let { strictLocalize: t } = (0, i.Pi)(),
          {
            backgroundColor: n = o.QY.surface.subdued,
            content: E,
            contentColor: _ = o.QY.text.default,
            notificationDot: a,
          } = e,
          l = t({
            id: "J8xC2I",
            defaultMessage: [{ type: 0, value: "with notification" }],
          });
        return (0, r.jsxs)(A, {
          backgroundColor: n,
          contentColor: _,
          "data-test-id": e["data-test-id"],
          className: e.className,
          children: [
            E > 99 ? "99+" : E,
            a
              ? (0, r.jsxs)(r.Fragment, {
                  children: [
                    (0, r.jsx)(R, { children: l }),
                    (0, r.jsx)(T, { children: (0, r.jsx)(O.P, {}) }),
                  ],
                })
              : null,
          ],
        });
      };
    },
    200077: (t, e, i) => {
      let f = class extends m.Component {
        constructor(t) {
          super(t),
            (this.updateCustomOptionReaction = (0, h.reaction)(
              () => this.props.value,
              (t) => {
                !this.isValueInOptions(t) &&
                  this.props.shouldUseCustomOption &&
                  ((this.customOption.value = t),
                  (this.customOption.label = this.customOptionLabel),
                  (this.hasEditedCustomOption = !0));
              }
            )),
            (this.customQuantitySelection = !1),
            (this.hasEditedCustomOption = !1),
            (this.customOption = {
              value: "",
              label: this.props.strictLocalize({
                id: "dhKCUV",
                defaultMessage: [{ type: 0, value: "Custom Quantity" }],
              }),
            });
        }
      };
    },
  });
