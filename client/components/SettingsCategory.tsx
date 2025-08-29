import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  ArrowLeft,
} from "lucide-react";

export default function SettingsCategory() {
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    // Fade in animation
    setTimeout(() => setIsVisible(true), 200);
  }, []);

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
    <div className="flex items-start justify-between p-6 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 hover:bg-white/30 hover:border-white/30 transition-all duration-300 group">
      <div className="flex items-start space-x-4 flex-1">
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#99C0F0]/30 to-[#C5BFEE]/20 border border-white/20 group-hover:shadow-lg transition-all duration-300">
          <Icon className="w-5 h-5 text-[#0E315C]/80" />
        </div>
        <div className="flex-1 space-y-2">
          <h4 className="text-base font-light text-[#0E315C]/90">{title}</h4>
          <p className="text-sm text-[#0E315C]/60 leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="flex-shrink-0 ml-4">{children}</div>
    </div>
  );

  const getCategoryInfo = (cat: string) => {
    switch (cat) {
      case "general":
        return {
          title: "General Settings",
          description: "Account preferences, notifications, and basic settings",
          icon: User,
        };
      case "security":
        return {
          title: "Security & Privacy",
          description: "Authentication, data protection, and audit settings",
          icon: Shield,
        };
      case "discovery":
        return {
          title: "Discovery Settings",
          description: "Search algorithms, document analysis, and classification",
          icon: Search,
        };
      case "automation":
        return {
          title: "AI & Automation",
          description: "AI assistant behavior and automated processing settings",
          icon: Bot,
        };
      case "integration":
        return {
          title: "Integration Settings",
          description: "External systems, exports, and third-party connections",
          icon: Link,
        };
      case "team":
        return {
          title: "Team & Collaboration",
          description: "User roles, permissions, and collaboration settings",
          icon: Users,
        };
      case "billing":
        return {
          title: "Usage & Billing",
          description: "Subscription management, usage monitoring, and billing",
          icon: CreditCard,
        };
      default:
        return {
          title: "Settings",
          description: "Manage your Luceron AI preferences",
          icon: SettingsIcon,
        };
    }
  };

  const categoryInfo = getCategoryInfo(category || "general");
  const IconComponent = categoryInfo.icon;

  const renderGeneralSettings = () => (
    <div className="space-y-8">
      <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-[#0E315C]/90 flex items-center text-lg font-light tracking-wide">
            <Bell className="w-5 h-5 mr-3" />
            Notifications
          </CardTitle>
          <CardDescription className="text-[#0E315C]/60">
            Control how you receive notifications and alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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

      <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-[#0E315C]/90 flex items-center text-lg font-light tracking-wide">
            <Globe className="w-5 h-5 mr-3" />
            Preferences
          </CardTitle>
          <CardDescription className="text-[#0E315C]/60">
            Customize your interface and locale settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-8">
      <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-[#0E315C]/90 flex items-center text-lg font-light tracking-wide">
            <Lock className="w-5 h-5 mr-3" />
            Authentication
          </CardTitle>
          <CardDescription className="text-[#0E315C]/60">
            Secure your account and control access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <SettingItem
            icon={Shield}
            title="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
          >
            <div className="flex items-center space-x-3">
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
            <div className="w-48 space-y-3">
              <Slider
                value={[settings.sessionTimeout]}
                onValueChange={(value) => updateSetting('sessionTimeout', value[0])}
                max={120}
                min={5}
                step={5}
                className="w-full"
              />
              <div className="text-sm text-[#0E315C]/60 text-center font-light">
                {settings.sessionTimeout} minutes
              </div>
            </div>
          </SettingItem>
        </CardContent>
      </Card>

      <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-[#0E315C]/90 flex items-center text-lg font-light tracking-wide">
            <Database className="w-5 h-5 mr-3" />
            Data Protection
          </CardTitle>
          <CardDescription className="text-[#0E315C]/60">
            Manage data retention and audit settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
    </div>
  );

  const renderDiscoverySettings = () => (
    <div className="space-y-8">
      <Card className="bg-white/5 backdrop-blur-sm border-white/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-[#0E315C]/90 flex items-center text-lg font-light tracking-wide">
            <Search className="w-5 h-5 mr-3" />
            Search & Analysis
          </CardTitle>
          <CardDescription className="text-[#0E315C]/60">
            Configure default discovery parameters and search behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
            <div className="w-48 space-y-3">
              <Slider
                value={[settings.confidenceThreshold * 100]}
                onValueChange={(value) => updateSetting('confidenceThreshold', value[0] / 100)}
                max={95}
                min={50}
                step={5}
                className="w-full"
              />
              <div className="text-sm text-[#0E315C]/60 text-center font-light">
                {(settings.confidenceThreshold * 100).toFixed(0)}%
              </div>
            </div>
          </SettingItem>
        </CardContent>
      </Card>
    </div>
  );

  // Add other category renderers here...
  const renderCategoryContent = () => {
    switch (category) {
      case "general":
        return renderGeneralSettings();
      case "security":
        return renderSecuritySettings();
      case "discovery":
        return renderDiscoverySettings();
      case "automation":
        return (
          <div className="text-center py-12">
            <Bot className="w-16 h-16 text-[#99C0F0]/60 mx-auto mb-4" />
            <h3 className="text-xl font-light text-[#0E315C]/80 mb-2">AI & Automation Settings</h3>
            <p className="text-[#0E315C]/60">Coming soon...</p>
          </div>
        );
      case "integration":
        return (
          <div className="text-center py-12">
            <Link className="w-16 h-16 text-[#99C0F0]/60 mx-auto mb-4" />
            <h3 className="text-xl font-light text-[#0E315C]/80 mb-2">Integration Settings</h3>
            <p className="text-[#0E315C]/60">Coming soon...</p>
          </div>
        );
      case "team":
        return (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-[#99C0F0]/60 mx-auto mb-4" />
            <h3 className="text-xl font-light text-[#0E315C]/80 mb-2">Team & Collaboration Settings</h3>
            <p className="text-[#0E315C]/60">Coming soon...</p>
          </div>
        );
      case "billing":
        return (
          <div className="text-center py-12">
            <CreditCard className="w-16 h-16 text-[#99C0F0]/60 mx-auto mb-4" />
            <h3 className="text-xl font-light text-[#0E315C]/80 mb-2">Usage & Billing Settings</h3>
            <p className="text-[#0E315C]/60">Coming soon...</p>
          </div>
        );
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="h-screen w-full relative overflow-hidden pt-16">
      {/* Glass morphism content background - matching site design */}
      <div className="absolute inset-6 bg-gradient-to-br from-white/25 via-[#C1D9F6]/15 to-white/20 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl" />
      <div className="absolute inset-6 bg-gradient-to-br from-[#99C0F0]/10 via-transparent to-[#C5BFEE]/10 rounded-3xl" />
      <div className="absolute inset-6 rounded-3xl bg-gradient-to-br from-transparent via-white/5 to-transparent" />

      <div className="relative z-10 h-full p-12">
        <div className={cn(
          "w-full h-full flex flex-col transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}>
          {/* Header with Breadcrumb */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/settings")}
                className="p-2 hover:bg-white/10 rounded-full transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 text-[#0E315C]/70" />
              </Button>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#99C0F0]/20 to-[#C5BFEE]/20 backdrop-blur-sm border border-white/20 shadow-lg">
                <IconComponent className="w-8 h-8 text-[#0E315C]/80" />
              </div>
              <div>
                {/* Breadcrumb */}
                <div className="flex items-center space-x-2 mb-2">
                  <button 
                    onClick={() => navigate("/settings")}
                    className="text-sm font-light text-[#0E315C]/60 hover:text-[#0E315C]/80 transition-colors"
                  >
                    Settings
                  </button>
                  <span className="text-[#0E315C]/40 text-sm">/</span>
                  <span className="text-sm font-light text-[#0E315C]/80">
                    {categoryInfo.title}
                  </span>
                </div>
                <h1 className="text-3xl font-light text-[#0E315C]/90 tracking-wide">
                  {categoryInfo.title}
                </h1>
                <p className="text-[#0E315C]/60 font-light mt-1">
                  {categoryInfo.description}
                </p>
              </div>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1 overflow-auto">
            {renderCategoryContent()}
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-8 border-t border-white/10 mt-8">
            <Button className="bg-gradient-to-r from-[#99C0F0] to-[#C5BFEE] hover:from-[#99C0F0]/80 hover:to-[#C5BFEE]/80 text-white px-8 py-3 rounded-2xl font-light">
              Save Changes
            </Button>
          </div>
        </div>

        {/* Floating ambient particles - matching site design */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          <div className="absolute top-12 right-12 w-2 h-2 bg-[#99C0F0]/40 rounded-full opacity-60 animate-float" />
          <div
            className="absolute bottom-24 left-12 w-1.5 h-1.5 bg-[#C5BFEE]/50 rounded-full opacity-50 animate-float-slow"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 right-1/4 w-1 h-1 bg-[#C1D9F6]/50 rounded-full opacity-40 animate-drift"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-[#99C0F0]/30 rounded-full opacity-30 animate-float"
            style={{ animationDelay: "3s" }}
          />
        </div>

        {/* Subtle edge glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#99C0F0]/5 via-transparent to-[#C5BFEE]/5 blur-xl pointer-events-none" />
      </div>
    </div>
  );
}
