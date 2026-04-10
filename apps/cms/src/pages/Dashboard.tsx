import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { api } from '../../lib/api'
import { TopBar } from '../../components/layout/TopBar'
import { FileText, Package, Image, MessageSquare, Mail, Star, Users, TrendingUp } from 'lucide-react'
import { formatDate } from '../../lib/utils'

function StatCard({ label, value, icon: Icon, href }: { label: string; value: number; icon: React.ElementType; href: string }) {
  return (
    <Link to={href} className="bg-white rounded-lg border border-border p-5 hover:border-gold/50 hover:shadow-sm transition-all group">
      <div className="flex items-start justify-between mb-3">
        <div className="p-2.5 rounded-lg bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white transition-colors">
          <Icon size={16} />
        </div>
        <TrendingUp size={14} className="text-muted-foreground" />
      </div>
      <p className="text-2xl font-bold text-foreground mt-2">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
    </Link>
  )
}

export default function Dashboard() {
  const { data: products } = useQuery({ queryKey: ['products-count'], queryFn: async () => { const r = await api.get('/products?limit=1'); return r.data.meta?.total ?? 0 } })
  const { data: pages } = useQuery({ queryKey: ['pages-count'], queryFn: async () => { const r = await api.get('/pages'); return (r.data.data as unknown[])?.length ?? 0 } })
  const { data: inquiries } = useQuery({ queryKey: ['inquiries-count'], queryFn: async () => { const r = await api.get('/inquiries?limit=1'); return r.data.meta?.total ?? 0 } })
  const { data: media } = useQuery({ queryKey: ['media-count'], queryFn: async () => { const r = await api.get('/media?limit=1'); return r.data.meta?.total ?? 0 } })
  const { data: subscribers } = useQuery({ queryKey: ['subscribers-count'], queryFn: async () => { const r = await api.get('/newsletter/subscribers?limit=1'); return r.data.meta?.total ?? 0 } })
  const { data: testimonials } = useQuery({ queryKey: ['testimonials-count'], queryFn: async () => { const r = await api.get('/testimonials/all'); return (r.data.data as unknown[])?.length ?? 0 } })

  const { data: recentInquiries } = useQuery({
    queryKey: ['recent-inquiries'],
    queryFn: async () => {
      const r = await api.get('/inquiries?limit=5')
      return r.data.data as Array<{ id: string; name: string; email: string; subject?: string; status: string; createdAt: string }>
    },
  })

  const stats = [
    { label: 'Total Products', value: products ?? 0, icon: Package, href: '/products' },
    { label: 'Pages', value: pages ?? 0, icon: FileText, href: '/pages' },
    { label: 'Open Inquiries', value: inquiries ?? 0, icon: MessageSquare, href: '/inquiries' },
    { label: 'Media Assets', value: media ?? 0, icon: Image, href: '/media' },
    { label: 'Newsletter Subscribers', value: subscribers ?? 0, icon: Mail, href: '/newsletter' },
    { label: 'Testimonials', value: testimonials ?? 0, icon: Star, href: '/testimonials' },
  ]

  const statusColors: Record<string, string> = {
    NEW: 'bg-blue-50 text-blue-700',
    IN_PROGRESS: 'bg-amber-50 text-amber-700',
    RESOLVED: 'bg-green-50 text-green-700',
    SPAM: 'bg-red-50 text-red-700',
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <TopBar title="Dashboard" subtitle="Welcome back to Great Houses CMS" />
      <div className="flex-1 overflow-y-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-lg p-5 text-white">
            <p className="text-xs text-white/60 mb-1">Quick Actions</p>
            <h3 className="font-semibold mb-4">Continue Editing</h3>
            <div className="flex flex-wrap gap-2">
              <Link to="/pages" className="text-xs px-3 py-1.5 bg-white/10 hover:bg-gold hover:text-[#1a1a1a] rounded transition-colors font-medium">Edit Pages</Link>
              <Link to="/products/new" className="text-xs px-3 py-1.5 bg-white/10 hover:bg-gold hover:text-[#1a1a1a] rounded transition-colors font-medium">Add Product</Link>
              <Link to="/theme" className="text-xs px-3 py-1.5 bg-white/10 hover:bg-gold hover:text-[#1a1a1a] rounded transition-colors font-medium">Theme Settings</Link>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-border p-5">
            <p className="text-xs text-muted-foreground mb-1">Platform Health</p>
            <h3 className="font-semibold mb-4 text-foreground">System Status</h3>
            <div className="space-y-2">
              {[
                { label: 'API', status: 'Online' },
                { label: 'Database', status: 'Online' },
                { label: 'Cache', status: 'Online' },
                { label: 'Media CDN', status: 'Online' },
              ].map(({ label, status }) => (
                <div key={label} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-lg border border-border">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
            <h3 className="text-sm font-semibold">Recent Inquiries</h3>
            <Link to="/inquiries" className="text-xs text-gold hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-border">
            {recentInquiries?.map((inq) => (
              <div key={inq.id} className="flex items-center gap-4 px-5 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{inq.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{inq.subject || inq.email}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColors[inq.status] ?? ''}`}>{inq.status.replace('_', ' ')}</span>
                <span className="text-xs text-muted-foreground flex-shrink-0">{formatDate(inq.createdAt)}</span>
              </div>
            ))}
            {!recentInquiries?.length && (
              <p className="px-5 py-6 text-sm text-muted-foreground text-center">No inquiries yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
