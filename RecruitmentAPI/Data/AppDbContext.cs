using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RecruitmentAPI.Models;

namespace RecruitmentAPI.Data
{
    public partial class AppDbContext:IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {
                
        }

        public virtual DbSet<m_candidate> m_candidate { get; set; }

        public virtual DbSet<m_candidate_profile> m_candidate_profile { get; set; }

        public virtual DbSet<m_candidate_profile_exp> m_candidate_profile_exp { get; set; }

        public virtual DbSet<m_candidate_profile_skill> m_candidate_profile_skill { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<m_candidate>(entity =>
            {
                entity.HasKey(e => e.Guid);

                entity.Property(e => e.BirthDate).HasColumnType("datetime");
                entity.Property(e => e.BirthPlace)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.CandidateName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.Gender)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);
                entity.Property(e => e.Religion)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
                entity.Property(e => e.UserId)
                    .IsRequired()
                    .HasMaxLength(450);
            });

            modelBuilder.Entity<m_candidate_profile>(entity =>
            {
                entity.HasKey(e => e.Guid).HasName("PK_m_candidate_profile_1");

                entity.Property(e => e.CandidateId)
                    .IsRequired()
                    .HasMaxLength(450);

                entity.HasOne(d => d.Candidate).WithMany(p => p.m_candidate_profile)
                    .HasForeignKey(d => d.CandidateId)
                    .HasConstraintName("FK_m_candidate_profile_m_candidate1");
            });

            modelBuilder.Entity<m_candidate_profile_exp>(entity =>
            {
                entity.HasKey(e => e.Guid);

                entity.Property(e => e.Company)
                    .IsRequired()
                    .HasMaxLength(150)
                    .IsUnicode(false);
                entity.Property(e => e.Position)
                    .HasMaxLength(80)
                    .IsUnicode(false);
                entity.Property(e => e.ProfileId)
                    .IsRequired()
                    .HasMaxLength(450);

                entity.HasOne(d => d.Profile).WithMany(p => p.m_candidate_profile_exp)
                    .HasForeignKey(d => d.ProfileId)
                    .HasConstraintName("FK_m_candidate_profile_exp_m_candidate_profile");
            });

            modelBuilder.Entity<m_candidate_profile_skill>(entity =>
            {
                entity.HasKey(e => e.Guid).HasName("PK_m_candidate_profile_skill_1");

                entity.Property(e => e.ProfileId)
                    .IsRequired()
                    .HasMaxLength(450);
                entity.Property(e => e.SkillDescription).HasMaxLength(300);
                entity.Property(e => e.SkillName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.HasOne(d => d.Profile).WithMany(p => p.m_candidate_profile_skill)
                    .HasForeignKey(d => d.ProfileId)
                    .HasConstraintName("FK_m_candidate_profile_skill_m_candidate_profile1");
            });

            base.OnModelCreating(modelBuilder);
        }



    }
}
