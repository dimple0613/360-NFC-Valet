module.exports = function fontAliasPlugin({ types: t }) {
  const FONT_IMPORT = "@/theme";

  return {
    visitor: {
      ImportDeclaration(path) {
        if (path.hub?.file?.opts?.filename?.includes("node_modules")) return;
        const source = path.node.source.value;
        if (source !== "react-native") return;

        const specifiers = path.node.specifiers;
        const textSpecs = [];
        const otherSpecs = [];

        for (const spec of specifiers) {
          if (
            spec.type === "ImportSpecifier" &&
            spec.imported.type === "Identifier" &&
            (spec.imported.name === "Text" || spec.imported.name === "TextInput")
          ) {
            textSpecs.push(spec);
          } else {
            otherSpecs.push(spec);
          }
        }

        if (textSpecs.length === 0) return;

        if (otherSpecs.length > 0) {
          path.node.specifiers = otherSpecs;
        } else {
          path.remove();
        }

        const fontImport = t.importDeclaration(
          textSpecs.map((spec) =>
            t.importSpecifier(
              t.identifier(spec.local.name),
              t.identifier(spec.imported.name),
            ),
          ),
          t.stringLiteral(FONT_IMPORT),
        );

        path.insertAfter(fontImport);
      },
    },
  };
};
