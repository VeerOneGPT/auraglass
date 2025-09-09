// Typography tokens available via typography.css (imported in index.css)
import React, { forwardRef, useState } from 'react';
import styled from 'styled-components';

import { createGlassStyle } from '../../core/mixins/glassMixins';
import { GlassAlert as Alert } from '../data-display/GlassAlert';
import { GlassAvatar as Avatar } from '../data-display/GlassAvatar';
import { GlassBadge as Badge } from '../data-display/GlassBadge';
import { Box } from '../layout/Box';
import { GlassButton as Button } from '../button';
import { GlassCard as Card } from '../card';
import { GlassCheckbox as Checkbox } from '../input/GlassCheckbox';
import { GlassMetricChip as Chip } from '../data-display/GlassMetricChip';
import { GlassProgress as Progress } from '../data-display/GlassProgress';
import { GlassRadioGroup as Radio } from '../input/GlassRadioGroup';
import { GlassSelect as Select } from '../input/GlassSelect';
import { GlassSlider as Slider } from '../input/GlassSlider';
import { GlassSwitch as Switch } from '../input/GlassSwitch';
import { GlassTabs as Tabs, GlassTabsContent as TabsContent, GlassTabsList, GlassTabsTrigger } from '../navigation/GlassTabs';
import { GlassInput as TextField } from '../input/GlassInput';
import { Typography } from '../data-display/Typography';

import { GlassThemeSwitcher } from './GlassThemeSwitcher';
import { CursorGlow } from './CursorGlow';
import { GlassThemeDemoProps } from './types';

// Styled components
const StyledDemo = styled.div<{
  $glassIntensity: number;
  $minimal: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: ${({ $minimal }) => ($minimal ? '1rem' : '2rem')};
  border-radius: 12px;
  width: 100%;

  ${({ theme }) => ({
    ...createGlassStyle({
      intent: 'neutral',
      elevation: 'level2',
      tier: 'high'
    }),
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(8px)',
  })}

  ${({ theme }) => ({
    ...createGlassStyle({
      intent: 'neutral',
      elevation: 'level1',
      tier: 'high'
    }),
    border: '1px solid ${glassStyles.borderColor || "rgba(255, 255, 255, 0.3)"}',
  })}
`;

const Header = styled.header`
  margin-bottom: 1rem;
`;

const DemoSection = styled.section`
  margin-top: 1.5rem;
`;

const ComponentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const ComponentCard = styled(Card)`
  padding: 1.25rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ComponentTitle = styled(Typography)`
  margin-bottom: 1rem;
  font-weight: var(--typography-subheading-weight);
`;

const CodePreview = styled.pre`
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 0.75rem;
  font-family: 'Consolas', 'Monaco', 'Andale Mono', monospace;
  font-size: 0.85rem;
  overflow: auto;
  margin-top: 1rem;
`;

// Categories of components to showcase
const COMPONENT_CATEGORIES = {
  inputs: 'Input Components',
  feedback: 'Feedback Components',
  layout: 'Layout Components',
  navigation: 'Navigation Components',
  display: 'Display Components',
};

/**
 * A comprehensive theme demo component to showcase themed Glass UI components
 */
export const GlassThemeDemo = forwardRef<HTMLDivElement, GlassThemeDemoProps>(
  (
    {
      title = 'Glass UI Theme Demo',
      description = 'Explore different theme options and see how components adapt to theme changes.',
      showThemeSwitcher = true,
      showExamples = true,
      customExamples,
      glassIntensity = 0.7,
      className,
      style,
      header,
      footer,
      showPerformanceMetrics = false,
      useTabs = true,
      showCode = false,
      interactive = true,
      includedCategories = Object.keys(COMPONENT_CATEGORIES),
      minimal = false,
      ...rest
    }: GlassThemeDemoProps,
    ref
  ) => {
    const [activeTab, setActiveTab] = useState(0);

    // Example components by category
    const categoryExamples = {
      inputs: (
        <ComponentGrid>
          <ComponentCard>
            <ComponentTitle variant="h6">Button</ComponentTitle>
            <Box style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Button variant="primary">Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </Box>
            {showCode && (
              <CodePreview>
                {`<Button variant="contained">Contained</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="text">Text</Button>`}
              </CodePreview>
            )}
          </ComponentCard>

          <ComponentCard>
            <ComponentTitle variant="h6">Text Field</ComponentTitle>
            <Box style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <TextField placeholder="Standard" />
              <TextField placeholder="With placeholder" />
              <TextField placeholder="Disabled" disabled />
            </Box>
            {showCode && (
              <CodePreview>
                {`<TextField label="Standard" />
<TextField label="With placeholder" placeholder="Type here..." />
<TextField label="Disabled" disabled />`}
              </CodePreview>
            )}
          </ComponentCard>

          <ComponentCard>
            <ComponentTitle variant="h6">Select</ComponentTitle>
            <Select
              placeholder="Select Option"
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' },
              ]}
            />
            {showCode && (
              <CodePreview>
                {`<Select
  label="Select Option"
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]}
/>`}
              </CodePreview>
            )}
          </ComponentCard>

          <ComponentCard>
            <ComponentTitle variant="h6">Checkbox & Radio</ComponentTitle>
            <Box style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Checkbox label="Checkbox Option" />
              <Radio options={[{ value: 'radio1', label: 'Radio Option' }]} />
              <Switch label="Switch Option" />
            </Box>
            {showCode && (
              <CodePreview>
                {`<Checkbox label="Checkbox Option" />
<Radio label="Radio Option" name="radio-group" />
<Switch label="Switch Option" />`}
              </CodePreview>
            )}
          </ComponentCard>

          <ComponentCard>
            <ComponentTitle variant="h6">Slider</ComponentTitle>
            <Slider defaultValue={50} aria-label="Slider" />
            {showCode && (
              <CodePreview>{`<Slider defaultValue={50} aria-label="Slider" />`}</CodePreview>
            )}
          </ComponentCard>
        </ComponentGrid>
      ),

      feedback: (
        <ComponentGrid>
          <ComponentCard>
            <ComponentTitle variant="h6">Alert</ComponentTitle>
            <Box style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Alert variant="info">Info message</Alert>
              <Alert variant="success">Success message</Alert>
              <Alert variant="warning">Warning message</Alert>
              <Alert variant="error">Error message</Alert>
            </Box>
            {showCode && (
              <CodePreview>
                {`<Alert severity="info">Info message</Alert>
<Alert severity="success">Success message</Alert>
<Alert severity="warning">Warning message</Alert>
<Alert severity="error">Error message</Alert>`}
              </CodePreview>
            )}
          </ComponentCard>

          <ComponentCard>
            <ComponentTitle variant="h6">Progress</ComponentTitle>
            <Box style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Progress variant="primary" value={75} />
              <Progress variant="gradient" indeterminate />
            </Box>
            {showCode && (
              <CodePreview>
                {`<Progress variant="determinate" value={75} />
<Progress variant="indeterminate" />`}
              </CodePreview>
            )}
          </ComponentCard>

          <ComponentCard>
            <ComponentTitle variant="h6">Badge</ComponentTitle>
            <Box style={{ display: 'flex', gap: '16px' }}>
              <Badge content="4">
                <Button>Messages</Button>
              </Badge>
              <Badge content="New" variant="destructive">
                <Button>Updates</Button>
              </Badge>
            </Box>
            {showCode && (
              <CodePreview>
                {`<Badge content={4}>
  <Button>Messages</Button>
</Badge>
<Badge content="New" color="error">
  <Button>Updates</Button>
</Badge>`}
              </CodePreview>
            )}
          </ComponentCard>
        </ComponentGrid>
      ),

      layout: (
        <ComponentGrid>
          <ComponentCard>
            <ComponentTitle variant="h6">Card</ComponentTitle>
            <Card>
              <Box style={{ padding: '16px' }}>
                <Typography variant="h4">Card Title</Typography>
                <Typography variant="p">Card content with text</Typography>
                <Box style={{ marginTop: '16px' }}>
                  <Button size="sm">Action</Button>
                </Box>
              </Box>
            </Card>
            {showCode && (
              <CodePreview>
                {`<Card>
  <Box p={2}>
    <Typography variant="h6">Card Title</Typography>
    <Typography variant="body2">Card content with text</Typography>
    <Box mt={2}>
      <Button size="small">Action</Button>
    </Box>
  </Box>
</Card>`}
              </CodePreview>
            )}
          </ComponentCard>

          <ComponentCard>
            <ComponentTitle variant="h6">Paper Card</ComponentTitle>
            <Card>
              <Box style={{ padding: '16px' }}>
                <Typography>Paper Component</Typography>
              </Box>
            </Card>
            {showCode && (
              <CodePreview>
                {`<Paper elevation={'level2'}>
  <Box p={2}>
    <Typography>Paper Component</Typography>
  </Box>
</Paper>`}
              </CodePreview>
            )}
          </ComponentCard>

          <ComponentCard>
            <ComponentTitle variant="h6">Box Layout</ComponentTitle>
            <Box>
              <Typography>Above divider</Typography>
              <Box style={{ marginTop: '16px', marginBottom: '16px', borderTop: '1px solid rgba(0,0,0,0.1)' }} />
              <Typography>Below divider</Typography>
            </Box>
            {showCode && (
              <CodePreview>
                {`<Typography>Above divider</Typography>
<Divider style={{ marginTop: '16px', marginBottom: '16px' }} />
<Typography>Below divider</Typography>`}
              </CodePreview>
            )}
          </ComponentCard>
        </ComponentGrid>
      ),

      navigation: (
        <ComponentGrid>
          <ComponentCard>
            <ComponentTitle variant="h6">Tabs</ComponentTitle>
            <Tabs defaultValue="tab1">
              <GlassTabsList>
                <GlassTabsTrigger value="tab1">Tab 1</GlassTabsTrigger>
                <GlassTabsTrigger value="tab2">Tab 2</GlassTabsTrigger>
                <GlassTabsTrigger value="tab3">Tab 3</GlassTabsTrigger>
              </GlassTabsList>
              <TabsContent value="tab1">Tab 1 Content</TabsContent>
              <TabsContent value="tab2">Tab 2 Content</TabsContent>
              <TabsContent value="tab3">Tab 3 Content</TabsContent>
            </Tabs>
            {showCode && (
              <CodePreview>
                {`<Tabs value={0}>
   <TabPanel value={0} index={0}>Tab 1 Content</TabPanel>
   <TabPanel value={0} index={1}>Tab 2 Content</TabPanel>
   <TabPanel value={0} index={2}>Tab 3 Content</TabPanel>
</Tabs>`}
              </CodePreview>
            )}
          </ComponentCard>
        </ComponentGrid>
      ),

      display: (
        <ComponentGrid>
          <ComponentCard>
            <ComponentTitle variant="h6">Typography</ComponentTitle>
            <Box style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Typography variant="h3">Heading 3</Typography>
              <Typography variant="h5">Heading 5</Typography>
              <Typography variant="h6">Subtitle 1</Typography>
              <Typography variant="p">Body 1 text</Typography>
              <Typography variant="span">Body 2 text</Typography>
              <Typography variant="p">Caption text</Typography>
            </Box>
            {showCode && (
              <CodePreview>
                {`<Typography variant="h3">Heading 3</Typography>
<Typography variant="h5">Heading 5</Typography>
<Typography variant="subtitle1">Subtitle 1</Typography>
<Typography variant="body1">Body 1 text</Typography>
<Typography variant="body2">Body 2 text</Typography>
<Typography variant="caption">Caption text</Typography>`}
              </CodePreview>
            )}
          </ComponentCard>

          <ComponentCard>
            <ComponentTitle variant="h6">Chip</ComponentTitle>
            <Box style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Chip label="Basic" value="10" />
              <Chip label="Success" value="5" intent="success" />
              <Chip label="Warning" value="3" intent="warning" />
              <Chip label="Danger" value="1" intent="danger" />
            </Box>
            {showCode && (
              <CodePreview>
                {`<Chip label="Basic" />
<Chip label="Clickable" onClick={() => {}} />
<Chip label="Deletable" onDelete={() => {}} />
<Chip label="With Avatar">`}
              </CodePreview>
            )}
          </ComponentCard>

          <ComponentCard>
            <ComponentTitle variant="h6">Avatar</ComponentTitle>
            <Box style={{ display: 'flex', gap: '8px' }}>
              <Avatar>A</Avatar>
              <Avatar>B</Avatar>
              <Avatar alt="User" />
            </Box>
            {showCode && (
              <CodePreview>
                {`<Avatar>A</Avatar>
<Avatar color="primary">B</Avatar>
<Avatar alt="User" />`}
              </CodePreview>
            )}
          </ComponentCard>
        </ComponentGrid>
      ),
    };

    // Filter categories based on includedCategories prop
    const filteredCategories = Object.entries(COMPONENT_CATEGORIES)
      .filter(([key]) => includedCategories.includes(key))
      .map(([key, label]) => ({ key, label }));

    return (
      <StyledDemo
        ref={ref}
        className={className}
        style={style}
        $glassIntensity={glassIntensity}
        $minimal={minimal}
        {...rest}
      >
        {/* Local cursor glow overlay for theme showcase */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden>
          <CursorGlow global={false} size={280} opacity={0.14} intensity={0.6} />
        </div>

        {/* Custom header or default header */}
        <Header>
          {header || (
            <>
              <Typography variant="h4" style={{ marginBottom: '8px' }}>
                {title}
              </Typography>
              {typeof description === 'string' ? (
                <Typography variant="p">{description}</Typography>
              ) : (
                description
              )}
            </>
          )}
        </Header>

        {/* Theme switcher */}
        {showThemeSwitcher && (
          <DemoSection>
            <GlassThemeSwitcher compact={minimal} themes={[]} />
          </DemoSection>
        )}

        {/* Component examples */}
        {showExamples && (
          <DemoSection>
            {useTabs && filteredCategories.length > 1 ? (
              <>
                <Tabs defaultValue={filteredCategories[0]?.key}>
                  <GlassTabsList>
                    {filteredCategories.map(({ key, label }) => (
                      <GlassTabsTrigger key={key} value={key}>
                        {label}
                      </GlassTabsTrigger>
                    ))}
                  </GlassTabsList>
                  {filteredCategories.map(({ key, label }) => (
                    <TabsContent key={key} value={key}>
                      {categoryExamples[key as keyof typeof categoryExamples]}
                    </TabsContent>
                  ))}
                </Tabs>
              </>
            ) : (
              // Show all categories without tabs
              <>
                {filteredCategories.map(({ key, label }) => (
                  <Box key={key} style={{ marginTop: '12px', marginBottom: '8px' }}>
                    <Typography variant="h5" style={{ marginBottom: '16px' }}>
                      {label}
                    </Typography>
                    {categoryExamples[key as keyof typeof categoryExamples]}
                  </Box>
                ))}
              </>
            )}
          </DemoSection>
        )}

        {/* Custom examples */}
        {customExamples && (
          <DemoSection>
            <Typography variant="h5" style={{ marginBottom: '16px' }}>
              Custom Examples
            </Typography>
            {customExamples}
          </DemoSection>
        )}

        {/* Performance metrics */}
        {showPerformanceMetrics && (
          <DemoSection>
            <Typography variant="h5" style={{ marginBottom: '16px' }}>
              Performance Metrics
            </Typography>
            <Card>
              <Box style={{ padding: '16px' }}>
                <Typography>Theme performance metrics and optimization data</Typography>
              </Box>
            </Card>
          </DemoSection>
        )}

        {/* Footer */}
        {footer && (
          <Box style={{ marginTop: 'auto', paddingTop: '8px' }}>
            {footer}
          </Box>
        )}
      </StyledDemo>
    );
  }
);

GlassThemeDemo.displayName = 'GlassThemeDemo';
