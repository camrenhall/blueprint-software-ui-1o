import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Search,
  Bot,
  Link,
  Users,
  CreditCard,
  Bell,
  Globe,
  Eye,
  Lock,
  Brain,
  FileText,
  Database,
  Zap,
  X,
} from "lucide-react";

interface SettingsProps {
  onClose?: () => void;
}

export default function Settings({ onClose }: SettingsProps) {
  const [activeTab, setActiveTab] = useState("general");
  const [isVisible, setIsVisible] = useState(true);

  // Settings state
  const [settings, setSettings] = useState({
    // General
    emailNotifications: true,
    desktopNotifications: false,
    language: "en",
    theme: "system",
    timezone: "America/New_York",
    
    // Security & Privacy
    twoFactorAuth: true,
    sessionTimeout: 30,
    dataRetention: 365,
    auditLogging: true,
    ssoEnabled: false,
    
    // Discovery
    defaultSearchType: "fuzzy",
    autoClassification: true,
    confidenceThreshold: 0.85,
    batchSize: 100,
    maxFileSize: 100,
    
    // Automation & AI
    aiAssistance: true,
    autoProcessing: true,
    agentIntervention: 0.7,
    reviewQueueSize: 25,
    priorityScoring: true,
    
    // Integration
    exportFormat: "pdf",
    apiRateLimit: 1000,
    webhooksEnabled: true,
    cloudStorage: "aws",
    
    // Team
    defaultUserRole: "reviewer",
    shareByDefault: false,
    collaborationMode: "real-time",
    maxTeamSize: 50,
    
    // Billing
    usageAlerts: true,
    alertThreshold: 80,
    autoRenewal: true,
    billingCycle: "monthly",
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    description, 
    children 
  }: { 
    icon: any, 
    title: string, 
    description: string, 
    children: React.ReactNode 
  }) => (
    <div className="flex items-start justify-between p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-start space-x-3 flex-1">
        <div className="p-2 rounded-lg bg-[#99C0F0]/20 border border-[#99C0F0]/30">
          <Icon className="w-4 h-4 text-[#0E315C]/80" />
        </div>
        <div className="flex-1 space-y-1">
          <h4 className="text-sm font-medium text-[#0E315C]/90">{title}</h4>
          <p className="text-xs text-[#0E315C]/60">{description}</p>
        </div>
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );

  return (
    <div className={cn(
      "w-full h-full flex flex-col transition-all duration-500",
      isVisible ? "opacity-100" : "opacity-0"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#99C0F0]/20 to-[#C5BFEE]/20 backdrop-blur-sm border border-white/20">
            <SettingsIcon className="w-6 h-6 text-[#0E315C]/80" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#0E315C]/90">Settings</h1>
            <p className="text-sm text-[#0E315C]/60">Manage your Luceron AI preferences</p>
          </div>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <X className="w-4 h-4 text-[#0E315C]/70" />
          </Button>
        )}
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="general" className="text-xs">
              <User className="w-3 h-3 mr-1" />
              General
            </TabsTrigger>
            <TabsTrigger value="security" className="text-xs">
              <Shield className="w-3 h-3 mr-1" />
              Security
            </TabsTrigger>
            <TabsTrigger value="discovery" className="text-xs">
              <Search className="w-3 h-3 mr-1" />
              Discovery
            </TabsTrigger>
            <TabsTrigger value="automation" className="text-xs">
              <Bot className="w-3 h-3 mr-1" />
              AI & Auto
            </TabsTrigger>
            <TabsTrigger value="integration" className="text-xs">
              <Link className="w-3 h-3 mr-1" />
              Integration
            </TabsTrigger>
            <TabsTrigger value="team" className="text-xs">
              <Users className="w-3 h-3 mr-1" />
              Team
            </TabsTrigger>
            <TabsTrigger value="billing" className="text-xs">
              <CreditCard className="w-3 h-3 mr-1" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-4 mt-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-[#0E315C]/90 flex items-center">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </CardTitle>
                <CardDescription className="text-[#0E315C]/60">
                  Control how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SettingItem
                  icon={Bell}
                  title="Email Notifications"
                  description="Receive updates and alerts via email"
                >
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </SettingItem>
                <SettingItem
                  icon={Bell}
                  title="Desktop Notifications"
                  description="Show system notifications in your browser"
                >
                  <Switch
                    checked={settings.desktopNotifications}
                    onCheckedChange={(checked) => updateSetting('desktopNotifications', checked)}
                  />
                </SettingItem>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-[#0E315C]/90 flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  Preferences
                </CardTitle>
                <CardDescription className="text-[#0E315C]/60">
                  Customize your interface and locale settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SettingItem
                  icon={Globe}
                  title="Language"
                  description="Select your preferred language"
                >
                  <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
                    <SelectTrigger className="w-48 bg-white/10 border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/90 backdrop-blur-xl border-white/20">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingItem>
                <SettingItem
                  icon={Eye}
                  title="Theme"
                  description="Choose your interface appearance"
                >
                  <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                    <SelectTrigger className="w-48 bg-white/10 border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/90 backdrop-blur-xl border-white/20">
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingItem>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-4 mt-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-[#0E315C]/90 flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Authentication
                </CardTitle>
                <CardDescription className="text-[#0E315C]/60">
                  Secure your account and control access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SettingItem
                  icon={Shield}
                  title="Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                >
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => updateSetting('twoFactorAuth', checked)}
                    />
                    {settings.twoFactorAuth && (
                      <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
                        Enabled
                      </Badge>
                    )}
                  </div>
                </SettingItem>
                <SettingItem
                  icon={Lock}
                  title="Session Timeout"
                  description="Automatically log out after inactivity (minutes)"
                >
                  <div className="w-48 space-y-2">
                    <Slider
                      value={[settings.sessionTimeout]}
                      onValueChange={(value) => updateSetting('sessionTimeout', value[0])}
                      max={120}
                      min={5}
                      step={5}
                      className="w-full"
                    />
                    <div className="text-xs text-[#0E315C]/60 text-center">
                      {settings.sessionTimeout} minutes
                    </div>
                  </div>
                </SettingItem>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-[#0E315C]/90 flex items-center">
                  <Database className="w-4 h-4 mr-2" />
                  Data Protection
                </CardTitle>
                <CardDescription className="text-[#0E315C]/60">
                  Manage data retention and audit settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SettingItem
                  icon={FileText}
                  title="Data Retention Period"
                  description="How long to retain case data (days)"
                >
                  <Select 
                    value={settings.dataRetention.toString()} 
                    onValueChange={(value) => updateSetting('dataRetention', parseInt(value))}
                  >
                    <SelectTrigger className="w-48 bg-white/10 border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/90 backdrop-blur-xl border-white/20">
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="180">180 Days</SelectItem>
                      <SelectItem value="365">1 Year</SelectItem>
                      <SelectItem value="1095">3 Years</SelectItem>
                      <SelectItem value="1825">5 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingItem>
                <SettingItem
                  icon={Eye}
                  title="Audit Logging"
                  description="Track all user actions and system events"
                >
                  <Switch
                    checked={settings.auditLogging}
                    onCheckedChange={(checked) => updateSetting('auditLogging', checked)}
                  />
                </SettingItem>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Discovery Settings */}
          <TabsContent value="discovery" className="space-y-4 mt-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-[#0E315C]/90 flex items-center">
                  <Search className="w-4 h-4 mr-2" />
                  Search & Analysis
                </CardTitle>
                <CardDescription className="text-[#0E315C]/60">
                  Configure default discovery parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SettingItem
                  icon={Search}
                  title="Default Search Type"
                  description="Primary search algorithm for document analysis"
                >
                  <Select value={settings.defaultSearchType} onValueChange={(value) => updateSetting('defaultSearchType', value)}>
                    <SelectTrigger className="w-48 bg-white/10 border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/90 backdrop-blur-xl border-white/20">
                      <SelectItem value="exact">Exact Match</SelectItem>
                      <SelectItem value="fuzzy">Fuzzy Search</SelectItem>
                      <SelectItem value="semantic">Semantic Search</SelectItem>
                      <SelectItem value="hybrid">Hybrid (Recommended)</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingItem>
                <SettingItem
                  icon={Brain}
                  title="Auto-Classification"
                  description="Automatically categorize documents using AI"
                >
                  <Switch
                    checked={settings.autoClassification}
                    onCheckedChange={(checked) => updateSetting('autoClassification', checked)}
                  />
                </SettingItem>
                <SettingItem
                  icon={Zap}
                  title="Confidence Threshold"
                  description="Minimum confidence for automated decisions"
                >
                  <div className="w-48 space-y-2">
                    <Slider
                      value={[settings.confidenceThreshold * 100]}
                      onValueChange={(value) => updateSetting('confidenceThreshold', value[0] / 100)}
                      max={95}
                      min={50}
                      step={5}
                      className="w-full"
                    />
                    <div className="text-xs text-[#0E315C]/60 text-center">
                      {(settings.confidenceThreshold * 100).toFixed(0)}%
                    </div>
                  </div>
                </SettingItem>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Automation Settings */}
          <TabsContent value="automation" className="space-y-4 mt-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-[#0E315C]/90 flex items-center">
                  <Bot className="w-4 h-4 mr-2" />
                  AI Assistant
                </CardTitle>
                <CardDescription className="text-[#0E315C]/60">
                  Configure AI behavior and automation settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SettingItem
                  icon={Bot}
                  title="AI Assistance"
                  description="Enable AI-powered document analysis and suggestions"
                >
                  <Switch
                    checked={settings.aiAssistance}
                    onCheckedChange={(checked) => updateSetting('aiAssistance', checked)}
                  />
                </SettingItem>
                <SettingItem
                  icon={Zap}
                  title="Auto-Processing"
                  description="Automatically process documents upon upload"
                >
                  <Switch
                    checked={settings.autoProcessing}
                    onCheckedChange={(checked) => updateSetting('autoProcessing', checked)}
                  />
                </SettingItem>
                <SettingItem
                  icon={Eye}
                  title="Agent Intervention Threshold"
                  description="When to require human review"
                >
                  <div className="w-48 space-y-2">
                    <Slider
                      value={[settings.agentIntervention * 100]}
                      onValueChange={(value) => updateSetting('agentIntervention', value[0] / 100)}
                      max={95}
                      min={50}
                      step={5}
                      className="w-full"
                    />
                    <div className="text-xs text-[#0E315C]/60 text-center">
                      {(settings.agentIntervention * 100).toFixed(0)}%
                    </div>
                  </div>
                </SettingItem>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integration Settings */}
          <TabsContent value="integration" className="space-y-4 mt-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-[#0E315C]/90 flex items-center">
                  <Link className="w-4 h-4 mr-2" />
                  External Systems
                </CardTitle>
                <CardDescription className="text-[#0E315C]/60">
                  Manage connections to third-party services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SettingItem
                  icon={FileText}
                  title="Default Export Format"
                  description="Preferred format for document exports"
                >
                  <Select value={settings.exportFormat} onValueChange={(value) => updateSetting('exportFormat', value)}>
                    <SelectTrigger className="w-48 bg-white/10 border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/90 backdrop-blur-xl border-white/20">
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="docx">Microsoft Word</SelectItem>
                      <SelectItem value="xlsx">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV Data</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingItem>
                <SettingItem
                  icon={Database}
                  title="Cloud Storage Provider"
                  description="Primary cloud storage for case files"
                >
                  <Select value={settings.cloudStorage} onValueChange={(value) => updateSetting('cloudStorage', value)}>
                    <SelectTrigger className="w-48 bg-white/10 border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/90 backdrop-blur-xl border-white/20">
                      <SelectItem value="aws">Amazon S3</SelectItem>
                      <SelectItem value="azure">Microsoft Azure</SelectItem>
                      <SelectItem value="gcp">Google Cloud</SelectItem>
                      <SelectItem value="box">Box</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingItem>
                <SettingItem
                  icon={Zap}
                  title="Webhooks"
                  description="Enable real-time notifications to external systems"
                >
                  <Switch
                    checked={settings.webhooksEnabled}
                    onCheckedChange={(checked) => updateSetting('webhooksEnabled', checked)}
                  />
                </SettingItem>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Settings */}
          <TabsContent value="team" className="space-y-4 mt-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-[#0E315C]/90 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Collaboration
                </CardTitle>
                <CardDescription className="text-[#0E315C]/60">
                  Manage team access and sharing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SettingItem
                  icon={User}
                  title="Default User Role"
                  description="Role assigned to new team members"
                >
                  <Select value={settings.defaultUserRole} onValueChange={(value) => updateSetting('defaultUserRole', value)}>
                    <SelectTrigger className="w-48 bg-white/10 border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/90 backdrop-blur-xl border-white/20">
                      <SelectItem value="viewer">Viewer</SelectItem>
                      <SelectItem value="reviewer">Reviewer</SelectItem>
                      <SelectItem value="analyst">Analyst</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingItem>
                <SettingItem
                  icon={Users}
                  title="Collaboration Mode"
                  description="How team members work together"
                >
                  <Select value={settings.collaborationMode} onValueChange={(value) => updateSetting('collaborationMode', value)}>
                    <SelectTrigger className="w-48 bg-white/10 border-white/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white/90 backdrop-blur-xl border-white/20">
                      <SelectItem value="real-time">Real-time</SelectItem>
                      <SelectItem value="async">Asynchronous</SelectItem>
                      <SelectItem value="review-based">Review-based</SelectItem>
                    </SelectContent>
                  </Select>
                </SettingItem>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Settings */}
          <TabsContent value="billing" className="space-y-4 mt-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-[#0E315C]/90 flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Usage & Billing
                </CardTitle>
                <CardDescription className="text-[#0E315C]/60">
                  Monitor usage and manage billing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SettingItem
                  icon={Bell}
                  title="Usage Alerts"
                  description="Get notified when approaching usage limits"
                >
                  <Switch
                    checked={settings.usageAlerts}
                    onCheckedChange={(checked) => updateSetting('usageAlerts', checked)}
                  />
                </SettingItem>
                <SettingItem
                  icon={Zap}
                  title="Alert Threshold"
                  description="Send alert when usage reaches percentage"
                >
                  <div className="w-48 space-y-2">
                    <Slider
                      value={[settings.alertThreshold]}
                      onValueChange={(value) => updateSetting('alertThreshold', value[0])}
                      max={95}
                      min={50}
                      step={5}
                      className="w-full"
                    />
                    <div className="text-xs text-[#0E315C]/60 text-center">
                      {settings.alertThreshold}%
                    </div>
                  </div>
                </SettingItem>
                <SettingItem
                  icon={CreditCard}
                  title="Auto-Renewal"
                  description="Automatically renew subscription"
                >
                  <Switch
                    checked={settings.autoRenewal}
                    onCheckedChange={(checked) => updateSetting('autoRenewal', checked)}
                  />
                </SettingItem>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-white/10 mt-6">
        <Button className="bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] hover:from-[#99C0F0]/80 hover:to-[#C5BFEE]/80 text-white">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
