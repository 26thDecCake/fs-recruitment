using RecruitmentAPI.Data;
using RecruitmentAPI.Services;

namespace RecruitmentAPI.Repositories
{
    public class AccountRepository : IAccountService
    {
        private readonly AppDbContext _appDbContext;
        private readonly IConfiguration _configuration;

        public AccountRepository(AppDbContext appDbContext,
            IConfiguration configuration)
        {
            _appDbContext = appDbContext;
            _configuration = configuration;
        }


    }
}
