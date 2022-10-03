import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { useCheckAuth } from '../hooks/useCheckAuth';
import { JournalRoutes } from '../journal/routes/JournalRoutes';


export const AppRouter = () => {

  const { status } = useCheckAuth();
  console.log(status)

  return (
    <Routes>
      {
        (status === 'authenticated') ?
          <Route path="/*" element={<JournalRoutes />} />
          : <Route path="/auth/*" element={<AuthRoutes />} />

      }

      <Route path="/*" element={<Navigate to={'auth/login'} />} />
    </Routes>
  )
}
