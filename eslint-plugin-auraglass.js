/**
 * ESLint Plugin: AuraGlass Discipline
 * 
 * Enforces unified glass design system patterns across the codebase.
 * Prevents hardcoded glass values that bypass our token system.
 */

module.exports = {
  rules: {
    'no-inline-glass': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Disallow inline glass styles that bypass the unified token system',
          category: 'Design System',
          recommended: true
        },
        fixable: 'code',
        schema: [
          {
            type: 'object',
            properties: {
              allowedFunctions: {
                type: 'array',
                items: { type: 'string' },
                default: ['createGlassStyle']
              }
            },
            additionalProperties: false
          }
        ],
        messages: {
          noInlineGlass: 'Inline glass styles are prohibited. Use createGlassStyle() from glassMixins instead.',
          noHardcodedGlass: 'Hardcoded glass values bypass our token system. Use createGlassStyle({{ intent: "{{intent}}", elevation: "{{elevation}}" }}).',
          noDeprecatedGlass: 'Deprecated glass function "{{function}}". Use createGlassStyle() instead.',
          noBackdropFilter: 'Direct backdrop-filter usage prohibited. Use createGlassStyle() with appropriate tier.',
          noGlassBackground: 'Direct glass background prohibited. Use createGlassStyle() with appropriate intent.',
        }
      },
      create(context) {
        const options = context.options[0] || {};
        const allowedFunctions = options.allowedFunctions || ['createGlassStyle'];
        
        // Glass-related CSS properties that should be managed by our token system
        const glassProperties = [
          'backdrop-filter',
          'backdropFilter',
          '-webkit-backdrop-filter',
          'WebkitBackdropFilter',
        ];
        
        // Deprecated glass functions
        const deprecatedGlassFunctions = [
          'glassBorder',
          'glassBorderHover',
          'glassSurface',
          'glassSurfaceHover',
          'glassSurfaceActive',
          'glassSurfaceFn',
          'glassSurfaceFunction',
          'interactiveGlass',
          'createInteractiveGlassVariants',
          'createRippleEffect',
          'createMagneticEffect',
          'glassButtonVariants',
          'createInteractiveStateStyles',
          'createAccessibleInteractiveStyles',
          'createTouchOptimizedStyles',
          'createGlassFoundation',
          'extendGlassFoundation',
          'injectGlassFoundation',
          'glassFoundationCSS',
          'validateGlassFoundation',
          'enhanceForStorybookMode',
          'createOptimizedGlassFoundation'
        ];
        
        // Glass-related background patterns
        const glassBackgroundPatterns = [
          /rgba\(\s*255,\s*255,\s*255,\s*0\.[0-9]+\s*\)/,  // rgba(255,255,255,0.x)
          /rgba\(\s*[0-9]+,\s*[0-9]+,\s*[0-9]+,\s*0\.[0-9]+\s*\)/  // General rgba with opacity
        ];
        
        // Blur patterns that suggest glass usage
        const glassBlurPatterns = [
          /blur\(\s*[0-9]+px\s*\)/,
          /blur\(\s*[0-9]+\s*\)/
        ];

        return {
          // Check object properties in style objects
          Property(node) {
            if (!node.key) return;
            
            const propertyName = node.key.type === 'Identifier' ? 
              node.key.name : 
              node.key.type === 'Literal' ? node.key.value : null;
              
            // Check for glass properties
            if (glassProperties.includes(propertyName)) {
              context.report({
                node,
                messageId: 'noBackdropFilter',
                fix(fixer) {
                  return fixer.replaceText(node, '// Use createGlassStyle() instead');
                }
              });
            }
            
            // Check for glass background values
            if (propertyName === 'background' || propertyName === 'backgroundColor') {
              if (node.value && node.value.type === 'Literal') {
                const value = node.value.value;
                if (typeof value === 'string') {
                  for (const pattern of glassBackgroundPatterns) {
                    if (pattern.test(value)) {
                      const intent = value.includes('255') ? 'neutral' : 'primary';
                      const elevation = parseFloat(value.match(/0\.([0-9]+)/)?.[1] || '2') > 15 ? 'level3' : 'level2';
                      
                      context.report({
                        node,
                        messageId: 'noGlassBackground',
                        fix(fixer) {
                          return fixer.replaceText(
                            node.value, 
                            `'/* Use createGlassStyle({ intent: "${intent}", elevation: "${elevation}" }) */'`
                          );
                        }
                      });
                      break;
                    }
                  }
                }
              }
            }
          },

          // Check function calls for deprecated glass functions
          CallExpression(node) {
            if (node.callee.type === 'Identifier') {
              const functionName = node.callee.name;
              
              if (deprecatedGlassFunctions.includes(functionName)) {
                context.report({
                  node,
                  messageId: 'noDeprecatedGlass',
                  data: { function: functionName },
                  fix(fixer) {
                    const replacementOptions = getFunctionReplacement(functionName);
                    return fixer.replaceText(node, `createGlassStyle(${replacementOptions})`);
                  }
                });
              }
            }
          },

          // Check member expressions for deprecated glass functions
          MemberExpression(node) {
            if (node.property && node.property.type === 'Identifier') {
              const propertyName = node.property.name;
              
              if (deprecatedGlassFunctions.includes(propertyName)) {
                context.report({
                  node,
                  messageId: 'noDeprecatedGlass',
                  data: { function: propertyName }
                });
              }
            }
          },

          // Check for hardcoded glass-like style objects
          ObjectExpression(node) {
            const properties = node.properties;
            let hasBackdropFilter = false;
            let hasGlassBackground = false;
            let hasGlassBorder = false;
            
            for (const prop of properties) {
              if (prop.type !== 'Property') continue;
              
              const key = prop.key.type === 'Identifier' ? prop.key.name : 
                         prop.key.type === 'Literal' ? prop.key.value : null;
              
              if (glassProperties.includes(key)) {
                hasBackdropFilter = true;
              }
              
              if (key === 'background' || key === 'backgroundColor') {
                const value = prop.value.type === 'Literal' ? prop.value.value : null;
                if (value && typeof value === 'string') {
                  for (const pattern of glassBackgroundPatterns) {
                    if (pattern.test(value)) {
                      hasGlassBackground = true;
                      break;
                    }
                  }
                }
              }
              
              if (key === 'border' && prop.value.type === 'Literal') {
                const value = prop.value.value;
                if (value && value.includes('rgba') && value.includes('255')) {
                  hasGlassBorder = true;
                }
              }
            }
            
            // If this looks like a glass style object, flag it
            if ((hasBackdropFilter && hasGlassBackground) || 
                (hasBackdropFilter && hasGlassBorder) ||
                (hasGlassBackground && hasGlassBorder)) {
              
              context.report({
                node,
                messageId: 'noInlineGlass',
                fix(fixer) {
                  return fixer.replaceText(node, 'createGlassStyle({ intent: "neutral", elevation: "level2" })');
                }
              });
            }
          }
        };
        
        function getFunctionReplacement(functionName) {
          const replacements = {
            'glassBorder': '{ intent: "neutral", elevation: "level2" }',
            'glassBorderHover': '{ intent: "neutral", elevation: "level3", interactive: true }',
            'glassSurface': '{ intent: "neutral", elevation: "level2" }',
            'glassSurfaceHover': '{ intent: "neutral", elevation: "level3", interactive: true }',
            'glassSurfaceActive': '{ intent: "neutral", elevation: "level1" }',
            'interactiveGlass': '{ intent: "neutral", elevation: "level2", interactive: true }',
            'createGlassFoundation': '{ intent: "neutral", elevation: "level2", tier: "high" }',
            'createOptimizedGlassFoundation': '{ intent: "neutral", elevation: "level2", tier: "low" }'
          };
          
          return replacements[functionName] || '{ intent: "neutral", elevation: "level2" }';
        }
      }
    },

    'require-glass-tokens': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Require using glass tokens instead of hardcoded values',
          category: 'Design System',
          recommended: true
        },
        schema: [],
        messages: {
          useGlassTokens: 'Use glass tokens from src/tokens/glass.ts instead of hardcoded values.',
        }
      },
      create(context) {
        return {
          ImportDeclaration(node) {
            // Flag imports from deprecated glass modules
            if (node.source && node.source.value) {
              const importPath = node.source.value;
              const deprecatedPaths = [
                './glassBorder',
                './glassSurface', 
                './interactiveGlass',
                './glassFoundation',
                '../foundation/glassFoundation',
                '../mixins/glassBorder',
                '../mixins/glassSurface',
                '../mixins/interactiveGlass'
              ];
              
              if (deprecatedPaths.some(path => importPath.includes(path))) {
                context.report({
                  node,
                  messageId: 'useGlassTokens',
                  fix(fixer) {
                    return fixer.replaceText(node.source, '"../mixins/glassMixins"');
                  }
                });
              }
            }
          }
        };
      }
    }
  }
};