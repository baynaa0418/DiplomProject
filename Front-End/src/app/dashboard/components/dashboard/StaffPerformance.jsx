import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Avatar
} from '@mui/material';
import DashboardCard from '@/app/dashboard/components/shared/DashboardCard';

const doctors = [
    {
        id: "D-001",
        name: "Даваасүрэн Баярмаа",
        specialty: "Дотрын эмч",
        department: "Эмчилгээний тасаг",
        patients: "Өндөр",
        pbg: "success.main",
        rating: "4.8",
    },
    {
        id: "D-002",
        name: "Нарантуяа Анхбаяр",
        specialty: "Эх барих эмч",
        department: "Гэр бүл төлөвлөлт",
        patients: "Дундаж",
        pbg: "primary.main",
        rating: "4.5",
    },
    {
        id: "D-003",
        name: "Мөнхтуяа Түвшинжаргал",
        specialty: "Хүүхдийн эмч",
        department: "Хүүхдийн тасаг",
        patients: "Дундаж",
        pbg: "primary.main",
        rating: "4.6",
    },
    {
        id: "D-004",
        name: "Амаржаргал Ганболд",
        specialty: "Шүдний эмч",
        department: "Шүдний тасаг",
        patients: "Бага",
        pbg: "warning.main",
        rating: "4.2",
    },
    {
        id: "D-005",
        name: "Батсайхан Энх-Амгалан",
        specialty: "Мэс засалч",
        department: "Мэс засал",
        patients: "Өндөр",
        pbg: "success.main",
        rating: "4.9",
    },
];


const StaffPerformance = () => {
    return (
        <DashboardCard title="Эмч нарын гүйцэтгэл">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                    aria-label="staff performance table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    ID
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Эмч
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Тасаг
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Үзсэн үйлчлүүлэгч
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Үнэлгээ
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {doctors.map((doctor) => (
                            <TableRow key={doctor.name} hover>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {doctor.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Avatar 
                                          sx={{ 
                                            mr: 2, 
                                            width: 40, 
                                            height: 40, 
                                            bgcolor: 'primary.light',
                                          }}
                                        >
                                          {doctor.name.charAt(0)}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {doctor.name}
                                            </Typography>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                }}
                                            >
                                                {doctor.specialty}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {doctor.department}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "4px",
                                            backgroundColor: doctor.pbg,
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={doctor.patients}
                                    ></Chip>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="h6">{doctor.rating}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default StaffPerformance;