import { useNavigate } from 'react-router-dom'

import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'

export function LogoutButton() {
  const navigate = useNavigate()

  const logout = async () => {
    await supabase.auth.signOut()
    navigate('/auth/login')
  }

  return <Button onClick={logout}>Logout</Button>
}
